package edu.sjsu.cmpe275.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
    @JoinColumn(name = "sender_user_id")
    private User sendingUser;

    @ManyToOne
    @JoinColumn(name = "sender_offer_id")
    private ExchangeOffer senderOffer;

    @ManyToOne
    @JoinColumn(name = "receiver_user_id")
    private User receivingUser;

    @ManyToOne
    @JoinColumn(name = "receiver_offer_id")
    private ExchangeOffer receiverOffer;

    @Column(name="receiver_initial_amount", nullable = false)
    private Integer counterOfferAmount;

    public long getOfferId() {
      return offerId;
    }

    public void setOfferId(long offerId) {
      this.offerId = offerId;
    }

    public User getSendingUser() {
      return sendingUser;
    }

    public void setSendingUser(User sendingUser) {
      this.sendingUser = sendingUser;
    }

    public ExchangeOffer getSenderOffer() {
      return senderOffer;
    }

    public void setSenderOffer(ExchangeOffer senderOffer) {
      this.senderOffer = senderOffer;
    }

    public User getReceivingUser() {
      return receivingUser;
    }

    public void setReceivingUser(User receivingUser) {
      this.receivingUser = receivingUser;
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
  }
