package edu.sjsu.cmpe275.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthController {

    @PostMapping(value = "/{email}", produces = {"application/json"})
    public ResponseEntity<?> signup(@PathVariable(value = "email") String emailId){
        return ResponseEntity.status(HttpStatus.OK).body("Done!");
    }

}
