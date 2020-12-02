package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.requestbody.NewTransaction;
import edu.sjsu.cmpe275.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


@RestController
@CrossOrigin
@RequestMapping("api/transactions")
@Slf4j
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PreAuthorize("#userId == authentication.principal")
    @PostMapping(value = "/{id}", produces = {"application/json"})
    public ResponseEntity createNewTransaction(@PathVariable(value = "id") String userId,
                                               @RequestBody NewTransaction newTransaction) {


        return transactionService.createNewTransaction(newTransaction.getSource_offer(),
                newTransaction.getOffers_matched(), newTransaction.getSource_offer_amount());

    }

    @PreAuthorize("#userId == authentication.principal")
    @PutMapping(value = "/{id}", produces = {"application/json"})
    public ResponseEntity updateTransaction(@PathVariable(value = "id") String userId,
                                            @RequestParam(name = "offer_id")  Long offer_id,
                                            @RequestParam(name = "transaction_id") String transaction_id){



        return transactionService.updateTransaction(offer_id,transaction_id);

    }

    @PreAuthorize("#userId == authentication.principal")
    @GetMapping(value = "/{id}", produces = {"application/json"})
    public ResponseEntity getTransactions(@PathVariable(name="id") String userId ){

        return transactionService.getTransactions(Long.parseLong(userId));
    }
}
