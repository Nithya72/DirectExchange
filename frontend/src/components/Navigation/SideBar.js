import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export class SideBar extends Component {
  render() {
    return (
      <div className="side-nav">
        <ul class="navigation-link">
          <li className="dashboardSideBar">
            <Link to="/offers">
              <i class="fas fa-history" aria-hidden="true"></i>Exchange
            </Link>
          </li>
          <li className="dashboardSideBar">
            <Link to="/transact">
              <i class="fa fa-credit-card" aria-hidden="true"></i>Transact
            </Link>
          </li>
          <li className="dashboardSideBar">
            <Link to="/rates">
              <i class="fa fa-usd" aria-hidden="true"></i>Prevailing Rates
            </Link>
          </li>
          <li className="dashboardSideBar">
            <Link to="/">
              <i class="fa fa-cog" aria-hidden="true"></i>Settings
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBar;
