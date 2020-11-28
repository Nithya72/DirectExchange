import React, { Component } from "react";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";

export class PrevailingRates extends Component {
  render() {
    return (
      <div className="main-dasbhoard">
        <Header />
        <SideBar />
        <div style={{ marginLeft: "300px", padding: "50px 70px" }}>
          Put your component stuff here!
        </div>
      </div>
    );
  }
}

export default PrevailingRates;
