import React, { Component } from "react";

import Header from "../../Navigation/Header";
import SideBar from "../../Navigation/SideBar";

import Automatch from "../../Automatch/automatch.js";
import OfferComponent from "./offerComponent";

var data = [
  {
      "offerId": 1,
      "srcCountry": "United States",
      "srcCurrency": "USD",
      "remitAmount": 1000,
      "destCountry": "India",
      "destCurrency": "INR",
      "exchangeRate": 74,
      "finalAmount": 74000,
      "expDate": "2020-12-31T00:00:00.000+00:00",
      "counterOfferFlag": true,
      "splitOfferFlag": true,
      "userId": 8
  },
  {
      "offerId": 3,
      "srcCountry": "United States",
      "srcCurrency": "USD",
      "remitAmount": 500,
      "destCountry": "India",
      "destCurrency": "INR",
      "exchangeRate": 74,
      "finalAmount": 37000,
      "expDate": "2020-12-31T00:00:00.000+00:00",
      "counterOfferFlag": true,
      "splitOfferFlag": true,
      "userId": 8
  },
  {
      "offerId": 16,
      "srcCountry": "United States",
      "srcCurrency": "USD",
      "remitAmount": 1014,
      "destCountry": "India",
      "destCurrency": "INR",
      "exchangeRate": 74,
      "finalAmount": 75000,
      "expDate": "2020-12-14T00:00:00.000+00:00",
      "counterOfferFlag": true,
      "splitOfferFlag": true,
      "userId": 8
  },
  {
      "offerId": 4,
      "srcCountry": "United States",
      "srcCurrency": "USD",
      "remitAmount": 1000,
      "destCountry": "India",
      "destCurrency": "INR",
      "exchangeRate": 74,
      "finalAmount": 74000,
      "expDate": "2020-11-30T00:00:00.000+00:00",
      "counterOfferFlag": true,
      "splitOfferFlag": false,
      "userId": 8
  },
  {
      "offerId": 2,
      "srcCountry": "United States",
      "srcCurrency": "USD",
      "remitAmount": 1000,
      "destCountry": "India",
      "destCurrency": "INR",
      "exchangeRate": 74,
      "finalAmount": 74000,
      "expDate": "2020-10-31T00:00:00.000+00:00",
      "counterOfferFlag": true,
      "splitOfferFlag": true,
      "userId": 8
  }
];
export default class Home extends Component {
  
  constructor(){
		super();

		this.state={
      srcCountry:null,
      srcCurrency: null,
      srcPriceStart:null,
      srcPriceEnd:null,
      destCountry:null,
      destCurrency:null,
      destPriceStart:null,
      destPriceEnd:null,
		};
  }

  filterUpdate=(event,type)=>{
    let keyword = event.target.value;
    if(keyword === "" || keyword === "true") keyword = null;
		this.setState({[type]: keyword})
	}
  
  render() {
		const items = data.filter((offerObj)=>{
      if(this.state.srcCountry == null) return offerObj
      else if(offerObj.srcCountry.includes(this.state.srcCountry)) return offerObj
    }).filter((offerObj)=>{
      if(this.state.srcCurrency == null) return offerObj
      else if(offerObj.srcCurrency.includes(this.state.srcCurrency)) return offerObj
    }).filter((offerObj)=>{
      if(this.state.srcPriceStart == null) return offerObj
      else if(offerObj.remitAmount>=(this.state.srcPriceStart)) return offerObj
    }).filter((offerObj)=>{
      if(this.state.srcPriceEnd == null) return offerObj
      else if(offerObj.remitAmount<=(this.state.srcPriceEnd)) return offerObj
    }).filter((offerObj)=>{
      if(this.state.destCountry == null) return offerObj
      else if(offerObj.destCountry.includes(this.state.destCountry)) return offerObj
    }).filter((offerObj)=>{
      if(this.state.destCurrency == null) return offerObj
      else if(offerObj.destCurrency.includes(this.state.destCurrency)) return offerObj
    }).filter((offerObj)=>{
      if(this.state.destCurrency == null) return offerObj
      else if(offerObj.destCurrency.includes(this.state.destCurrency)) return offerObj
    }).filter((offerObj)=>{
      if(this.state.destPriceStart == null) return offerObj
      else if(offerObj.finalAmount>=(this.state.destPriceStart)) return offerObj
    }).filter((offerObj)=>{
      if(this.state.destPriceEnd == null) return offerObj
      else if(offerObj.finalAmount<=(this.state.destPriceEnd)) return offerObj
    }).map(offerObj=>{
      return(
				<OfferComponent
          postedBy={offerObj.postedBy}
          srcCountry={offerObj.srcCountry}
          srcCurrency={offerObj.srcCurrency}
          remitAmount={offerObj.remitAmount}
          destCurrency={offerObj.destCurrency}
          destCountry={offerObj.destCountry}
          finalAmount={offerObj.finalAmount}
        />
      )
    })
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

                        <select className="form-control" onChange={(e)=>this.filterUpdate(e,"srcCountry")}>
                          <option value>Select</option>
                          <option value="India">India</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                        </select>
                      </div>

                      <div className="myFormGroup form-group">
                        <label className="myInputLabel">Source Currency</label>
                        <select className="form-control" onChange={(e)=>this.filterUpdate(e,"srcCurrency")}>
                          <option value>Select</option>
                          <option value="INR">INR</option>
                          <option value="GBP">GBP</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label className="myInputLabel">Remit</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Start"
                            onChange={(e)=>this.filterUpdate(e,"srcPriceStart")}
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label className="myInputLabel">{"\u00A0"}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="End"
                            onChange={(e)=>this.filterUpdate(e,"srcPriceEnd")}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                      <div className="myFormGroup form-group">
                        <label className="myInputLabel">Target Country</label>
                        <select className="form-control" onChange={(e)=>this.filterUpdate(e,"destCountry")}>
                          <option value>Select</option>
                          <option value="India">India</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                        </select>
                      </div>

                      <div className="myFormGroup form-group">
                        <label className="myInputLabel">Target Currency</label>
                        <select className="form-control" onChange={(e)=>this.filterUpdate(e,"destCurrency")}>
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
                            onChange={(e)=>this.filterUpdate(e,"destPriceStart")}
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <label className="myInputLabel">{"\u00A0"}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="End"
                            onChange={(e)=>this.filterUpdate(e,"destPriceEnd")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-9" style={{maxWidth: '900px'}}>
                <div className="row">
                  {/* <OfferComponent
                    postedBy="Vatsa Patel"
                    srcCountry="India"
                    srcCurrency="INR"
                    remitAmount="75,000"
                    destCurrency="USD"
                    destCountry="United States"
                    finalAmount="1000"
                  /> */}

                  {items}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
