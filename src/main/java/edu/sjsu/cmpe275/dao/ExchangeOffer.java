package edu.sjsu.cmpe275.dao;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

/*
 * Exchange Offer Entity - maps to the exchange_offer table
 */
@Entity
public class ExchangeOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="offer_id")
    private long offerId;

    @Column(name="src_country", nullable = false)
    private String srcCountry;

    @Column(name="src_currency", nullable = false)
    private String srcCurrency;

    @Column(name="remit_amount", nullable = false)
    private Integer remitAmount;

    @Column(name="dest_country", nullable = false)
    private String destCountry;

    @Column(name="dest_currency", nullable = false)
    private String destCurrency;

    @Column(name="exchange_rate", nullable = false)
    private Integer exchangeRate;

    @Column(name="final_amount", nullable = false)
    private Integer finalAmount;

    @Column(name="exp_date", nullable = false)
    private Date expDate;

    @Column(name="counter_offer_flag", nullable = false)
    private Boolean counterOfferFlag;

    @Column(name="split_offer_flag", nullable = false)
    private Boolean splitOfferFlag;

    @Column(name="user_id", nullable = false)
    private Integer userId;

    public long getOfferId() {
        return offerId;
    }

    public void setOfferId(long offerId) {
        this.offerId = offerId;
    }

    public String getSrcCountry() {
        return srcCountry;
    }

    public void setSrcCountry(String srcCountry) {
        this.srcCountry = srcCountry;
    }

    public String getSrcCurrency() {
        return srcCurrency;
    }

    public void setSrcCurrency(String srcCurrency) {
        this.srcCurrency = srcCurrency;
    }

    public Integer getRemitAmount() {
        return remitAmount;
    }

    public void setRemitAmount(Integer remitAmount) {
        this.remitAmount = remitAmount;
    }

    public String getDestCountry() {
        return destCountry;
    }

    public void setDestCountry(String destCountry) {
        this.destCountry = destCountry;
    }

    public String getDestCurrency() {
        return destCurrency;
    }

    public void setDestCurrency(String destCurrency) {
        this.destCurrency = destCurrency;
    }

    public Integer getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(Integer exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public Integer getFinalAmount() {
        return finalAmount;
    }

    public void setFinalAmount(Integer finalAmount) {
        this.finalAmount = finalAmount;
    }

    public Date getExpDate() {
        return expDate;
    }

    public void setExpDate(Date expDate) {
        this.expDate = expDate;
    }

    public Boolean getCounterOfferFlag() {
        return counterOfferFlag;
    }

    public void setCounterOfferFlag(Boolean counterOfferFlag) {
        this.counterOfferFlag = counterOfferFlag;
    }

    public Boolean getSplitOfferFlag() {
        return splitOfferFlag;
    }

    public void setSplitOfferFlag(Boolean splitOfferFlag) {
        this.splitOfferFlag = splitOfferFlag;
    }

    public Integer getUserId() { return userId; }

    public void setUserId(Integer userId) { this.userId = userId; }

    @Override
    public String toString() {
        return "ExchangeOffer{" +
            "offerId=" + offerId +
            ", srcCountry='" + srcCountry + '\'' +
            ", srcCurrency='" + srcCurrency + '\'' +
            ", remitAmount=" + remitAmount +
            ", destCountry='" + destCountry + '\'' +
            ", destCurrency='" + destCurrency + '\'' +
            ", exchangeRate=" + exchangeRate +
            ", finalAmount=" + finalAmount +
            ", expDate=" + expDate +
            ", counterOfferFlag=" + counterOfferFlag +
            ", splitOfferFlag=" + splitOfferFlag +
            ", userId=" + userId +
            '}';
    }
}
