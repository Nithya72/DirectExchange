import React, { Component } from "react";

import Automatch from "../../Automatch/automatch.js";

export default class Home extends Component {
  render() {
    return (
      <div className="myContainer">
        <span className="PageTitle">View All Offers</span>
        <Automatch />

        <div className="row">
          <div className="col-xl-2">
            <div className="card">
              <div className="card-body" style={{ height: "300px" }}>
                <h4 className="card-title">Filters</h4>
                <div style={{marginTop:'30px'}}>
                <div className="myFormGroup form-group">
                  <label className="myInputLabel">Source Country</label>
                  <select className="form-control" name="country">
                    <option value>Select</option>
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="myInputLabel">Source Currency</label>
                  <select className="form-control" name="country">
                    <option value>Select</option>
                    <option value="INR">INR</option>
                    <option value="GBP">GBP</option>
                    <option value="USD">USD</option>
                  </select>
                </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
