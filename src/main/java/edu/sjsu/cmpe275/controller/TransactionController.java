package edu.sjsu.cmpe275.controller;

import edu.sjsu.cmpe275.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity createNewTransaction(@RequestParam(name = "source_offer")  Long source_offer,
                                               @RequestParam(name = "offer_matches") List<Long> offer_matches){


        return transactionService.createNewTransaction(source_offer,offer_matches);

    }

    @PutMapping
    public ResponseEntity updateTransaction(@RequestParam(name = "offer_id")  Long offer_id,
                                            @RequestParam(name = "transaction_id") String transaction_id){



        return transactionService.updateTransaction(offer_id,transaction_id);

    }

    @GetMapping("/{userid}")
    public ResponseEntity getTransactions(@PathVariable(name="userid") Long userid ){

        return transactionService.getTransactions(userid);
    }
}
