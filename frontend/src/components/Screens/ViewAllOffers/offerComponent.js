import React, {Component} from "react";
import {Link} from "react-router-dom";
import StarRatings from 'react-star-ratings';

export default class Home extends Component {
  render() {
    return (
        <div
            className="col-md-6"
            style={{display: "flex", justifyContent: "center"}}
        >
          <div className="offerContainer">
          <span>
            Posted By: <span className="postedBy">{this.props.postedBy}</span> &emsp;
            {this.props.offerObj.user.rating > 0 ?
                <span className="postedBy"><span style={{color: "#8691b4"}}>Rating: </span>{this.props.offerObj.user.rating}&nbsp;
                <StarRatings rating={1} starRatedColor="red" starDimension='17px' numberOfStars={1} name='rating'/>
         </span>
                : ""}

          </span>
            <div
                style={{display: "flex", flexDirection: "row", margin: "10px 0"}}
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
              <i className="arrowC la la-arrow-right"/>
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

            <Link
                to={{pathname: '/ViewOffer', state: {offerObj: this.props.offerObj}}}
                className="customBtn"
            >View Offer</Link>
          </div>
        </div>
    );
  }
}
