import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
export class Header extends Component {
  render() {
    return (
      // <div id="main-top-header">
      //   <div className="container"></div>
      //   <nav class="navbar navbar-expand-lg navbar-fixed-top">
      //     <Link to="/" class="logo-wrapper">
      //       Direct Exchange
      //     </Link>
      //     <div
      //       class="collapse navbar-collapse justify-content-end"
      //       id="navbarSupportedContent"
      //     ></div>
      //     <ul className="navbar-nav">
      //       <div>
      //         <li className="nav-item dropdown">
      //           <Link
      //             to="/"
      //             className="nav-link dropdown-toggle"
      //             id="navbarDropdown"
      //             role="button"
      //             data-toggle="dropdown"
      //             aria-haspopup="true"
      //             aria-expanded="false"
      //           >
      //             Hello Username!
      //           </Link>
      //           <div
      //             className="dropdown-menu user-dropdown-menu"
      //             aria-labelledby="navbarDropdown"
      //           >
      //             <Link to="/" className="dropdown-item">
      //               <i
      //                 style={{
      //                   display: "inline-block",
      //                   marginRight: "2px",
      //                 }}
      //                 class="fas fa-users"
      //               ></i>
      //               Profile
      //             </Link>
      //             <Link
      //               to="/"
      //               onClick={() => {
      //                 this.props.logout();
      //               }}
      //               className="dropdown-item"
      //             >
      //               <i
      //                 style={{
      //                   display: "inline-block",
      //                   marginRight: "2px",
      //                 }}
      //                 className="fas fa-sign-out-alt"
      //               ></i>
      //               Logout
      //             </Link>
      //           </div>
      //         </li>
      //       </div>
      //     </ul>
      //   </nav>
      // </div>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <nav className="navbar">
                <div className="header-search">
                  <form action="#">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search" />
                      <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-search" /></span>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="dashboard_log my-2">
                  <div className="d-flex align-items-center">
                    <div className="profile_log dropdown">
                      <div className="user" data-toggle="dropdown">
                        <span className="thumb"><i className="mdi mdi-account" /></span>
                        <span className="name">Carla Pascle</span>
                        <span className="arrow"><i className="la la-angle-down" /></span>
                      </div>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a href="accounts.html" className="dropdown-item">
                          <i className="mdi mdi-account" /> Account
                        </a>
                        <a href="history.html" className="dropdown-item">
                          <i className="la la-book" /> History
                        </a>
                        <a href="settings.html" className="dropdown-item">
                          <i className="la la-cog" /> Setting
                        </a>
                        <a href="lock.html" className="dropdown-item">
                          <i className="la la-lock" /> Lock
                        </a>
                        <a href="/login" className="dropdown-item logout">
                          <i className="la la-sign-out" /> Logout
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
