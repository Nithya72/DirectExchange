import React, {Component} from "react";
import "../../App.css";
import axios from "axios";
import {Redirect} from "react-router";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import PostOffer from "./PostOffer";
import jwt_decode from "jwt-decode";
import Collapsible from "react-collapsible";
import CounterOfferComponent from "./CounterOfferComponent";

export class ViewCounterOffers extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      submitted: false,
      myCounterOffers: "",
      counterOfferForMe: "",
    };
  }

  componentDidMount() {
    // axios.defaults.withCredentials = true;

    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    var decodedToken = jwt_decode(localStorage.getItem('token'));
    console.log("decodedUserId: ", decodedToken.sub);
    axios
        .get("http://localhost:8080/directexchange/user/counteroffer/" + decodedToken.sub)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("Fetched All Offers: ", response.data);
            this.setState({
              successFlag: true,
              myCounterOffers: response.data.mycounterOffers,
              counterOffersForMe: response.data.counterOffersForMe
            });
          }
        })
        .catch((error) => {
          console.log("Here we captured the error: ", error);
          this.setState({
            successFlag: false,
            myCounterOffers: null,
            counterOfferForMe: null
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
    console.log("counterOfferForMe: ", this.state.myCounterOffers);
    var redirectVar = "";

    return (
        <div>
          <Header/>
          <SideBar/>
          <div className="content-body">
            <div className="myContainer">
              <div className="col-xl-12">
                <div className="card" style={{width: "1000px"}}>

                  <div className="card-header">
                    <h5 className="card-title" style={{fontSize: "28px"}}>Counter Offers</h5>
                  </div>
                  <br /><br />
                  {this.state.counterOffersForMe && this.state.counterOffersForMe.length !== 0 ?

                      this.state.counterOffersForMe.map(offerObj => {
                        return (
                            <CounterOfferComponent
                                senderOffer={offerObj.senderOffer}
                                receiverOffer={offerObj.receiverOffer}
                                senderCountry={offerObj.senderOffer.srcCountry}
                                senderCurrency={offerObj.senderOffer.srcCurrency}
                                senderRemitAmount={offerObj.senderOffer.remitAmount}
                                receiverCountry={offerObj.receiverOffer.srcCountry}
                                receiverCurrency={offerObj.receiverOffer.srcCurrency}
                                receiverRemitAmount={offerObj.receiverOffer.remitAmount}
                                counterOfferAmount={offerObj.counterOfferAmount}
                                senderNickName={offerObj.sender.nickName}
                                receiverNickName={offerObj.receiver.nickName}
                            />
                        )
                      }) : <div> No Counter Offer Posted Yet! </div>}


                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default ViewCounterOffers;
