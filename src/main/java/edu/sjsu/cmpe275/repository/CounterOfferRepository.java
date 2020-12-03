package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.dao.CounterOffer;
import edu.sjsu.cmpe275.dao.ExchangeOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CounterOfferRepository extends JpaRepository<CounterOffer, String> {

  @Query(value="select * from counter_offer where sender_id=:userId and expiration_date>now()", nativeQuery = true)
  List<CounterOffer> getMyCounterOffers(Long userId);

  @Query(value="select * from counter_offer where receiver_id=:userId and status!='rejected' and expiration_date>now()", nativeQuery = true)
  List<CounterOffer> getCounterOffersForMe(Long userId);

  @Modifying
  @Query(value="update counter_offer set status=:status where counter_offer_id=:id", nativeQuery = true)
  int updateCounterOfferStatus(Long id, String status);
}