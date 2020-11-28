import React, { Component } from "react";

import Automatch from '../../Automatch/automatch.js';

export default class Home extends Component {
  render() {
    return (
      <div className="myContainer">
        <span className="PageTitle">View All Offers</span>
        <Automatch />
      </div>
    );
  }
}
