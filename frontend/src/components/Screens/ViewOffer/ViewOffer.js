import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import Header from "../../Navigation/Header";
import SideBar from "../../Navigation/SideBar";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      message: null,
      showMessage: false,
    };
  }

  sendMessage=()=>{
    const message = {
      message: this.state.message
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { message })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    let OfferObj = this.props.location.state.offerObj;
    let nickName = this.props.location.state.nickName;
    let counterOfferAmount = this.props.location.state.counterOfferAmount;
    let senderOfferObj = this.props.location.state.senderOfferObj;
    console.log(this.state);
    return (
      <div>
        <Header />
        <SideBar />

        <div className="content-body">
          <div className="myContainer">
            <span className="PageTitle">View Offer Details</span>

            <div
              className="col-md-10"
              style={{
                maxWidth: "800px",
                alignSelf: "center",
                marginTop: "30px",
              }}
            >
              <div className="card">
                <div className="card-body">
                  <div className="buyer-seller">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="buyer-info">
                        <div className="media">
                          <div className="media-body">
                            <h6>Posted By</h6>
                            <h4>
                              <span class="userThumb">
                                <i class="mdi mdi-account"></i>
                              </span>
                              {OfferObj.user.nickName}
                            </h4>
                          { !this.state.showMessage ?
                            <button
                              className="btn btn-primary myButton2"
                              style={{ height: "30px", marginLeft: "38px" }}
                              onClick={(e) =>
                                this.setState({ showMessage: true })
                              }
                            >
                              Message
                            </button> : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                    { this.state.showMessage ?
                      <div className="form-row" style={{justifyContent: 'flex-end'}}>
                        <div className="col-md-12">
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Enter Message"
                            onChange={(e) => this.setState({message: e.target.value})}
                          />
                        </div>
                        <button className="btn btn-primary myButton" onClick={(e) =>this.sendMessage()}>Send Message!</button>
                      </div>
                    : ''}
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <span>Source Country</span>
                            </td>
                            <td>
                              <span>{OfferObj.srcCountry}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>Remit Amount</td>
                            <td>
                              {OfferObj.srcCurrency} {OfferObj.remitAmount}
                            </td>
                          </tr>

                          {counterOfferAmount ? (
                            <tr>
                              <td>Counter Offer Amount</td>
                              <td>
                                {OfferObj.srcCurrency} {counterOfferAmount}
                              </td>
                            </tr>
                          ) : (
                            ""
                          )}
                          <tr>
                            <td>Exchange Rate</td>
                            <td>{OfferObj.exchangeRate}</td>
                          </tr>
                          <tr>
                            <td>Destination Country</td>
                            <td>{OfferObj.destCountry}</td>
                          </tr>
                          <tr>
                            <td>Final Exchanges Amount</td>
                            <td>
                              {OfferObj.destCurrency} {OfferObj.finalAmount}
                            </td>
                          </tr>
                          <tr>
                            <td>Expiry Date</td>
                            <td>{Date(OfferObj.expDate)}</td>
                          </tr>
                          <tr>
                            <td>Offer Split Allowed</td>
                            <td>{OfferObj.splitOfferFlag ? "Yes" : "No"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Link
                        to={{
                          pathname: "/ViewOffer",
                          state: { offerObj: this.props.offerObj },
                        }}
                        className="btn btn-success myButton"
                        style={{ marginRight: "50px" }}
                      >
                        Accept Offer{" "}
                      </Link>

                      {OfferObj.counterOfferFlag ? (
                        <Link
                          to={{
                            pathname: "/ViewOffer",
                            state: { offerObj: this.props.offerObj },
                          }}
                          className="btn btn-primary myButton"
                        >
                          Counter Offer
                        </Link>
                      ) : (
                        ""
                      )}
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
