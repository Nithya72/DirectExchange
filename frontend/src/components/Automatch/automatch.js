import React, { Component } from "react";

export default class Automatch extends Component {
  render() {
    return (
        <div className="col-md-10" style={{marginTop:'20px', alignSelf: 'center'}}>
          <div className="card">
            <div className="card-body">
              <div className="buy-sell-widget">
                <h3>Automatch</h3>
                <div className="tab-content tab-content-default">
                  <div
                    className="tab-pane fade show active"
                    id="buy"
                    role="tabpanel"
                  >
                    <form
                      method="post"
                      name="myform"
                      className="currency_validate"
                    >
                      <div className="form-group">
                        <label className="mr-sm-2">Currency</label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label className="input-group-text">
                              <i className="cc BTC-alt" />
                            </label>
                          </div>
                          <select name="currency" className="form-control">
                            <option value>Select</option>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="litecoin">Litecoin</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="mr-sm-2">Enter your amount</label>
                        <div className="input-group">
                          <input
                            type="text"
                            name="currency_amount"
                            className="form-control"
                            placeholder="0.0214 BTC"
                          />
                          <input
                            type="text"
                            name="usd_amount"
                            className="form-control"
                            placeholder="125.00 USD"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
