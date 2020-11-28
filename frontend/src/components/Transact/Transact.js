import React, { Component } from "react";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import Automatch from "../Automatch/automatch";

export class Transact extends Component {
  render() {
    return (
      <div>
          <Header/>
          <SideBar/>

          <div className="content-body">
              <div className="myContainer">
                  <span className="PageTitle">Transact component</span>
              </div>
          </div>
      </div>
    );
  }
}

export default Transact;
