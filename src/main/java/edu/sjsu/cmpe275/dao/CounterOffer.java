package edu.sjsu.cmpe275.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

/*
 * Counter Offer Entity - maps to the counter_offer table
 */
@Entity
public class CounterOffer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "counter_offer_id")
  private long offerId;

  @ManyToOne
  @JoinColumn(name = "sender_offer_id")
  private ExchangeOffer senderOffer;

  @ManyToOne
  @JoinColumn(name = "receiver_offer_id")
  private ExchangeOffer receiverOffer;

  @ManyToOne
  @JoinColumn(name = "sender_id")
  private User sender;

  @ManyToOne
  @JoinColumn(name = "receiver_id")
  private User receiver;

  @Column(name = "counter_offer_amount", nullable = false)
  private Integer counterOfferAmount;

  @Column
  private String status;

  @Column(name = "expiration_date", nullable = false)
  private Date expirationDate;

  public long getOfferId() {
    return offerId;
  }

  public void setOfferId(long offerId) {
    this.offerId = offerId;
  }

  public ExchangeOffer getSenderOffer() {
    return senderOffer;
  }

  public void setSenderOffer(ExchangeOffer senderOffer) {
    this.senderOffer = senderOffer;
  }

  public ExchangeOffer getReceiverOffer() {
    return receiverOffer;
  }

  public void setReceiverOffer(ExchangeOffer receiverOffer) {
    this.receiverOffer = receiverOffer;
  }

  public Integer getCounterOfferAmount() {
    return counterOfferAmount;
  }

  public void setCounterOfferAmount(Integer counterOfferAmount) {
    this.counterOfferAmount = counterOfferAmount;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public User getSender() {
    return sender;
  }

  public void setSender(User sender) {
    this.sender = sender;
  }

  public User getReceiver() {
    return receiver;
  }

  public void setReceiver(User receiver) {
    this.receiver = receiver;
  }

  public Date getExpirationDate() {
    return expirationDate;
  }

  public void setExpirationDate(Date expirationDate) {
    this.expirationDate = expirationDate;
  }

  @Override
  public String toString() {
    return "CounterOffer{" +
        "offerId=" + offerId +
        ", senderOffer=" + senderOffer +
        ", receiverOffer=" + receiverOffer +
        ", sender=" + sender +
        ", receiver=" + receiver +
        ", counterOfferAmount=" + counterOfferAmount +
        ", status='" + status + '\'' +
        ", expirationDate=" + expirationDate +
        '}';
  }
}
