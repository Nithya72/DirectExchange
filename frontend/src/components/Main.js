import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";

import LandingPage from "./Landing/LandingPage";
import SignUp from "./Auth/SignUp";
import Dashboard from "./Dashboard/Dashboard";
import { history } from "../helpers/history";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/getMyOffers" component={GetMyOffers} />
            <Route
              exact
              path="/viewOfferMatches"
              component={ViewOfferMatches}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
