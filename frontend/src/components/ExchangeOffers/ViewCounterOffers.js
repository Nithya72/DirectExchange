import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import PostOffer from "./PostOffer";
import jwt_decode from "jwt-decode";
import Collapsible from "react-collapsible";

export class ViewCounterOffers extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      submitted: false,
      myCounterOffers: "",
      counterOfferForMe: "",
    };
  }

  componentDidMount() {
    // axios.defaults.withCredentials = true;

    axios.defaults.headers.common['authorization']= 'Bearer ' + localStorage.getItem('token');
    var decodedToken = jwt_decode(localStorage.getItem('token'));
    console.log("decodedUserId: ", decodedToken.sub);
    axios
        .get("http://localhost:8080/directexchange/user/counteroffer/"+decodedToken.sub)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("Fetched All Offers: ", response.data);
            this.setState({
              successFlag: true,
              myCounterOffers: response.data.myCounterOffers,
              counterOfferForMe: response.data.counterOfferForMe
            });
          }
        })
        .catch((error) => {
          console.log("Here we captured the error: ", error);
          this.setState({
            successFlag: false,
            myCounterOffers: null,
            counterOfferForMe: null
          });
        });
  }

  getAllOffers = (e) => {
    console.log("offer details: ", e);

    this.setState({
      offer: e,
      redirectToAcceptOffer: true,
    });
  };

  render() {
    console.log("msg from java controller: ", this.state.myOffers);
    var redirectVar = "";

    if (this.state.redirectToAcceptOffer) {
      redirectVar = (
          <Redirect
              to={{
                pathname: "/viewOfferMatches",
                state: { offer: this.state.offer },
              }}
          />
      );
    }

    return (
        <div>
          <Header/>
          <SideBar/>
          <div className="content-body">
            <div className="myContainer">
              <div className="col-xl-12">
                <div className="card" style={{width: "fit-content"}}>

                  <div className="card-header">
                    <h5 className="card-title" style={{fontSize: "28px"}}>My Counter Offers</h5>
                  </div>
                {/*  <div className="card-body pt-0">*/}
                {/*    <div className="transaction-table">*/}
                {/*      <div className="table-responsive">*/}
                {/*        <table*/}
                {/*            className="table mb-0 table-responsive-sm view-offer-table"*/}
                {/*            style={{color: "#5a656d"}}>*/}
                {/*          <thead>*/}
                {/*          <tr>*/}
                {/*            <th>*/}
                {/*              <div>USER</div>*/}
                {/*              <div>NAME</div>*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*              <div>SOURCE</div>*/}
                {/*              <div>CURRENCY</div>*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*              <div>REMIT</div>*/}
                {/*              <div>AMOUNT</div>*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*              <div>DEST</div>*/}
                {/*              <div>CURRENCY</div>*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*              <div>FINAL</div>*/}
                {/*              <div>AMOUNT</div>*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*              <div>EXPIRATION</div>*/}
                {/*              <div>DATE</div>*/}
                {/*            </th>*/}
                {/*            <th>*/}
                {/*              <div>OFFER</div>*/}
                {/*              <div>STATUS</div>*/}
                {/*            </th>*/}
                {/*          </tr>*/}
                {/*          </thead>*/}
                {/*          <tbody>*/}
                {/*          <tr>*/}
                {/*            <td>*/}
                {/*              {this.state.offer.user.nickName}*/}
                {/*            </td>*/}
                {/*            <td>*/}
                {/*              {this.state.offer.srcCurrency}*/}
                {/*            </td>*/}
                {/*            <td>*/}
                {/*              {this.state.offer.remitAmount}*/}
                {/*            </td>*/}
                {/*            <td>*/}
                {/*              {this.state.offer.destCurrency}*/}
                {/*            </td>*/}
                {/*            <td>*/}
                {/*              {this.state.offer.finalAmount}*/}
                {/*            </td>*/}
                {/*            <td>*/}
                {/*              {this.state.offer.expDate.substring(0, 10)}*/}
                {/*            </td>*/}
                {/*            <td>*/}
                {/*              { this.state.offer.status}*/}
                {/*            </td>*/}
                {/*          </tr>*/}
                {/*          </tbody>*/}
                {/*        </table>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*  <div className="card-header">*/}
                {/*    <h4 className="card-title" style={{fontSize: "28px"}}>View All Matching Offers</h4>*/}
                {/*  </div>*/}

                {/*  <Collapsible trigger="View Single Matches"*/}
                {/*               triggerClassName="view-collapsible-tab view-single-match-collapsible-tab"*/}
                {/*               triggerOpenedClassName="view-collapsible-tab view-single-match-collapsible-tab">*/}
                {/*    <div className="card-header">*/}
                {/*      <h4 className="card-title" style={{fontSize: "28px"}}>View All Matching Offers</h4>*/}
                {/*    </div>*/}
                {/*    <div className="card-body pt-0">*/}
                {/*      <div className="transaction-table">*/}
                {/*        <div className="table-responsive">*/}
                {/*          {(this.state.allSingleMatches && this.state.allSingleMatches.length !== 0) ?*/}

                {/*              this.state.allSingleMatches.map(offer => (*/}
                {/*                  <div>*/}
                {/*                    <table*/}
                {/*                        className="table mb-0 table-responsive-sm view-offer-table"*/}
                {/*                        style={{color: "#5a656d"}}>*/}
                {/*                      <thead>*/}
                {/*                      <tr>*/}
                {/*                        <th>*/}
                {/*                          <div>USER</div>*/}
                {/*                          <div>NAME</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>AMOUNT</div>*/}
                {/*                          <div>DIFFERENCE</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>SOURCE</div>*/}
                {/*                          <div>CURRENCY</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>REMIT</div>*/}
                {/*                          <div>AMOUNT</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>DEST</div>*/}
                {/*                          <div>CURRENCY</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>FINAL</div>*/}
                {/*                          <div>AMOUNT</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>EXPIRATION</div>*/}
                {/*                          <div>DATE</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>OFFER</div>*/}
                {/*                          <div>STATUS</div>*/}
                {/*                        </th>*/}
                {/*                      </tr>*/}
                {/*                      </thead>*/}
                {/*                      <tbody>*/}
                {/*                      <tr>*/}
                {/*                        <td>*/}
                {/*                          {offer.user.nickName}*/}
                {/*                        </td>*/}
                {/*                        {(parseInt(offer.remitAmount) - parseInt(this.state.offer.finalAmount)) >= 0 ?*/}
                {/*                            <td className="text-success">+{(offer.remitAmount - this.state.offer.finalAmount)} {offer.srcCurrency}</td> :*/}
                {/*                            <td className="text-danger">{(offer.remitAmount - this.state.offer.finalAmount)} {offer.srcCurrency}</td>}*/}
                {/*                        <td>*/}
                {/*                          {offer.srcCurrency}*/}
                {/*                        </td>*/}
                {/*                        <td>*/}
                {/*                          {offer.remitAmount}*/}
                {/*                        </td>*/}
                {/*                        <td>*/}
                {/*                          {offer.destCurrency}*/}
                {/*                        </td>*/}

                {/*                        <td>*/}
                {/*                          {offer.finalAmount}*/}
                {/*                        </td>*/}

                {/*                        <td>*/}
                {/*                          {offer.expDate.substring(0, 10)}*/}
                {/*                        </td>*/}
                {/*                        <td>*/}
                {/*                          { offer.status}*/}
                {/*                        </td>*/}
                {/*                      </tr>*/}
                {/*                      </tbody>*/}
                {/*                    </table>*/}
                {/*                    <div className="buy-sell-widget">*/}
                {/*                      <ul className="nav nav-tabs">*/}
                {/*                        <button className="counter-offer-button"*/}
                {/*                                data-toggle="modal"*/}
                {/*                                data-target="#newOfferModalPopup">*/}
                {/*                          Accept*/}
                {/*                        </button>*/}
                {/*                        {(offer.counterOfferFlag.toString() === "true" ?*/}
                {/*                            <div>*/}
                {/*                              <button className="counter-offer-button"*/}
                {/*                                      data-toggle="modal"*/}
                {/*                                      data-target="#newOfferModalPopup">*/}
                {/*                                Counter*/}
                {/*                              </button>*/}
                {/*                              <div*/}
                {/*                                  className="modal fade"*/}
                {/*                                  id="newOfferModalPopup"*/}
                {/*                                  role="dialog"*/}
                {/*                                  aria-labelledby="exampleModalCenterTitle"*/}
                {/*                                  aria-hidden="true"*/}
                {/*                              >*/}
                {/*                                <div*/}
                {/*                                    className="modal-dialog modal-dialog-centered"*/}
                {/*                                    role="document">*/}
                {/*                                  <div*/}
                {/*                                      className="modal-content"*/}
                {/*                                      style={{*/}
                {/*                                        width: "1000px",*/}
                {/*                                        background: "#eff2f7"*/}
                {/*                                      }}*/}
                {/*                                  >*/}
                {/*                                    <div className="modal-body"*/}
                {/*                                         style={{padding: "0px"}}>*/}
                {/*                                      <button*/}
                {/*                                          type="button"*/}
                {/*                                          className="close"*/}
                {/*                                          data-dismiss="modal"*/}
                {/*                                          aria-label="Close"*/}
                {/*                                          style={{padding: "10px"}}*/}
                {/*                                      >*/}
                {/*                                        <span aria-hidden="true">&times;</span>*/}
                {/*                                      </button>*/}
                {/*                                      /!*<form>*!/*/}
                {/*                                      <div*/}
                {/*                                          className="counter-offer-details">*/}
                {/*                                        <br/>*/}
                {/*                                        <h4 className="main-title">Counter*/}
                {/*                                          Offer*/}
                {/*                                          Details</h4>*/}

                {/*                                        <div*/}
                {/*                                            className="form-group">*/}
                {/*                                          <br/>*/}
                {/*                                          <div>Please enter your counter offer below*/}
                {/*                                          </div>*/}
                {/*                                          <br/>*/}
                {/*                                          <div>Note: The counter offer must be within the range of 90%*/}
                {/*                                            to 110% of source remit amount*/}
                {/*                                          </div>*/}
                {/*                                          <br />*/}
                {/*                                          <div> eg: {(parseInt(this.state.offer.remitAmount) * 0.9)} to {(parseInt(this.state.offer.remitAmount) * 1.1)}*/}
                {/*                                          </div>*/}
                {/*                                          <br/>*/}
                {/*                                          <input*/}
                {/*                                              type="number"*/}
                {/*                                              className="form-control"*/}
                {/*                                              placeholder="Counter Offer Amount"*/}
                {/*                                              name="amount"*/}
                {/*                                              // value={this.state.amount}*/}
                {/*                                              onChange={this.counterOfferAmountHandler}*/}
                {/*                                              required*/}
                {/*                                          />*/}
                {/*                                          <button*/}
                {/*                                              type="submit"*/}
                {/*                                              className="post-counter-offer-custom-button"*/}
                {/*                                              onClick={ (e) => this.postSingleCounterHandler(e, offer)}*/}
                {/*                                          >*/}
                {/*                                            POST COUNTER*/}
                {/*                                            OFFER*/}
                {/*                                          </button><br /><br/>*/}
                {/*                                          <div style={{color:"red"}}>{this.state.counter_error}</div>*/}
                {/*                                          { this.state.postCounterOfferFlag ? <div style={{color:"green"}}>{this.state.postCounterMsg}</div> : <div style={{color:"red"}}>{this.state.postCounterMsg}</div> }*/}
                {/*                                        </div>*/}

                {/*                                      </div>*/}
                {/*                                      /!*</form>*!/*/}
                {/*                                    </div>*/}
                {/*                                  </div>*/}
                {/*                                </div>*/}
                {/*                              </div>*/}
                {/*                            </div>*/}
                {/*                            : "")}*/}
                {/*                      </ul>*/}
                {/*                    </div>*/}
                {/*                  </div>*/}
                {/*              )) : <div> No matches yet!</div>}*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}

                {/*  </Collapsible>*/}
                {/*  <Collapsible trigger="View Split Matches"*/}
                {/*               triggerClassName="view-collapsible-tab view-split-match-collapsible-tab"*/}
                {/*               triggerOpenedClassName="view-collapsible-tab view-split-match-collapsible-tab">*/}


                {/*    <div className="card-body pt-0">*/}
                {/*      <div className="transaction-table">*/}
                {/*        <div className="table-responsive">*/}

                {/*          {(this.state.allSplitMatches && this.state.allSplitMatches.length !== 0) ?*/}

                {/*              this.state.allSplitMatches.map(offer => (*/}
                {/*                  <div>*/}
                {/*                    <table*/}
                {/*                        className="table mb-0 table-responsive-sm view-offer-table"*/}
                {/*                        style={{color: "#5a656d"}}>*/}
                {/*                      <thead>*/}
                {/*                      <tr>*/}
                {/*                        <th>*/}
                {/*                          <div>USER</div>*/}
                {/*                          <div>NAME</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>AMOUNT</div>*/}
                {/*                          <div>DIFFERENCE</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>SOURCE</div>*/}
                {/*                          <div>CURRENCY</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>REMIT</div>*/}
                {/*                          <div>AMOUNT</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>DEST</div>*/}
                {/*                          <div>CURRENCY</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>FINAL</div>*/}
                {/*                          <div>AMOUNT</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>EXPIRATION</div>*/}
                {/*                          <div>DATE</div>*/}
                {/*                        </th>*/}
                {/*                        <th>*/}
                {/*                          <div>OFFER</div>*/}
                {/*                          <div>STATUS</div>*/}
                {/*                        </th>*/}
                {/*                      </tr>*/}
                {/*                      </thead>*/}
                {/*                      <tbody>*/}
                {/*                      <tr>*/}
                {/*                        <td>*/}
                {/*                          {offer[0].user.nickName}*/}
                {/*                        </td>*/}
                {/*                        {(parseInt(offer[0].remitAmount) - parseInt(this.state.offer.finalAmount)) >= 0 ?*/}
                {/*                            <td className="text-success">+{(offer[0].remitAmount - this.state.offer.finalAmount)} {offer[0].srcCurrency}</td> :*/}
                {/*                            <td className="text-danger">{(offer[0].remitAmount - this.state.offer.finalAmount)} {offer[0].srcCurrency}</td>}*/}

                {/*                        <td>*/}
                {/*                          {offer[0].srcCurrency}*/}
                {/*                        </td>*/}
                {/*                        <td>*/}
                {/*                          {offer[0].remitAmount}*/}
                {/*                        </td>*/}

                {/*                        <td>*/}
                {/*                          {offer[0].destCurrency}*/}
                {/*                        </td>*/}

                {/*                        <td>*/}
                {/*                          {offer[0].finalAmount}*/}
                {/*                        </td>*/}

                {/*                        <td>*/}
                {/*                          {offer[0].expDate.substring(0, 10)}*/}
                {/*                        </td>*/}
                {/*                        <td>*/}
                {/*                          {offer[0].status}*/}
                {/*                        </td>*/}
                {/*                      </tr>*/}

                {/*                      <tr>*/}
                {/*                        <td>*/}
                {/*                          {offer[1].user.nickName}*/}
                {/*                        </td>*/}
                {/*                        {(parseInt(offer[1].remitAmount) - parseInt(this.state.offer.finalAmount)) >= 0 ?*/}
                {/*                            <td className="text-success">+{(offer[1].remitAmount - this.state.offer.finalAmount)} {offer[1].srcCurrency}</td> :*/}
                {/*                            <td className="text-danger">{(offer[1].remitAmount - this.state.offer.finalAmount)} {offer[1].srcCurrency}</td>}*/}

                {/*                        <td>*/}
                {/*                          {offer[1].srcCurrency}*/}
                {/*                        </td>*/}
                {/*                        <td>*/}
                {/*                          {offer[1].remitAmount}*/}
                {/*                        </td>*/}

                {/*                        <td>*/}
                {/*                          {offer[1].destCurrency}*/}
                {/*                        </td>*/}

                {/*                        <td>*/}
                {/*                          {offer[1].finalAmount}*/}
                {/*                        </td>*/}

                {/*                        <td>*/}
                {/*                          {offer[1].expDate.substring(0, 10)}*/}
                {/*                        </td>*/}
                {/*                        <td>*/}
                {/*                          {offer[1].status}*/}
                {/*                        </td>*/}
                {/*                      </tr>*/}
                {/*                      </tbody>*/}
                {/*                    </table>*/}
                {/*                    <div className="buy-sell-widget">*/}
                {/*                      <ul className="nav nav-tabs">*/}
                {/*                        <button className="counter-offer-button"*/}
                {/*                                data-toggle="modal"*/}
                {/*                                data-target="#newOfferModalPopup">*/}
                {/*                          Accept*/}
                {/*                        </button>*/}


                {/*                        {(offer[0].counterOfferFlag.toString() === "true" ?*/}
                {/*                            <div>*/}
                {/*                              <button className="counter-offer-button"*/}
                {/*                                      data-toggle="modal"*/}
                {/*                                      data-target="#newOfferModalPopup">*/}
                {/*                                Counter*/}
                {/*                              </button>*/}
                {/*                              <div*/}
                {/*                                  className="modal fade"*/}
                {/*                                  id="newOfferModalPopup"*/}
                {/*                                  role="dialog"*/}
                {/*                                  aria-labelledby="exampleModalCenterTitle"*/}
                {/*                                  aria-hidden="true"*/}
                {/*                              >*/}
                {/*                                <div*/}
                {/*                                    className="modal-dialog modal-dialog-centered"*/}
                {/*                                    role="document">*/}
                {/*                                  <div*/}
                {/*                                      className="modal-content"*/}
                {/*                                      style={{*/}
                {/*                                        width: "1000px",*/}
                {/*                                        background: "#eff2f7"*/}
                {/*                                      }}*/}
                {/*                                  >*/}
                {/*                                    <div className="modal-body"*/}
                {/*                                         style={{padding: "0px"}}>*/}
                {/*                                      <button*/}
                {/*                                          type="button"*/}
                {/*                                          className="close"*/}
                {/*                                          data-dismiss="modal"*/}
                {/*                                          aria-label="Close"*/}
                {/*                                          style={{padding: "10px"}}*/}
                {/*                                      >*/}
                {/*                                        <span aria-hidden="true">&times;</span>*/}
                {/*                                      </button>*/}
                {/*                                      <form*/}
                {/*                                          onSubmit={this.onSubmit}>*/}
                {/*                                        <div*/}
                {/*                                            className="counter-offer-details">*/}
                {/*                                          <br/>*/}
                {/*                                          <h4 className="main-title">Counter*/}
                {/*                                            Offer*/}
                {/*                                            Details</h4>*/}

                {/*                                          <div*/}
                {/*                                              className="form-group">*/}
                {/*                                            <br/>*/}
                {/*                                            <div>Please enter your counter offer below*/}
                {/*                                            </div>*/}
                {/*                                            <br/>*/}
                {/*                                            <div>Note: The counter offer must be within the range of 90%*/}
                {/*                                              to 110% of source remit amount*/}
                {/*                                            </div>*/}
                {/*                                            <br/>*/}
                {/*                                            <input*/}
                {/*                                                type="number"*/}
                {/*                                                min={(parseInt(this.state.offer.remitAmount) * 0.9)}*/}
                {/*                                                max={(parseInt(this.state.offer.remitAmount) * 1.1)}*/}
                {/*                                                className="form-control"*/}
                {/*                                                placeholder="Counter Offer Amount"*/}
                {/*                                                name="amount"*/}
                {/*                                                // value={this.state.single_count_offer_amount}*/}
                {/*                                                onChange={this.counterOfferAmountHandler}*/}
                {/*                                                required*/}
                {/*                                            />*/}
                {/*                                            <button*/}
                {/*                                                type="submit"*/}
                {/*                                                className="post-counter-offer-custom-button">*/}
                {/*                                              POST COUNTER*/}
                {/*                                              OFFER*/}
                {/*                                            </button>*/}
                {/*                                          </div>*/}
                {/*                                        </div>*/}
                {/*                                      </form>*/}
                {/*                                    </div>*/}
                {/*                                  </div>*/}
                {/*                                </div>*/}
                {/*                              </div>*/}
                {/*                            </div>*/}
                {/*                            : "")}*/}
                {/*                      </ul>*/}
                {/*                    </div>*/}
                {/*                  </div>*/}
                {/*              )) : <div> No matches yet!</div>}*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </Collapsible>*/}

                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ViewCounterOffers;
