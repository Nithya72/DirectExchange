import React, { Component } from "react";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";

export class PrevailingRates extends Component {
  render() {
    return (
        <div>
            <Header/>
            <SideBar/>

            <div className="content-body">
                <div className="myContainer">
                    <span className="PageTitle">Prevailing rates component</span>
                    <br/>
                    <br/>
                    <div className="col-md-8" style={{marginTop:'20px', alignSelf: 'center'}}>
                      <div className="card">
                        <div className="buy-sell-widget">
                        <br/>
                        <center>
                          <h3>Exchange Rates</h3>
                          <br/>
                          <table>
                            <tr>
                              <td>
                                <input
                                type="text"
                                name="x_amount"
                                className="form-control"
                                placeholder="Enter Amount"
                                style = {{fontSize:'20px'}}
                              />
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td>
                                <select name="currency" className="form-control" style = {{fontSize:'20px'}} required>
                                  <option value>From Currency</option>
                                  <option value="eur">Euro - EUR</option>
                                  <option value="eur">US Dollar - USD</option>
                                  <option value="eur">British Pound - GBP</option>
                                  <option value="eur">Chinese Renminbi - RMB</option>
                                  <option value="eur">Indian Rupee - INR</option>
                                </select>
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td>
                              <select name="currency" className="form-control" style = {{fontSize:'20px'}} required>
                                <option value>To Currency</option>
                                <option value="eur">Euro - EUR</option>
                                <option value="eur">US Dollar - USD</option>
                                <option value="eur">British Pound - GBP</option>
                                <option value="eur">Chinese Renminbi - RMB</option>
                                <option value="eur">Indian Rupee - INR</option>
                              </select>
                              </td>
                            </tr>
                          </table>
                          <br/>
                          <br/>
                          <h3> 1 Euro (top) is .12 Dollars (bottom)</h3>
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

export default PrevailingRates;
