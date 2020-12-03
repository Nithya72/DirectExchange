import React, { Component } from "react";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import { exchangerates } from "../../helpers/exchangerates";
import { currencyList } from "../../helpers/currencies";

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
                    <span className="PageTitle">Prevailing rates component</span>
                    <br/>
                    <br/>
                    <div className="col-md-8" style={{marginTop:'20px', alignSelf: 'center'}}>
                      <div className="card">
                        <div className="buy-sell-widget">
                        <br/>
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
