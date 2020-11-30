import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div
        className="col-md-6"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="offerContainer">
          <span>
            Posted By: <span className="postedBy">{this.props.postedBy}</span>
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

          <button className="customBtn">View Offer</button>
        </div>
      </div>
    );
  }
}
