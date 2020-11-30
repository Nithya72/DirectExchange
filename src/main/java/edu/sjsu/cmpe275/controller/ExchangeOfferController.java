package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.service.ExchangeOfferService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("user")
public class ExchangeOfferController {

    @Autowired
    private ExchangeOfferService exchangeOfferService;

    @PreAuthorize("#userId == authentication.principal")
    @GetMapping(value = "/allOffers/{id}", produces = {"application/json"})
    public ResponseEntity<?> alloffers(@PathVariable(value = "id") String userId) {
        return exchangeOfferService.getOffersByOthers(Long.parseLong(userId));
    }

    @PreAuthorize("#userId == authentication.principal")
    @GetMapping(value = "/myoffer/{id}", produces = {"application/json"})
    public ResponseEntity<?> myoffers(@PathVariable(value = "id") String userId) {
        return exchangeOfferService.getMyOffers(Long.parseLong(userId));
    }
    @PreAuthorize("#userId == authentication.principal")
    @GetMapping(value = "/singlematch/{userId}/{remitAmount}/{srcCurrency}", produces = {"application/json"})
    public ResponseEntity<?> singleMatches(@PathVariable(value = "userId") String userId, @PathVariable(value = "remitAmount") String remitAmount,@PathVariable(value = "srcCurrency") String srcCurrency) {

        Long userId1 = Long.parseLong(userId);
        Integer remitAmount1 = Integer.parseInt(remitAmount);

        return exchangeOfferService.getSingleMatches(userId1, remitAmount1, srcCurrency);
    }

    @PreAuthorize("#userId == authentication.principal")
    @GetMapping(value = "/allmatches/{userId}/{remitAmount}/{srcCurrency}", produces = {"application/json"})
    public ResponseEntity<?> allmatches(@PathVariable(value = "userId") String userId, @PathVariable(value = "remitAmount") String remitAmount,@PathVariable(value = "srcCurrency") String srcCurrency) {

        Long userId1 = Long.parseLong(userId);
        Integer remitAmount1 = Integer.parseInt(remitAmount);

        return exchangeOfferService.getAllMatches(userId1, remitAmount1, srcCurrency);
    }


}


