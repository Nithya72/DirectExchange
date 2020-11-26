package edu.sjsu.cmpe275.service;

import edu.sjsu.cmpe275.dao.ExchangeOffer;
import edu.sjsu.cmpe275.repository.ExchangeOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExchangeOfferService {

    @Autowired
    private ExchangeOfferRepository exchangeOfferRepository;

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
}
