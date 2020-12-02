import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import PostOffer from "./PostOffer";
import jwt_decode from "jwt-decode";
import OfferComponent from "./offerComponent.js";

export class GetMyOffers extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      submitted: false,
      myOffers: "",
      allOffers: "",
      offer: "",
      redirectToFindMatches: "",
    };
    this.getAllOffers = this.getAllOffers.bind(this);
  }

  componentDidMount() {
    // axios.defaults.withCredentials = true;

    axios.defaults.headers.common["authorization"] =
      "Bearer " + localStorage.getItem("token");
    var decodedToken = jwt_decode(localStorage.getItem("token"));
    console.log("decodedUserId: ", decodedToken.sub);

    axios
      .get(
        "http://localhost:8080/directexchange/user/myoffer/" + decodedToken.sub
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Fetched All Offers: ", response.data);
          this.setState({
            successFlag: true,
            myOffers: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("Here we captured the error: ", error);
        this.setState({
          successFlag: false,
          myOffers: null,
        });
      });
  }

  getAllOffers = (e) => {
    console.log("offer details: ", e);

    this.setState({
      offer: e,
      redirectToAcceptOffer: true,
    });
  };

  render() {
    console.log("msg from java controller: ", this.state.myOffers);
    var redirectVar = "";

    if (this.state.redirectToAcceptOffer) {
      redirectVar = (
        <Redirect
          to={{
            pathname: "/viewOfferMatches",
            state: { offer: this.state.offer },
          }}
        />
      );
    }

    return (
      <div>
        {redirectVar}
        <Header />
        <SideBar />

        <div className="content-body">
          <div className="myContainer">
            <span className="PageTitle">Get My Offers</span>
            <PostOffer />

            <div className="col-xl-9" style={{ maxWidth: "900px" }}>
              <div className="row">
                {this.state.myOffers && this.state.myOffers.length !== 0 ? (
                  this.state.myOffers.map((offer) => (
                    <OfferComponent
                      offer={offer}
                      key={offer.offerId}
                      expDate={offer.expDate}
                      srcCountry={offer.srcCountry}
                      srcCurrency={offer.srcCurrency}
                      remitAmount={offer.remitAmount}
                      destCurrency={offer.destCurrency}
                      destCountry={offer.destCountry}
                      finalAmount={offer.finalAmount}
                      status = {offer.status}
                      getAllOffers={this.getAllOffers}
                      splitOfferFlag={offer.splitOfferFlag}
                      counterOfferFlag={offer.counterOfferFlag}
                    />
                  ))
                ) : (
                  <div className="preloading">
                    <div id="preloader">
                      <div className="sk-three-bounce">
                        <div className="sk-child sk-bounce1" />
                        <div className="sk-child sk-bounce2" />
                        <div className="sk-child sk-bounce3" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetMyOffers;
