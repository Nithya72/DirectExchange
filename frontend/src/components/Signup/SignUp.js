import React, { Component } from 'react';
import '../../App.css';
import './Signup.css';
import axios from 'axios';
import LandingPage from "../Landing/LandingPage";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../constants/index';
import fbLogo from '../img/fb-logo.png';
import googleLogo from '../img/google-logo.png';
import Header from "../Navigation/Header";
import { Link, Redirect } from 'react-router-dom'

export class SignUp extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailID: "",
            password: "",
            nickname: "",
            submitted: false
        }
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        })        
    }

    submitSignUp = (e) => {
        e.preventDefault();
        const data = {
            emailId: this.state.emailID,
            password: this.state.password,
            nickname: this.state.nickname
        }
        console.log("sign up data: ", data);

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:8080/directexchange/auth/signup', data)
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

        var final_msg = null;

        if (this.state.successFlag === true) {
            final_msg = <div class="alert alert-success" role="alert">{this.state.msg}<a href={'/customerLogin'} > Login Here.</a></div>
        } else if (this.state.successFlag === false) {
            final_msg = <div class="alert alert-danger" role="alert">{this.state.msg}</div>
        }

        console.log("msg from java controller: ", this.state.msg);

        return (

            <div>
            <Header/>
            {final_msg}
            <div className="container">
                <div className="content">

                    <h1 className="title">Signup with DirectExchange</h1>

                    <div className="social-signup">
                        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                            <img src={googleLogo} alt="Google" />
                            Sign up with Google
                        </a>
                        
                        <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                            <img src={fbLogo} alt="Facebook" />
                            Sign up with Facebook
                        </a>
                    </div>

                    <div className="or-separator"><div className="or-text">OR</div></div>

                    <form>
                        <div className="form-item">
                            <input onChange={this.changeHandler} type="email" className="form-control" name="emailID"
                                value={this.state.emailID} required placeholder="Username"/>
                        </div>

                        <div className="form-item">
                            <input onChange={this.changeHandler} type="text" className="form-control" name="nickname"
                                value={this.state.nickname} required placeholder="Nick name"/>
                        </div>

                        <div className="form-item">
                            <input onChange={this.changeHandler} type="password" className="form-control" name="password"
                                value={this.state.password} required placeholder="Password"/>
                        </div>
                        
                        <div className="form-item">
                            <button onClick={this.submitSignUp} className="btn btn-block btn-primary" type="submit">
                                Sign Up 
                            </button>
                        </div>
                    </form>
                    <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                </div>
            </div>
            </div>
        )
    }
}
export default SignUp;