import React, { Component } from "react";

import Header from "../../Navigation/Header";
import SideBar from "../../Navigation/SideBar";

import Automatch from "../../Automatch/automatch.js";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <SideBar />

        <div className="content-body">
          <div className="myContainer">
            <span className="PageTitle">View All Offers</span>
            <Automatch />

            <div className="row">
              <div className="col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Filters</h4>
                    <div style={{ marginTop: "30px" }}>
                      <div className="myFormGroup form-group">
                        <label className="myInputLabel">Source Country</label>
                        <select className="form-control" name="country">
                          <option value>Select</option>
                          <option value="India">India</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                        </select>
                      </div>

                      <div className="myFormGroup form-group">
                        <label className="myInputLabel">Source Currency</label>
                        <select className="form-control" name="country">
                          <option value>Select</option>
                          <option value="INR">INR</option>
                          <option value="GBP">GBP</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label className="myInputLabel">Price</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Start"
                            name="fullname"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label className="myInputLabel">{"\u00A0"}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="End"
                            name="fullname"
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                      <div className="myFormGroup form-group">
                        <label className="myInputLabel">Target Country</label>
                        <select className="form-control" name="country">
                          <option value>Select</option>
                          <option value="India">India</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                        </select>
                      </div>

                      <div className="myFormGroup form-group">
                        <label className="myInputLabel">Target Currency</label>
                        <select className="form-control" name="country">
                          <option value>Select</option>
                          <option value="INR">INR</option>
                          <option value="GBP">GBP</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label className="myInputLabel">Price</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Start"
                            name="fullname"
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label className="myInputLabel">{"\u00A0"}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="End"
                            name="fullname"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-7">
                <div className="row">

                <div className="col-md-6" style={{display: 'flex', justifyContent: 'center'}}>
                  <div className="offerContainer">
                  <span>Posted By: <span className="postedBy">Vatsa Patel</span></span>
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0'}}>
                    <div className="offerDetails">
                      <span className="offerDetailTop">From:</span>
                      <span className="offerCountry">India</span>
                      <div>
                        <span className="offerCurrency">INR </span>
                        <span className="offerAmount">75,000</span>
                      </div>
                    </div>

                    <span className="arrowContainer">
                      <i className="arrowC la la-arrow-right" />
                    </span>

                    <div className="offerDetails">
                      <span className="offerDetailTop">To:</span>
                      <span className="offerCountry">United States</span>
                      <div>
                        <span className="offerCurrency">USD </span>
                        <span className="offerAmount">1,000</span>
                      </div>
                    </div>
                    </div>

                    <button class="customBtn">View More</button>

                  </div>
                  </div>

                  <div className="col-md-6" style={{display: 'flex', justifyContent: 'center'}}>
                  <div className="offerContainer">
                  <span>Posted By: <span className="postedBy">Vatsa Patel</span></span>
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0'}}>
                    <div className="offerDetails">
                      <span className="offerDetailTop">From:</span>
                      <span className="offerCountry">India</span>
                      <div>
                        <span className="offerCurrency">INR </span>
                        <span className="offerAmount">75,000</span>
                      </div>
                    </div>

                    <span className="arrowContainer">
                      <i className="arrowC la la-arrow-right" />
                    </span>

                    <div className="offerDetails">
                      <span className="offerDetailTop">To:</span>
                      <span className="offerCountry">United States</span>
                      <div>
                        <span className="offerCurrency">USD </span>
                        <span className="offerAmount">1,000</span>
                      </div>
                    </div>
                    </div>

                    <button class="customBtn">View More</button>

                  </div>
                  </div>

                  <div className="col-md-6" style={{display: 'flex', justifyContent: 'center'}}>
                  <div className="offerContainer">
                  <span>Posted By: <span className="postedBy">Vatsa Patel</span></span>
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0'}}>
                    <div className="offerDetails">
                      <span className="offerDetailTop">From:</span>
                      <span className="offerCountry">India</span>
                      <div>
                        <span className="offerCurrency">INR </span>
                        <span className="offerAmount">75,000</span>
                      </div>
                    </div>

                    <span className="arrowContainer">
                      <i className="arrowC la la-arrow-right" />
                    </span>

                    <div className="offerDetails">
                      <span className="offerDetailTop">To:</span>
                      <span className="offerCountry">United States</span>
                      <div>
                        <span className="offerCurrency">USD </span>
                        <span className="offerAmount">1,000</span>
                      </div>
                    </div>
                    </div>

                    <button class="customBtn">View More</button>

                  </div>
                  </div>

                  <div className="col-md-6" style={{display: 'flex', justifyContent: 'center'}}>
                  <div className="offerContainer">
                  <span>Posted By: <span className="postedBy">Vatsa Patel</span></span>
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0'}}>
                    <div className="offerDetails">
                      <span className="offerDetailTop">From:</span>
                      <span className="offerCountry">India</span>
                      <div>
                        <span className="offerCurrency">INR </span>
                        <span className="offerAmount">75,000</span>
                      </div>
                    </div>

                    <span className="arrowContainer">
                      <i className="arrowC la la-arrow-right" />
                    </span>

                    <div className="offerDetails">
                      <span className="offerDetailTop">To:</span>
                      <span className="offerCountry">United States</span>
                      <div>
                        <span className="offerCurrency">USD </span>
                        <span className="offerAmount">1,000</span>
                      </div>
                    </div>
                    </div>

                    <button class="customBtn">View More</button>

                  </div>
                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
