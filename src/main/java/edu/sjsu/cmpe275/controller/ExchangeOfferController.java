package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.service.ExchangeOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("user")
public class ExchangeOfferController {

    @Autowired
    private ExchangeOfferService exchangeOfferService;

    @GetMapping(value = "/exchangeoffer/{id}", produces = {"application/json"})
    public ResponseEntity<?> signup(@PathVariable(value = "id") String userId) {
        return exchangeOfferService.getOffersByOthers(Long.parseLong(userId));
    }
}

