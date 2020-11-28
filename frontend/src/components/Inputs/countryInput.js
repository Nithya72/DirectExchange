import React, { Component } from "react";


export default class Home extends Component {
  render() {
    return (
                  <div className="form-group col-xl-6">
        <label className="mr-sm-2">Country</label>
        <select className="form-control" name="country">
          <option value>Select</option>
          <option value="India">India</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          </select>
      </div>

    );
  }
}
