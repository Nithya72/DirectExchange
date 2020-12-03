import React, { Component } from "react";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import { exchangerates } from "../../helpers/exchangerates";
import { currencyList } from "../../helpers/currencies";
import { Link } from 'react-router-dom';

export class PrevailingRates extends Component {

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

  calculateAmountRecieved = () => {
    if (
      this.state.source_currency !== "" &&
      this.state.destination_currency !== "" &&
      this.state.amount !== ""
    ) {
      let value =
        exchangerates[this.state.source_currency][
          this.state.destination_currency
        ] *
        parseFloat(this.state.amount).toFixed(2) *
        0.9995;
      let statement = this.state.amount + " " + this.state.source_currency + " in " +  this.state.destination_currency + " is " + value.toFixed(2);
      
      return statement;
    }
  };

  render() {
    return (
        <div>
            <Header/>
            <SideBar/>

            <div className="content-body">
                <div className="myContainer">
                    <span className="PageTitle">Prevailing rates</span>
                    <br/>
                    <a href="#A" style={{fontSize:'20px'}}>Calculate for custom amount?</a>
                    <br/>
                    <div className="col-md-8" style={{marginTop:'20px', alignSelf: 'center', marginLeft:'-60px'}}>
                      <div className="card">
                        <div className="buy-sell-widget">
                          <table class="table table-hover">
                          <thead class="thead-dark">
                          <tr>
                          <th scope="col"> #</th>
                          <th scope="col">USD</th> 
                          <th scope="col">EUR</th>
                          <th scope="col">GBP</th> 
                          <th scope="col">INR</th>
                          <th scope="col">RMB</th> 
                        </tr>
                        </thead>
                        <tr>
                        <thead class="thead-dark">
                          <th scope="row">USD</th> 
                          </thead>
                          <td>{exchangerates['USD']['USD']}</td>
                          <td>{exchangerates['USD']['EUR']}</td>
                          <td>{exchangerates['USD']['GBP']}</td>
                          <td>{exchangerates['USD']['INR']}</td>
                          <td>{exchangerates['USD']['RMB']}</td>
                        </tr>
                        <tr>
                        <thead class="thead-dark">
                        <th scope="row">EUR</th> 
                        </thead>
                        <td>{exchangerates['EUR']['USD']}</td>
                        <td>{exchangerates['EUR']['EUR']}</td>
                        <td>{exchangerates['EUR']['GBP']}</td>
                        <td>{exchangerates['EUR']['INR']}</td>
                        <td>{exchangerates['EUR']['RMB']}</td>
                        </tr>
                        <tr>
                        <thead class="thead-dark">
                        <th scope="row">GBP</th> 
                        </thead> 
                        <td>{exchangerates['GBP']['USD']}</td>
                        <td>{exchangerates['GBP']['EUR']}</td>
                        <td>{exchangerates['GBP']['GBP']}</td>
                        <td>{exchangerates['GBP']['INR']}</td>
                        <td>{exchangerates['GBP']['RMB']}</td>
                        </tr>
                        <tr>
                        <thead class="thead-dark">
                        <th scope="row">INR</th> 
                        </thead> 
                        <td>{exchangerates['INR']['USD']}</td>
                        <td>{exchangerates['INR']['EUR']}</td>
                        <td>{exchangerates['INR']['GBP']}</td>
                        <td>{exchangerates['INR']['INR']}</td>
                        <td>{exchangerates['INR']['RMB']}</td>
                        </tr>
                        <tr>
                        <thead class="thead-dark">
                        <th scope="row">RMB</th> 
                        </thead>
                        <td>{exchangerates['RMB']['USD']}</td>
                        <td>{exchangerates['RMB']['EUR']}</td>
                        <td>{exchangerates['RMB']['GBP']}</td>
                        <td>{exchangerates['RMB']['INR']}</td>
                        <td>{exchangerates['RMB']['RMB']}</td>
                        </tr>    
                          </table>
                        </div>
                      </div>
                    </div>
                    <br/>
                    <span className="PageTitle">Calculate for custom amount</span>
                    <br/>
                    <a name="A"></a>
                    <div className="col-md-8" style={{marginTop:'20px', alignSelf: 'center', marginLeft:'-60px'}}>
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
                                name="amount"
                                type="number"
                                min="0"
                                step="0.01"
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
                              <td>
                                <select name="source_currency" className="form-control" style = {{fontSize:'20px'}} 
                                  value={this.state.source_currency} onChange={this.onChange} required>
                                  <option defaultValue value="">Source Currency</option>
                                  {this.getCurrencies()}
                                </select>
                              </td>
                            </tr>
                            <br/>
                            <tr>
                              <td>
                              <select name="destination_currency" className="form-control" style = {{fontSize:'20px'}} 
                              value={this.state.destination_currency} onChange={this.onChange} required>
                                <option defaultValue value="">Destination Currency</option>
                                {this.getCurrencies()}
                              </select>
                              </td>
                            </tr>
                          </table>
                          <br/>
                          <h3>
                          {this.calculateAmountRecieved()}
                          </h3>
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
