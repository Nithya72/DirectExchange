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

    @Query(value="select * from transactions where transaction_id in(:transactionId) ", nativeQuery = true)
    List<Transactions> getTransactionsByTransactionIds(List<String> transactionId);

    @Query(value="select count(*) from transactions where transaction_status='completed' group by transaction_id", nativeQuery = true)
    List<Integer> getCompletedTransactions();

    @Query(value="select count(*) from transactions where transaction_status='aborted' group by transaction_id", nativeQuery = true)
    List<Integer> getUnCompletedTransactions();

    @Query(value="select sum(transaction_remit_amount)  from transactions where transaction_status='completed'", nativeQuery = true)
    Double getTotalRemittedAmount();

    List<Transactions> findByTransactionId(String transactionId);

    @Modifying
    @Query(value = "update transactions t set t.transaction_status = :status where t.transaction_id in(:transaction_id)",
            nativeQuery = true)
    int updateTransactionStatus(String status,
                                   List<String> transaction_id);

    @Modifying
    @Query(value = "update transactions t set t.transaction_status = :status where t.transaction_id =:transaction_id",
            nativeQuery = true)
    int updateAbortedTransactionStatus(String status,
                                String transaction_id);


}
