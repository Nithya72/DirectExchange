import React, { Component } from "react";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";

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

  
  render() {
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
                                <input
                                name="amount"
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder="Enter Amount"
                                style = {{fontSize:'20px'}}
                                required
                                value={this.state.amount}
                                onChange={this.onChange}
                              />
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td style={{fontSize:'24px'}}>
                                Country :
                              </td>
                              <td>
                                <input
                                name="amount"
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder="Enter Amount"
                                style = {{fontSize:'20px'}}
                                required
                                value={this.state.amount}
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
                                <input
                                name="amount"
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder="Enter Amount"
                                style = {{fontSize:'20px'}}
                                required
                                value={this.state.amount}
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
                                <input
                                name="amount"
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder="Enter Amount"
                                style = {{fontSize:'20px'}}
                                required
                                value={this.state.amount}
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
                                <input
                                name="amount"
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder="Enter Amount"
                                style = {{fontSize:'20px'}}
                                required
                                value={this.state.amount}
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
                                <input
                                name="amount"
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder="Enter Amount"
                                style = {{fontSize:'20px'}}
                                required
                                value={this.state.amount}
                                onChange={this.onChange}
                              />
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td style={{fontSize:'24px'}}>
                                Features :
                              </td>
                              <td>
                              <select name="destination_currency" className="form-control" style = {{fontSize:'20px'}} 
                              value={this.state.destination_currency} onChange={this.onChange} required>
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
                          <button class='button-dark'>
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
