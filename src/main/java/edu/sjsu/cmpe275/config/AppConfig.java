package edu.sjsu.cmpe275.config;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
@Data
@NoArgsConstructor
public class AppConfig {

    private JwtProps jwtProps;

    @Data
    @NoArgsConstructor
    public static class JwtProps {
        private String tokenSecret;
        private long tokenExpirationMsec;
    }


}
