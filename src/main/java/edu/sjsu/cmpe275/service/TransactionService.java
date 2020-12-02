package edu.sjsu.cmpe275.service;

import edu.sjsu.cmpe275.dao.ExchangeOffer;
import edu.sjsu.cmpe275.dao.Transactions;
import edu.sjsu.cmpe275.repository.ExchangeOfferRepository;
import edu.sjsu.cmpe275.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class TransactionService {

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private ExchangeOfferRepository exchangeOfferRepository;

    public ResponseEntity createNewTransaction(Long source_offer_id,
                                               List<Long> offer_matched, float amount){

        try {
            ExchangeOffer sourceOffer = exchangeOfferRepository.findByOfferIdAndStatus(source_offer_id,"Open");

            if (sourceOffer == null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Your offer has already been completed!");
            }

            List<ExchangeOffer> otheroffers = exchangeOfferRepository.getOffersDetails(offer_matched);
            if (otheroffers.size() != offer_matched.size()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Other offers are not longer open!");
            }

            sourceOffer.setRemitAmount(amount);
            sourceOffer.setFinalAmount(amount * sourceOffer.getExchangeRate());
            sourceOffer.setStatus("InTransaction");

            String trans_id = UUID.randomUUID().toString();

            ZonedDateTime expirationDate = ZonedDateTime.now(ZoneOffset.UTC).plusMinutes(10);

            System.out.println("DATETIME = " + expirationDate);
            Transactions newTransaction = new Transactions(trans_id, sourceOffer, sourceOffer.getUser().getUserId(),expirationDate);
            transactionsRepository.save(newTransaction);

            for (ExchangeOffer offer : otheroffers) {
                Transactions otherofferTransaction = new Transactions(trans_id, offer, offer.getUser().getUserId(),expirationDate);
                transactionsRepository.save(otherofferTransaction);
            }

            return ResponseEntity.status(HttpStatus.OK).body(newTransaction);

        }catch (Exception e){
            System.out.println("Error "+e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong! Please try again later!");
        }

    }

    public ResponseEntity updateTransaction(Long offer_id,
                                            String transaction_id){

        try {
            ZonedDateTime currentDateTime = ZonedDateTime.now(ZoneOffset.UTC);
            String currentStatus = transactionsRepository.getTransactionStatus(transaction_id,currentDateTime);
            if(currentStatus==null){
                transactionsRepository.updateAbortedTransactionStatus("aborted",transaction_id);
                return ResponseEntity.status(HttpStatus.OK).body("message: Transaction has been aborted!!");
            }
            if(!currentStatus.equals("pending")){
                return ResponseEntity.status(HttpStatus.OK).body("Transaction has been "+currentStatus);
            }
            ExchangeOffer offer = exchangeOfferRepository.findByofferId(offer_id);
            offer.setStatus("InTransaction");
            List<Transactions> currentTransactions = transactionsRepository.findByTransactionId(transaction_id);

            boolean isTransactionComplete = true;
            for(Transactions transaction:currentTransactions){

                if(transaction.getOfferDetails().getOfferId()==offer_id){
                    transaction.setIs_complete(1);
                    transactionsRepository.save(transaction);
                }
                else if(transaction.getIs_complete()!=1){
                    isTransactionComplete=false;
                }

            }

            if(isTransactionComplete){
                List<Long> offersCompleted = new ArrayList<Long>();
                for(Transactions transaction:currentTransactions){
                    transaction.setTransactionStatus("completed");
                    transaction.getOfferDetails().setStatus("Fulfilled");
                    offersCompleted.add(transaction.getOfferDetails().getOfferId());
                }
                List<String> otherTransactions = transactionsRepository.findOtherTransactions(offersCompleted,transaction_id);
                transactionsRepository.updateTransactionStatus("aborted",otherTransactions);
            }

            return ResponseEntity.status(HttpStatus.OK).body("Success");
        }catch (Exception e){
            System.out.println("Error "+e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong! Please try again later!");
        }

    }

    public ResponseEntity getTransactions(Long userid){

        try {

            ZonedDateTime currentDateTime = ZonedDateTime.now(ZoneOffset.UTC);

            System.out.println("current time: "+currentDateTime);
            List<Transactions> currentTransactions = transactionsRepository.fetchTransactionsByUserID(userid, currentDateTime);

            return ResponseEntity.status(HttpStatus.OK).body(currentTransactions);
        }catch (Exception e){
            System.out.println("Error "+e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong! Please try again later!");
        }
    }

}
