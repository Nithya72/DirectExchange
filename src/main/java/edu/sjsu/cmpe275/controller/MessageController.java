package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/message")
@Slf4j
public class MessageController {


    @Autowired
    private EmailService emailService;

    @PreAuthorize("#userId == authentication.principal")
    @PostMapping(value = "/{id}", produces = {"application/json"})
    public ResponseEntity sendMessage(@PathVariable(value = "id") String userId,
                                            @RequestParam(name = "sender_name")  String sender_name,
                                            @RequestParam(name = "reciever_name")  String reciever_name,
                                            @RequestParam(name = "receiver_email") String receiver_email,
                                            @RequestParam(name = "message") String message
    ){



        if(emailService.sendMessageNotification(sender_name,reciever_name,receiver_email,message)) {
            return ResponseEntity.status(HttpStatus.OK).body("Success");
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong! Please try again later");
        }

    }
}
