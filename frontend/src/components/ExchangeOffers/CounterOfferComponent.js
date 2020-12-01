import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Home extends Component {
  render() {
    return (
        <div
            className="col-md-6"
            style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="offerContainer">
          <span>
            Posted By: <span className="postedBy">{this.props.senderNickName}</span><br/>
            Counter Offer Amount: <span className="postedBy">{this.props.counterOfferAmount}</span><br/>
          </span>
            <div
                style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
            >
              <div className="offerDetails">
                <span className="offerDetailTop">Your Initial Offer:</span>
                <span className="offerCountry">{this.props.receiverCountry}</span>
                <div>
                  <span className="offerCurrency">{this.props.receiverCurrency}{' '}</span>
                  <span className="offerAmount">{this.props.receiverRemitAmount}</span>
                </div>
              </div>

              <span className="arrowContainer">
              <i className="arrowC la la-arrow-right" />
            </span>

              <div className="offerDetails">
                <span className="offerDetailTop">Received Offer:</span>
                <span className="offerCountry">{this.props.senderCountry}</span>
                <div>
                  <span className="offerCurrency">{this.props.senderCurrency}{' '}</span>
                  <span className="offerAmount">{this.props.senderRemitAmount}</span>
                </div>
              </div>
            </div>

            <Link
                to={{ pathname: '/ViewOffer', state: { offerObj: this.props.senderOffer, nickName: this.props.senderNickName, counterOfferAmount: this.props.counterOfferAmount, senderOfferObj:this.props.senderOffer } }}
                className="customBtn"
            >View Offer</Link>
          </div>
        </div>
    );
  }
}