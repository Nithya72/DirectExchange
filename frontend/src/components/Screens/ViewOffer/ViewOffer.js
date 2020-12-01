import React, {Component} from "react";
import {Link} from "react-router-dom";
import Header from "../../Navigation/Header";
import SideBar from "../../Navigation/SideBar";

export default class Home extends Component {
  render() {
    let OfferObj = this.props.location.state.offerObj;
    let nickName = this.props.location.state.nickName;
    let counterOfferAmount = this.props.location.state.counterOfferAmount;
    let senderOfferObj = this.props.location.state.senderOfferObj;

    console.log("counterOfferAmount: ", counterOfferAmount);
    return (
        <div>
          <Header/>
          <SideBar/>

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
                              <h5>Posted By</h5>
                              <h4>
                              <span class="userThumb">
                                <i class="mdi mdi-account"></i>
                              </span>
                                {nickName}
                              </h4>
                              <a href="#">hello@example.com</a>
                            </div>
                          </div>
                        </div>
                      </div>
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

                          {counterOfferAmount ?
                              <tr>
                                <td>Counter Offer Amount</td>
                                <td>
                                  {OfferObj.srcCurrency} {counterOfferAmount}
                                </td>
                              </tr> : ""}
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

                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Link
                            to={{
                              pathname: "/ViewOffer",
                              state: {offerObj: this.props.offerObj},
                            }}
                            className="btn btn-success myButton"
                            style={{marginRight: '50px'}}
                        >
                          Accept Offer
                        </Link>

                        {OfferObj.counterOfferFlag ? <Link
                            to={{
                              pathname: "/ViewOffer",
                              state: {offerObj: this.props.offerObj},
                            }}
                            className="btn btn-primary myButton"
                        >
                          Counter Offer
                        </Link> : ''}
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
