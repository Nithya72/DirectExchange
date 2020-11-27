package edu.sjsu.cmpe275.service;

import edu.sjsu.cmpe275.aspect.LoggingAdvice;
import edu.sjsu.cmpe275.dao.ExchangeOffer;
import edu.sjsu.cmpe275.repository.ExchangeOfferRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class ExchangeOfferService {

    @Autowired
    private ExchangeOfferRepository exchangeOfferRepository;

    Logger log = LoggerFactory.getLogger(ExchangeOfferService.class);

    public ResponseEntity<?> getOffersByOthers(Long userId) {
        try {
            List<ExchangeOffer> exchangeOffersList = exchangeOfferRepository.getOffersByOthers(userId);
            if (exchangeOffersList == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No offers yet!");
            }
            return ResponseEntity.status(HttpStatus.OK).body(exchangeOffersList);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }


    public ResponseEntity<?> getMyOffers(Long userId) {
        try {
            List<ExchangeOffer> exchangeOffersList = exchangeOfferRepository.findByUserId(userId);

            if (exchangeOffersList == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("You haven't posted any offers yet!");
            }
            return ResponseEntity.status(HttpStatus.OK).body(exchangeOffersList);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

//Expiration date check - time zone??

    public ResponseEntity<?> getSingleMatches(Long userId, Integer remitAmount, String srcCurrency) {
        try {
            List<ExchangeOffer> exchangeOffersList = exchangeOfferRepository.findSingleMatches(userId, remitAmount, srcCurrency); //LocalDate.now()

            if (exchangeOffersList == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("You haven't posted any offers yet!");
            }
            return ResponseEntity.status(HttpStatus.OK).body(exchangeOffersList);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }
}
