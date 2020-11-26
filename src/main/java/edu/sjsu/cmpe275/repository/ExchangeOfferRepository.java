package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.dao.ExchangeOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeOfferRepository extends JpaRepository<ExchangeOffer, String> {

    @Query(value="select * from exchange_offer where user_id!=:id", nativeQuery = true)
    List<ExchangeOffer> getOffersByOthers(Long id);
}
