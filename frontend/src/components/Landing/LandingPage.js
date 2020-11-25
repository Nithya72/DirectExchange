import React, {Component} from 'react';
import cookie from 'react-cookies';
import './landing.css';

//create the LandingPage Component
class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', {path: '/'})
    }

    render() {

        return (
            <body>
            <div className="navbar">
                Direct Exchange
                <span className="landing-nav-auth">English <i className="fas fa-caret-down"></i></span>
                <span className="landing-auth"><a href={"/signup"}>Sign Up</a></span>
                <span className="landing-auth">Log In</span>
                <span className="landing-auth">Help</span>
            </div>
            <table className="landing-nav-table">
                <td>Prevailing Rates</td>
                <td>Post Exchange Offer</td>
                <td>Accept Exchange Offer</td>
            </table>

            <div className="hr"></div>

            </body>
        )
    }
}

export default LandingPage;