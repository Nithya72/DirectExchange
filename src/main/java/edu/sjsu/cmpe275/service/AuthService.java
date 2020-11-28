package edu.sjsu.cmpe275.service;

import edu.sjsu.cmpe275.dao.User;
import edu.sjsu.cmpe275.dao.enums.RegistrationType;
import edu.sjsu.cmpe275.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity registerUser(String emailId, String nickName, String password, RegistrationType registrationType) {
        try{

            User user = userRepository.findByEmailId(emailId);
            if (user != null) {
                return  ResponseEntity.status(HttpStatus.CONFLICT).body("User Already Present");
            }
            user = userRepository.findByNickName(nickName);
            if (user != null) {
                return  ResponseEntity.status(HttpStatus.CONFLICT).body("NickName Already Present");
            }

            try {

                User newUser = new User();
                newUser.setEmailId(emailId);
                newUser.setNickName(nickName);
                newUser.setPassword(passwordEncoder.encode(password));
                newUser.setRegistrationType(registrationType);
                newUser.setEmailVerified(false);
                userRepository.save(newUser);

                return  ResponseEntity.status(HttpStatus.OK).body(newUser);
            } catch (Exception exception){
                return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
            }

        } catch (Exception exception) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

    public ResponseEntity<?> loginUser(String emailId, String password) {
        User user = userRepository.findByEmailId(emailId);
        if (user == null) {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Present");
        }
        if (user.getRegistrationType() != RegistrationType.LOCAL) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please login using " + user.getRegistrationType());
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username/Password does not match");
        }
        // TODO: We need to generate token
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}
