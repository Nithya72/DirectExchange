import React, { Component } from 'react';
import '../../App.css';
import '../Signup/Signup.css';
import axios from 'axios';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../constants/index';
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
                    console.log("Successful registration: ", response.data);
                    this.setState({
                        successFlag: true,
                        msg: response.data
                    })
                } else if (response.status === 409) {
                    console.log("User Already Present: ", response.data);
                    this.setState({
                        successFlag: false,
                        msg: response.data
                    })
                }
            })
            .catch(error => {
                console.log("Error ******** :", error);
                this.setState({
                    successFlag: false,
                    msg: "Error"
                })
            });
    }

    render() {

        // var final_msg = null;

        // if (this.state.successFlag === true) {
        //     final_msg = <div class="alert alert-success" role="alert">{this.state.msg}<a href={'/customerLogin'} > Login Here.</a></div>
        // } else if (this.state.successFlag === false) {
        //     final_msg = <div class="alert alert-danger" role="alert">{this.state.msg}</div>
        // }

        // console.log("msg from java controller: ", this.state.msg);

        return (

            <div>
            <Header/>
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
                    </form>
                    <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>

                </div>
            </div>
            </div>
        )
    }
}
export default Login;