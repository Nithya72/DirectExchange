import React, { Component } from "react";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import { currencyList, countries } from "../../helpers/currencies";

export class BankAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      source_currency: "",
      destination_currency: "",
      amount: ""
    };
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

  
  render() {

    let countries = null;

    if (
      this.state.primaryCurrency !== "" &&
      this.state.primaryCurrency !== undefined
    ) {
      countries = this.getCountries(this.state.primaryCurrency);
    }

    return (
        <div>
            <Header/>
            <SideBar/>

            <div className="content-body">
                <div className="myContainer">
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
                                <input name="accountNumber" type="text" className="form-control"
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
                                <option defaultValue value="">Only Send</option>
                                <option defaultValue value="">Only Receive</option>
                                <option defaultValue value="">Send and Receive</option>
                              </select>
                              </td>
                            </tr>
                          </table>
                          <br/>
                          <br/>
                          <button class="btn btn-success myButton">
                          Submit
                          </button>
                          <br/>
                          <br/>
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
