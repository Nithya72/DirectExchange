import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import PostOffer from "./PostOffer";
import jwt_decode from "jwt-decode";

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

    axios.defaults.headers.common['authorization']= 'Bearer ' + localStorage.getItem('token');
    var decodedToken = jwt_decode(localStorage.getItem('token'));
    console.log("decodedUserId: ", decodedToken.sub);

    axios
      .get("http://localhost:8080/directexchange/user/myoffer/"+decodedToken.sub)
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
            {this.state.myOffers && this.state.myOffers.length !== 0 ? (
              this.state.myOffers.map((offer) => (
                <table>
                  <tr>
                    <td>SOURCE COUNTRY:</td>
                    <td> {offer.srcCurrency}</td>
                  </tr>
                  <tr>
                    <td>REMIT AMOUNT:</td>
                    <td> {offer.remitAmount}</td>
                  </tr>
                  <tr>
                    <td>DESTINATION CURRENCY:</td>
                    <td> {offer.destCurrency}</td>
                  </tr>
                  <tr>
                    <td>COUNTER OFFER FLAG:</td>
                    <td> {offer.counterOfferFlag.toString()}</td>
                  </tr>
                  <tr>
                    <td>SPLIT OFFER FLAG:</td>
                    <td> {offer.splitOfferFlag.toString()}</td>
                  </tr>
                  <tr>
                    <td>EXPIRATION DATE:</td>
                    <td> {offer.expDate.toString().substring(0, 10)}</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="button"
                        value="Find Matching Offers"
                        onClick={() => this.getAllOffers(offer)}
                      />
                    </td>
                  </tr>
                  <br />
                </table>
              ))
            ) : (
              <div> No offers yet!</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default GetMyOffers;
