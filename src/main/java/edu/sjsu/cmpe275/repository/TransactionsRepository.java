package edu.sjsu.cmpe275.repository;

import edu.sjsu.cmpe275.dao.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, String> {

    @Query(value="select transaction_id from transactions where offerid in(:offer_id) and transaction_id!=:transaction_id", nativeQuery = true)
    List<String> findOtherTransactions(List<Long> offer_id, String transaction_id);

    @Query(value="select distinct transaction_status from transactions where transaction_id=:transactionId and expiration_date>:currentTime", nativeQuery = true)
    String getTransactionStatus(String transactionId, ZonedDateTime currentTime);

    @Query(value="select * from transactions where user_id=:userid order by transaction_status desc", nativeQuery = true)
    List<Transactions> fetchTransactionsByUserID(Long userid);

    List<Transactions> findByTransactionId(String transactionId);

    @Modifying
    @Query(value = "update transactions t set t.transaction_status = :status where t.transaction_id in(:transaction_id)", nativeQuery = true)
    int updateTransactionStatus(String status, List<String> transaction_id);

    @Modifying
    @Query(value = "update transactions t set t.transaction_status = :status where t.transaction_id =:transaction_id", nativeQuery = true)
    int updateAbortedTransactionStatus(String status, String transaction_id);

    @Query(value = "select t.transaction_id, t.transaction_status, t.offerid, u.username, eo.remit_amount, eo.exchange_rate from transactions as t " +
        "join users as u on u.id = t.user_id join exchange_offer eo on eo.offer_id = t.offerid " +
        "where transaction_id in (select t1.transaction_id from transactions t1 where t1.user_id = :userid) and t.user_id!=:userid and " +
        "t.transaction_status in ('completed', 'aborted') order by t.transaction_status desc", nativeQuery = true)
    List<Object> fetchTransactionHistoryByUserID(Long userid);
}
