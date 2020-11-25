package edu.sjsu.cmpe275.controller;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("auth")
public class AuthController {
    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping(value = "/signup", produces = { "application/json"},  consumes = { "application/json"} )
    public ResponseEntity<?> signup(@RequestBody JSONObject object){

        String emailID = (String)object.get("emailID");
        String password = (String)object.get("password");

        logger.info("email id and password:{} - {}",emailID, password );
        return ResponseEntity.status(HttpStatus.OK).body("Done!");
    }

}
