import React, { Component } from "react";
import "./App.css";
import "./styles/css/style.css";
import Header from "./components/Navigation/Header.js";
import SideBar from "./components/Navigation/SideBar";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";

//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div className="main-wrapper">
          <Header />
          <SideBar />
          <div className="content-body">
            <Main />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
