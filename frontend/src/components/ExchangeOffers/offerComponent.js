import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Home extends Component {
  render() {

    console.log("offerComponent: ", this.props);
    return (
      <div
        className="col-md-6"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="offerContainer">
          <span>
            Status: <span className="postedBy">{this.props.status}</span>
          </span>
          <span>
            Offer Split Allowed: <span className="postedBy">{this.props.splitOfferFlag ? "Yes" : "No"}</span>
          </span>
          <span>
            Counter Offer Allowed: <span className="postedBy">{this.props.counterOfferFlag ? "Yes" : "No"}</span>
          </span>
          <span>
            Expires: <span className="postedBy">{this.props.expDate.toString().substring(0, 10)}</span>
          </span>
          <div
            style={{ display: "flex", flexDirection: "row", margin: "10px 0" }}
          >
            <div className="offerDetails">
              <span className="offerDetailTop">From:</span>
              <span className="offerCountry">{this.props.srcCountry}</span>
              <div>
                <span className="offerCurrency">{this.props.srcCurrency}{' '}</span>
                <span className="offerAmount">{this.props.remitAmount}</span>
              </div>
            </div>

            <span className="arrowContainer">
              <i className="arrowC la la-arrow-right" />
            </span>

            <div className="offerDetails">
              <span className="offerDetailTop">To:</span>
              <span className="offerCountry">{this.props.destCountry}</span>
              <div>
                <span className="offerCurrency">{this.props.destCurrency}{' '}</span>
                <span className="offerAmount">{this.props.finalAmount}</span>
              </div>
            </div>
          </div>

          {(this.props.status === "Open") ?
              <button
              className="customBtn"
              onClick={() => this.props.getAllOffers(this.props.offer)}
          >Find Matching Offers</button> : ""}

        </div>
      </div>
    );
  }
}
