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
                </div>
            </div>
        </div>
    );
  }
}

export default PrevailingRates;
