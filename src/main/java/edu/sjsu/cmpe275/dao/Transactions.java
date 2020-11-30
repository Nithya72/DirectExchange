package edu.sjsu.cmpe275.dao;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.ZonedDateTime;


@Entity
@Table(name="transactions")
public class Transactions {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name="user_id", nullable = false)
    private Integer userId;

    @ManyToOne
    @JoinColumn(name = "offerid")
    private ExchangeOffer offerid;

    @Column(name="is_complete", columnDefinition = "int default false")
    int is_complete;

    @Column(name="transaction_status")
    String transactionStatus ="pending";

    @Column(name="expiration_date")
    ZonedDateTime expirationDate;

    public Transactions() {
    }
    public Transactions(String transactionId, ExchangeOffer offerid, Integer userid, ZonedDateTime expirationDate){
        this.transactionId=transactionId;
        this.offerid=offerid;
        this.userId=userid;
        this.expirationDate=expirationDate;
    }

    public Transactions(String transactionId, ExchangeOffer offerid){
        this.transactionId=transactionId;
        this.offerid=offerid;
    }

    public ZonedDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(ZonedDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public ExchangeOffer getOfferDetails() {
        return offerid;
    }

    public void setOfferDetails(ExchangeOffer offerid) {
        this.offerid = offerid;
    }

    public int getIs_complete() {
        return is_complete;
    }

    public void setIs_complete(int is_complete) {
        this.is_complete = is_complete;
    }

    public String getTransactionStatus() {
        return transactionStatus;
    }

    public void setTransactionStatus(String transactionStatus) {
        this.transactionStatus = transactionStatus;
    }
}
