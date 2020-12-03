import React, { Component } from "react";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import { currencyList, countries } from "../../helpers/currencies";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Redirect } from 'react-router-dom'

export class BankAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.getBankAccounts();
  }

  getBankAccounts = () => {
    var redirecturl = null;
    if(localStorage.getItem('token')) {
    axios.defaults.headers.common["authorization"] =
      "Bearer " + localStorage.getItem("token");
    var decodedToken = jwt_decode(localStorage.getItem("token"));
    console.log("decodedUserId: ", decodedToken.sub);

    axios
      .get(
        "http://localhost:8080/directexchange/bank-accounts/" + decodedToken.sub
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Fetched All Bank Accounts: ", response.data);
          this.setState({
            myBankAccounts: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("Here we captured the error: ", error);
        this.setState({
          myBankAccounts: null,
        });
      });
    } else {
      redirecturl = <Redirect to="/login"/>;
  }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getCurrencies = () => {
    let currencies = currencyList.map((curr) => {
      return (
        <option key={curr.code} value={curr.code}>
          {curr.name} - {curr.code}
        </option>
      );
    });
    return currencies;
  };
  getCountries = (currency) => {
    let listofcountries = countries[currency].split("|");
    let countriesList = listofcountries
      .filter((name) => name !== "")
      .map((name) => {
        return <option value={name}>{name}</option>;
      });
    return countriesList;
  };

  bankDetails = (myBankAccounts) => {
    var bankDetailsDisplay = [];
    myBankAccounts.map((account) => {
      var bankDetailDisplay = (
        <div
          className="col-md-6"
          style={{ display: "flex", justifyContent: "center", marginLeft:'25%' }}
        >
        <div className="offerContainer" style={{width:'200%'}}>
          <br/>
          <span className="bankDetailsHeading">
            Bank Name: &emsp; <span className="bankDetails">{account.bankName}</span>
          </span>
          <br/>
          <span className="bankDetailsHeading">
            Account Number: &emsp; <span className="bankDetails">{account.accountNumber}</span>
          </span>
          <br/>
          <span className="bankDetailsHeading">
            Owner Name: &emsp; <span className="bankDetails">{account.ownerName}</span>
          </span>
          <br/>
          <span className="bankDetailsHeading">
            Owner Address: &emsp; <span className="bankDetails">{account.ownerAddress}</span>
          </span>
          <br/>
          <span className="bankDetailsHeading">
            Primary Cussrncy: &emsp; <span className="bankDetails">{account.primaryCurrency}</span>
          </span>
          <br/>
          <span className="bankDetailsHeading">
          Country: &emsp; <span className="bankDetails">{account.country}</span>
          </span>
          <br/>
          <span className="bankDetailsHeading">
          Features: &emsp; <span className="bankDetails">{account.features}</span>
          </span>
          <br/>
        </div>
      </div>
      );
      bankDetailsDisplay.push(bankDetailDisplay);
    });
    return bankDetailsDisplay;
  }

  addBankAccount = (e) => {
    e.preventDefault();
    const data = {
      bankName : this.state.bankName,
      accountNumber : this.state.accountNumber,
      ownerName : this.state.ownerName,
      ownerAddress : this.state.ownerAddress,
      primaryCurrency : this.state.primaryCurrency,
      country : this.state.country,
      features : this.state.features
    }
    console.log("Update Profile: ", data);

    axios.defaults.headers.common["authorization"] =
      "Bearer " + localStorage.getItem("token");
    var decodedToken = jwt_decode(localStorage.getItem('token'));
    axios.post('http://localhost:8080/directexchange/bank-accounts/' + decodedToken.sub, data)
        .then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                console.log("Successfully Added Bank Details: ", response.data);
                this.setState({
                    successFlag: true,
                });
                window.location.reload(false);
            }
        })
        .catch(error => {
            console.log("Error ******** :", error);
            this.setState({
                successFlag: false,
                errorFlag:true,
                msg: error.response.data
            })
        });

      }
  
  render() {

    let countries = null, banksToDisplay = null;

    if (
      this.state.primaryCurrency !== "" &&
      this.state.primaryCurrency !== undefined
    ) {
      countries = this.getCountries(this.state.primaryCurrency);
    }

    if(this.state.myBankAccounts) {
      banksToDisplay = this.bankDetails(this.state.myBankAccounts);
      if (banksToDisplay.length === 0) {
        banksToDisplay = (
          <div
            className="col-md-6"
            style={{ display: "flex", justifyContent: "center", marginLeft:'25%' }}
            >
            <div className="offerContainer" style={{width:'200%'}}>
              <span className="bankDetailsHeading">
                No Bank Accounts To Display.
              </span>
            </div>
          </div>
        );
      }
    }

    var message = null, redirectUrl = null;
        
    if (this.state.successFlag === true) {
        message = <div class="alert alert-success" role="alert">Bank Account Added Successfully!</div>
    } else if (this.state.errorFlag === true) {
        message = <div class="alert alert-danger" role="alert">{this.state.msg}</div>
    }

    if(!localStorage.getItem('token')) {
      redirectUrl = <Redirect to="/login"/>;
    }

    console.log("msg from java controller: ", this.state.msg);

    return (
        <div>
        {redirectUrl}
            <Header/>
            <SideBar/>
            <div className="content-body">
                <div className="myContainer">
                <span className="PageTitle">Bank Account Details</span>
                <br/>
                    {banksToDisplay}
                    <br/>
                    <span className="PageTitle">Bank Account Setup</span>
                    <br/>
                    <br/>
                    <div className="col-md-8" style={{marginTop:'20px', alignSelf: 'center'}}>
                      <div className="card">
                        <div className="buy-sell-widget">
                        <br/>
                        <br/>
                        <center>
                          <h3>Please Provide Bank Details</h3>
                          <br/>
                          <form onSubmit={this.addBankAccount} >
                          <table>
                            <tr>
                              <td style={{fontSize:'24px'}}>
                                Bank name :
                              </td>
                              <td>
                                <input name="bankName" type="text" className="form-control"
                                style = {{fontSize:'20px'}} required value={this.state.bankName}
                                onChange={this.onChange}
                              />
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td style={{fontSize:'24px'}}>
                                Account Number :
                              </td>
                              <td>
                                <input name="accountNumber" type="number" min="0" className="form-control"
                                style = {{fontSize:'20px'}} required value={this.state.accountNumber}
                                onChange={this.onChange}
                              />
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td style={{fontSize:'24px'}}>
                                Owner Name :
                              </td>
                              <td>
                                <input name="ownerName" type="text" className="form-control" 
                                style = {{fontSize:'20px'}} required value={this.state.ownerName}
                                onChange={this.onChange}
                              />
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td style={{fontSize:'24px'}}>
                                Owner Address :
                              </td>
                              <td>
                                <input name="ownerAddress" type="text" className="form-control"
                                style = {{fontSize:'20px'}} required value={this.state.ownerAddress}
                                onChange={this.onChange}
                              />
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td style={{fontSize:'24px'}}>
                                Primary Currency :
                              </td>
                              <td>
                              <select class="form-control" name="primaryCurrency" style = {{fontSize:'20px'}}
                                value={this.state.primaryCurrency} onChange={this.onChange} required
                              >
                                <option defaultValue value="">
                                Select Currency
                                </option>
                                {this.getCurrencies()}
                              </select>
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td style={{fontSize:'24px'}}>
                                Country :
                              </td>
                              <td>
                              <select class="form-control" name="country" style = {{fontSize:'20px'}}
                                value={this.state.country} onChange={this.onChange} required
                              >
                                <option defaultValue value="">
                                Select Country
                                </option>
                                {countries}
                              </select>
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td style={{fontSize:'24px'}}>
                                Features :
                              </td>
                              <td>
                              <select name="features" className="form-control" style = {{fontSize:'20px'}} 
                              value={this.state.features} onChange={this.onChange} required>
                                <option defaultValue value="">Select option</option>
                                <option defaultValue value="Send">Only Send</option>
                                <option defaultValue value="Receive">Only Receive</option>
                                <option defaultValue value="Both">Send and Receive</option>
                              </select>
                              </td>
                            </tr>
                          </table>
                          <br/>
                          <br/>
                          <button class="btn btn-success myButton"
                          type="submit">
                          Submit
                          </button>
                          </form>
                          <br/>
                          <br/>
                          <br/>
                          {message}
                          
                          <br/>
                          </center>
                          
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default BankAccount;
