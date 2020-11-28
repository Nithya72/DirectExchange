import React, { Component } from "react";
import Header from "./Header";
import Offers from "../ExchangeOffers/Offers";
import Transact from "../Transact/Transact";
import PrevailingRates from "../Rates/PrevailingRates";
import "./Dashboard.css";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: [<Offers />, <Transact />, <PrevailingRates />],
      activeId: 0,
    };
  }
  activeTabChange = (event) => {
    this.setState({ activeId: parseInt(event.currentTarget.dataset.id) });
  };
  render() {
    return (
      <div className="main-dasbhoard">
        <Header />
        <div className="side-nav">
          <ul class="navigation-link">
            <li
              className="dashboardSideBar"
              data-id="0"
              onClick={this.activeTabChange}
            >
              <i class="fas fa-history" aria-hidden="true"></i>Exchange
            </li>
            <li
              className="dashboardSideBar"
              data-id="1"
              onClick={this.activeTabChange}
            >
              <i class="fa fa-credit-card" aria-hidden="true"></i>Transact
            </li>
            <li
              className="dashboardSideBar"
              data-id="2"
              onClick={this.activeTabChange}
            >
              <i class="fa fa-usd" aria-hidden="true"></i>Prevailing Rates
            </li>
            <li
              className="dashboardSideBar"
              data-id="3"
              onClick={this.activeTabChange}
            >
              <i class="fa fa-cog" aria-hidden="true"></i>Settings
            </li>
          </ul>
        </div>
        <div style={{ marginLeft: "300px", padding: "50px 70px" }}>
          {this.state.activeTab[this.state.activeId]}
        </div>
      </div>
    );
  }
}

export default Dashboard;
