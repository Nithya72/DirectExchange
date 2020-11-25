import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import LandingPage from "../Landing/LandingPage";

export class SignUp extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailID: "",
            password: "",
            submitted: false
        }

        this.submitSignUp = this.submitSignUp.bind(this);
        this.emailIDHandler = this.emailIDHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
    }

    emailIDHandler = (e) => {
        this.setState({
            emailID: e.target.value
        });
    }
    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    submitSignUp = (e) => {

        e.preventDefault();
        const data = {
            emailID: this.state.emailID,
            password: this.state.password
        }
        //set the with credentials to true

        console.log("sign up data: ", data);

        // axios.defaults.withCredentials = true;

        axios.post('http://localhost:8080/directexchange/auth/signup', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Successful registration: ", response.data);
                    this.setState({
                        successFlag: true,
                        msg: response.data
                    })
                }
            })
            .catch(error => {
                console.log("Here we captured the error")
                this.setState({
                    successFlag: false,
                    msg: "Oops! We couldn't register you now. Try after sometime."
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
            <div >
                <LandingPage />
               Inside Sign Up

                <form>
                    <br/>
                    <div className="form-group">
                        <input onChange={this.emailIDHandler} type="email" className="form-control" name="emailID"
                               required="required" placeholder="Email ID"/>
                    </div>

                    <br/>
                    <div className="form-group">
                        <input onChange={this.passwordHandler} type="password" className="form-control" name="password"
                               required="required" placeholder="Password"/>
                    </div>
                    <br/>
                    <div>
                        <button onClick={this.submitSignUp} className="btn btn-success sign-up-button"
                                type="submit">Sign Up
                        </button>
                    </div>
                </form>

            </div>
        )
    }
}
export default SignUp;