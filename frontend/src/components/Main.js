import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import LandingPage from './Landing/LandingPage';
import SignUp from './Auth/SignUp';
import GetMyOffers from "./ExchangeOffers/GetMyOffers";
import {history} from '../helpers/history';
import ViewOfferMatches from "./ExchangeOffers/ViewOfferMatches";

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={LandingPage}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/getMyOffers" component={GetMyOffers}/>
                        <Route exact path="/viewOfferMatches" component={ViewOfferMatches}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

//Export The Main Component
export default Main;
