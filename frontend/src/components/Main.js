import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import LandingPage from './Landing/LandingPage';
import SignUp from './Auth/SignUp';
import AllExchangeOffers from "./ExchangeOffers/AllExchangeOffers";
import {history} from '../helpers/history';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={LandingPage}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/allExchangeOffers" component={AllExchangeOffers}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

//Export The Main Component
export default Main;
