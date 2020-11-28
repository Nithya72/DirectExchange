import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "../helpers/history";


import LandingPage from "./Landing/LandingPage";
import SignUp from "./Signup/SignUp";
import Login from "./Login/Login";
import Offers from "./ExchangeOffers/Offers";
import GetMyOffers from "./ExchangeOffers/GetMyOffers";
import ViewOfferMatches from "./ExchangeOffers/ViewOfferMatches";
import Transact from "./Transact/Transact";
import PrevailingRates from "./Rates/PrevailingRates";


//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/offers" component={Offers} />
            <Route exact path="/getMyOffers" component={GetMyOffers} />
            <Route
              exact
              path="/viewOfferMatches"
              component={ViewOfferMatches}
            />
            <Route path="/transact" component={Transact} />
            <Route path="/rates" component={PrevailingRates} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Main;
