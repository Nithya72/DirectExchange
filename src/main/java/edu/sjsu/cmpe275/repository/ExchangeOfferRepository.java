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
    // Query to not get email: elect `offer_id`,`counter_offer_flag`,`dest_country`,`dest_currency`,`exchange_rate`,`exp_date`,`final_amount`,`remit_amount`,`split_offer_flag`,`src_country`,`src_currency`,`status`,`user_id`,users.nickname as 'poster_name' from exchange_offer,users where users.id=exchange_offer.user_id AND user_id!=8
    List<ExchangeOffer> getOffersByOthers(Long id);

    @Query(value="select * from exchange_offer where user_id=:userId order by exp_date desc", nativeQuery = true)
    List<ExchangeOffer> findByUserId(Long userId);

    @Query(value="select * from exchange_offer where user_id!=:userId and src_currency = :srcCurrency and exp_date > now() and remit_amount between :remitAmount*0.9 and :remitAmount*1.1 and status='Open' order by remit_amount desc", nativeQuery = true)
    List<ExchangeOffer> findSingleMatches(Long userId, Integer remitAmount, String srcCurrency);

    @Query(value="select * from exchange_offer where user_id!=:id and src_currency = :srcCurrency and exp_date > now() and status='Open'", nativeQuery = true)
    List<ExchangeOffer> getOffersBySrcCurrency(Long id, String srcCurrency);

    ExchangeOffer findByofferId(long offer_id);

    @Query(value="select * from exchange_offer where offer_id in(:offer_id) and status='active' ", nativeQuery = true)
    List<ExchangeOffer> getOtherOffers(List<Long> offer_id);

    ExchangeOffer findByOfferIdAndStatus(Long offer_id, String status);
}
