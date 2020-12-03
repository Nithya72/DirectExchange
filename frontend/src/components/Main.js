import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { history } from "../helpers/history";

import SignUp from "./Signup/SignUp";
import Login from "./Login/Login";
import GetMyOffers from "./ExchangeOffers/GetMyOffers";
import ViewOfferMatches from "./ExchangeOffers/ViewOfferMatches";
import Transact from "./Transact/Transact";
import PrevailingRates from "./Rates/PrevailingRates";
import viewAllOffers from "./Screens/ViewAllOffers/viewAllOffers";
import ViewOffer from './Screens/ViewOffer/ViewOffer.js';
import OAuth2RedirectHandler from './Login/OAuth2RedirectHandler';
import Verify from './Verify/Verify';
import Profile from "./Profile/Profile";
import BankAccount from './BankAccount/BankAccount';
import AddBankAccount from './BankAccount/AddBankAccount';
import ViewCounterOffers from './ExchangeOffers/ViewCounterOffers';
import ViewCounterOffer from './Screens/ViewCounterOffer/ViewCounterOffer';


//Create a Main Component
class Main extends Component {
  render() {
    return (
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={viewAllOffers} />
            <Route exact path="/ViewOffer" component={ViewOffer} />
            <Route exact path="/ViewCounterOffer" component={ViewCounterOffer} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/getMyOffers" component={GetMyOffers} />
            <Route exact path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route> 
            <Route exact path="/viewOfferMatches" component={ViewOfferMatches}/>
            <Route path="/transact" component={Transact} />
            <Route path="/rates" component={PrevailingRates} />
            <Route path="/verify" component={Verify} />
            <Route path="/profile" component={Profile} />
            <Route path="/account" component={BankAccount} />
            <Route path="/addAccount" component={AddBankAccount} />
            <Route path="/viewCounterOffers" component={ViewCounterOffers} />

            {
              // Make sure this is always last, so we go back to / when we do not know the path.
            }
            <Redirect to="/"/>
          </Switch>
        </Router>
    );
  }
}

export default Main;
