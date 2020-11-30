package edu.sjsu.cmpe275.security;

import edu.sjsu.cmpe275.repository.UserRepository;
import edu.sjsu.cmpe275.security.oauthuser.OAuth2UserInfo;
import edu.sjsu.cmpe275.security.oauthuser.OAuth2UserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Value("${app.redirectBaseUrl}")
    private String redirectBaseUrl;

    @Autowired
    OAuth2AuthenticationSuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        DefaultOAuth2User user = (DefaultOAuth2User)authentication.getPrincipal();
        OAuth2UserInfo userInfo = OAuth2UserInfoMapper.getOAuth2UserInfo(((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId(), user.getAttributes());


        String token = jwtTokenProvider.createToken(userRepository.findByEmailId(userInfo.getEmail()));
        logger.info("OnAuthenticationSuccess!!");

        String targetUrl = UriComponentsBuilder.fromUriString(redirectBaseUrl + "/oauth2/redirect")
                .queryParam("token", token)
                .build().toUriString();

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

}
