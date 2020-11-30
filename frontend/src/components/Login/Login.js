import React, { Component } from 'react';
import '../../App.css';
import '../Signup/Signup.css';
import axios from 'axios';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../constants/index';
import fbLogo from '../img/fb-logo.png';
import googleLogo from '../img/google-logo.png';
import Header from "../Navigation/Header";
import { Link, Redirect } from 'react-router-dom'

export class Login extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailID: "",
            password: "",
            submitted: false
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        if (token) {
            this.setState({
                successFlag:true,
            })
        }
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            this.setState({
                errorFlag: true,
                successFlag: false,
                msg: this.props.location.state.error
            });
            setTimeout(() => {
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    
    }

    changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        })        
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            emailId: this.state.emailID,
            password: this.state.password,
        }
        console.log("sign up data: ", data);

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:8080/directexchange/auth/login', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Successful Login: ", response.data);
                    localStorage.setItem("token", response.data.accessToken);
                    this.setState({
                        successFlag: true,
                        msg: response.data
                    })
                }
            })
            .catch(error => {
                console.log("Error ******** :", error.response);
                this.setState({
                    errorFlag: true,
                    successFlag: false,
                    msg: error.response.data,
                })
            });
    }

    render() {

        var redirectUrl, errorMessage;
        if (this.state.successFlag === true) {
            redirectUrl = <Redirect to="/transact"></Redirect>
        } else if ( this.state.errorFlag === true ) {
            errorMessage = <div style={{color:'red'}}>{this.state.msg}</div>
        }

        return (

            <div>
            {redirectUrl}
            <div className="container">
                <div className="content">

                    <h1 className="title">Login to DirectExchange</h1>

                    <div className="social-signup">
                        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                            <img src={googleLogo} alt="Google" />
                            Sign in with Google
                        </a>
                        
                        <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                            <img src={fbLogo} alt="Facebook" />
                            Sign in with Facebook
                        </a>
                    </div>

                    <div className="or-separator"><div className="or-text">OR</div></div>
                                        
                    <form>
                        <div className="form-item">
                            <input onChange={this.changeHandler} type="email" className="form-control" name="emailID"
                                value={this.state.emailID} required placeholder="Username"/>
                        </div>

                        <div className="form-item">
                            <input onChange={this.changeHandler} type="password" className="form-control" name="password"
                                value={this.state.password} required placeholder="Password"/>
                        </div>
                        
                        <div className="form-item">
                            <button onClick={this.submitLogin} className="btn btn-block btn-primary" type="submit">
                                Login
                            </button>
                        </div>
                        {errorMessage}
                    </form>
                    <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>

                </div>
            </div>
            </div>
        )
    }
}
export default Login;