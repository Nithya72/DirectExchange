package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.dao.ExchangeOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExchangeOfferRepository extends JpaRepository<ExchangeOffer, String> {

    @Query(value="select * from exchange_offer where user_id!=:id", nativeQuery = true)
    List<ExchangeOffer> getOffersByOthers(Long id);

    @Query(value="select * from exchange_offer where user_id=:userId order by exp_date desc", nativeQuery = true)
    List<ExchangeOffer> findByUserId(Long userId);

    @Query(value="select * from exchange_offer where user_id!=:userId and src_currency = :srcCurrency and exp_date > now() and remit_amount between :remitAmount*0.9 and :remitAmount*1.1 order by remit_amount desc", nativeQuery = true)
    List<ExchangeOffer> findSingleMatches(Long userId, Integer remitAmount, String srcCurrency);
}
