package edu.sjsu.cmpe275.controller;


import edu.sjsu.cmpe275.dao.ExchangeOffer;
import edu.sjsu.cmpe275.dao.User;
import edu.sjsu.cmpe275.repository.ExchangeOfferRepository;
import edu.sjsu.cmpe275.repository.UserRepository;
import edu.sjsu.cmpe275.requestbody.PostOffer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/postoffer")
@Slf4j
public class PostOfferController {

    @Autowired
    ExchangeOfferRepository exchangeOfferRepository;

    @Autowired
    UserRepository userRepository;

    @PreAuthorize("#userId == authentication.principal")
    @PostMapping(value = "/{id}", produces = {"application/json"})
    public ResponseEntity<?> postanOffer(@PathVariable(value = "id") String userId,
                                         @RequestBody PostOffer postOffer
                                         ) {

        try {

            User user = userRepository.findByUserId(Long.parseLong(userId));
            if(user==null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please login to post an offer");
            }
            ExchangeOffer exchangeOffer = new ExchangeOffer();
            exchangeOffer.setRemitAmount(postOffer.getAmount());
            exchangeOffer.setExchangeRate(postOffer.getExchange_rate());
            exchangeOffer.setFinalAmount(postOffer.getAmount() * postOffer.getExchange_rate());
            exchangeOffer.setExpDate(postOffer.getExpirationdate());
            exchangeOffer.setSrcCountry(postOffer.getSource_country());
            exchangeOffer.setSrcCurrency(postOffer.getSource_currency());
            exchangeOffer.setDestCountry(postOffer.getDestination_country());
            exchangeOffer.setDestCurrency(postOffer.getDestination_currency());
            exchangeOffer.setCounterOfferFlag(postOffer.getAllowCounterOffers());
            exchangeOffer.setSplitOfferFlag(postOffer.getAllowOfferSplit());
            exchangeOffer.setStatus("Open");
            exchangeOffer.setUser(user);
            exchangeOfferRepository.save(exchangeOffer);
            String message="Offer has been created successfully!";
            return ResponseEntity.status(HttpStatus.OK).body(message);

        }catch(Exception e){
            System.out.println("Error while creating offer "+e.getMessage());
            String message ="Something went wrong! Please try again later";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
        }
    }
}
