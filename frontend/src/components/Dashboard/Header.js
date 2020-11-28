import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <div id="main-top-header">
        <div className="container"></div>
        <nav class="navbar navbar-expand-lg navbar-fixed-top">
          <Link to="/" class="logo-wrapper">
            Direct Exchange
          </Link>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          ></div>
          <ul className="navbar-nav">
            <div>
              <li className="nav-item dropdown">
                <Link
                  to="/"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Hello Username!
                </Link>
                <div
                  className="dropdown-menu user-dropdown-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <Link to="/" className="dropdown-item">
                    <i
                      style={{
                        display: "inline-block",
                        marginRight: "2px",
                      }}
                      class="fas fa-users"
                    ></i>
                    Profile
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      this.props.logout();
                    }}
                    className="dropdown-item"
                  >
                    <i
                      style={{
                        display: "inline-block",
                        marginRight: "2px",
                      }}
                      className="fas fa-sign-out-alt"
                    ></i>
                    Logout
                  </Link>
                </div>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
