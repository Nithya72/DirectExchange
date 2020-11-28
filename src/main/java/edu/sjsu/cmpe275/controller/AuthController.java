package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.dao.enums.RegistrationType;
import edu.sjsu.cmpe275.service.AuthService;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("auth")
public class AuthController {
    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    // todo: (Bhavana) verify emailID and password in aspect.
    @PostMapping(value = "/signup", produces = { "application/json"},  consumes = { "application/json"} )
    public ResponseEntity<?> signup(@RequestBody JSONObject object){

        String emailId = (String)object.get("emailId");
        String password = (String)object.get("password");
        String nickname = (String)object.get("nickname");

        logger.info("email id - {} nickname - {}",emailId, nickname );
        return authService.registerUser(emailId, nickname, password, RegistrationType.LOCAL);
    }

    // todo: (Bhavana) verify emailID and password in aspect.
    @PostMapping(value = "/login", produces = { "application/json"},  consumes = { "application/json"} )
    public ResponseEntity<?> login(@RequestBody JSONObject object){

        String emailId = (String)object.get("emailId");
        String password = (String)object.get("password");

        logger.info("email id - {}",emailId );
        return authService.loginUser(emailId, password);
    }

}
