import React, {Component} from 'react';
import '../../styles/css/style.css';
import axios from 'axios';
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import Collapsible from 'react-collapsible';
import jwt_decode from "jwt-decode";
import {Redirect} from "react-router";

export class ViewOfferMatches extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      offer: this.props.location.state.offer,
      submitted: false,
      allSingleMatches: null,
      allSplitMatches: null,
      single_count_offer_amount: 0,
      split_count_offer_amount: 0,
      counter_error: null,
      postCounterOfferFlag: false,
      postCounterMsg: "",
      transactionFlag: null,
      transactionMsg: ""
    }
     this.counterOfferAmountHandler = this.counterOfferAmountHandler.bind(this);
    // this.postSingleCounterHandler = this.postSingleCounterHandler.bind(this);

  }

  componentDidMount() {
    this.getSingleMatches(this.state.offer);
  }

  counterOfferAmountHandler = (e) =>{
    // e.preventDefault();
  console.log("remit value 0.9: ", this.state.offer.remitAmount*0.9, "---", this.state.offer.remitAmount*1.1);
    console.log("offer amount: ", e.target.value);

   if(e.target.value >= (this.state.offer.remitAmount*0.9) && e.target.value <= (this.state.offer.remitAmount*1.1)){
        this.setState({
          single_count_offer_amount: e.target.value,
          counter_error: null
        })
   }else{
     this.setState({
       counter_error: "The amount "+e.target.value+" is not within valid range."
     })
   }
  }

  acceptSplitOfferHandler(e, offer1, offer2){
    e.preventDefault();

    axios.defaults.headers.common["authorization"] =
        "Bearer " + localStorage.getItem("token");
    var decodedToken = jwt_decode(localStorage.getItem("token"));

    var data = {
      source_offer: this.state.offer.offerId,
      offers_matched1: offer1,
      offers_matched2: offer2,
      source_offer_amount: this.state.offer.remitAmount
    }

    axios.post('http://localhost:8080/directexchange/api/transactions/' + decodedToken.sub, data)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("Posted Counter Offers: ", response.data);
            this.setState({
              transactionFlag: true,
            })
          }else{
            this.setState({
              transactionFlag: false,
              transactionMsg: response.data
            })
          }
        })
        .catch(error => {
          console.log("Here we captured the error: ", error)
          this.setState({
            transactionFlag: false,
          })
        });

  }



  acceptSingleOfferHandler(e, offer, offerType){

    e.preventDefault();
    console.log("offer: accept offer: ", offer);

    axios.defaults.headers.common["authorization"] =
        "Bearer " + localStorage.getItem("token");
    var decodedToken = jwt_decode(localStorage.getItem("token"));

    var data = "";

    if(offerType === "accept") {

      data = {
        source_offer: this.state.offer.offerId,
        offers_matched1: offer,
        source_offer_amount: this.state.offer.remitAmount
      }

      console.log("accept - final data: ", data);
    }
    else if(offerType === "accept-match"){

      data = {
        source_offer: this.state.offer.offerId,
        offers_matched1: offer,
        source_offer_amount: offer.finalAmount
      }

      console.log("accept-match - final data: ", data);
    }

   axios.post('http://localhost:8080/directexchange/api/transactions/' + decodedToken.sub, data)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("Posted Counter Offers: ", response.data);
            this.setState({
              transactionFlag: true,
            })
          }else{
            this.setState({
              transactionFlag: false,
              transactionMsg: response.data
            })
          }
        })
        .catch(error => {
          console.log("Here we captured the error: ", error)
          this.setState({
            transactionFlag: false,
          })
        });

  }


  getSingleMatches = (e) => {
    console.log("Inside get single matches: ", e);

    let userId = e.user.userId;
    let remitAmount = e.finalAmount;
    let srcCurrency = e.destCurrency;
    let destCurrency = e.srcCurrency;

    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
    var decodedToken = jwt_decode(localStorage.getItem('token'));
    console.log("decodedUserId: ", decodedToken.sub);

    axios.get('http://localhost:8080/directexchange/user/allmatches/' + userId + "/" + remitAmount + "/" + srcCurrency + "/" +destCurrency)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("Posted Counter Offers: ", response.data);
            this.setState({
              successFlag: true,
              allSingleMatches: response.data.singleMatches,
              allSplitMatches: response.data.splitMatches
            })
          }
        }) .catch(error => {
              console.log("Here we captured the error: ", error)
              this.setState({
                successFlag: false,
                allSingleMatches: null,
                allSplitMatches: null
              })
            });

  }
  postSingleCounterHandler = (e, offer) => {
    e.preventDefault();

    console.log("postSingleCounterHandler: offer", offer);
    console.log("postSingleCounterHandler: receiver", e);
    console.log("postSingleCounterHandler: sender", this.state.offer);
    console.log("postSingleCounterHandler: offer amount", this.state.single_count_offer_amount);

    var data = {
      senderOffer: this.state.offer,
      receiverOffer: offer,
      counter_offer_amount: this.state.single_count_offer_amount
    }

    axios.defaults.headers.common['authorization']= 'Bearer ' + localStorage.getItem('token');
    var decodedToken = jwt_decode(localStorage.getItem('token'));
    console.log("decodedUserId: ", decodedToken.sub);

    axios.post('http://localhost:8080/directexchange/user/counteroffer', data)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("Fetched All Offers: ", response.data);
            this.setState({
              postCounterOfferFlag: true,
              postCounterMsg: response.data
            })
          }
        })
        .catch(error => {
          console.log("Here we captured the error: ", error)
          this.setState({
            postCounterOfferFlag: false,
            postCounterMsg: "Couldn't post offer, try after sometime."
          })
        });
  }


  render() {

    // console.log("state data view all offers: ", this.state);
    var redirectVar = "";
    var errorMsg = "";
    if(this.state.transactionFlag){
      redirectVar = <Redirect to={{ pathname: "/transact"}} />
    }

    if(this.state.transactionFlag == false){
      errorMsg = <div style={{color:"red"}}>Transaction could not be completed. Please Try after sometime</div>
    }



    return (
        <div>
          {redirectVar}
          <Header/>
          <SideBar/>
          <div className="content-body">
            <div className="myContainer">
              <div className="col-xl-12">
                <div className="card" style={{width: "fit-content"}}>

                  <div className="card-header">
                    <h5 className="card-title" style={{fontSize: "28px"}}>My Original Offer</h5>
                  </div>
                  <div className="card-body pt-0">
                    <div className="transaction-table">
                      <div className="table-responsive">
                  <table
                      className="table mb-0 table-responsive-sm view-offer-table"
                      style={{color: "#5a656d"}}>
                    <thead>
                      <tr>
                        <th>
                          <div>USER</div>
                          <div>NAME</div>
                        </th>
                        <th>
                          <div>SOURCE</div>
                          <div>OFFER</div>
                        </th>
                        <th>
                          <div>AMOUNT</div>
                          <div>TO SEND</div>
                        </th>
                        <th>
                          <div>EXPIRATION</div>
                          <div>DATE</div>
                        </th>
                        <th>
                          <div>OFFER</div>
                          <div>STATUS</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {this.state.offer.user.nickName}
                        </td>
                        <td>
                          {this.state.offer.srcCurrency} {this.state.offer.remitAmount}
                        </td>
                        <td>
                          {this.state.offer.destCurrency} {this.state.offer.finalAmount}
                        </td>
                        <td>
                          {this.state.offer.expDate.substring(0, 10)}
                        </td>
                        <td>
                          { this.state.offer.status}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                    <br/>
                        {errorMsg}
                      </div>
                    </div>
                  </div>
                  <div className="card-header">
                    <h4 className="card-title" style={{fontSize: "28px"}}>View All Matching Offers</h4>
                  </div>

                  <Collapsible trigger="View Single Matches"
                               triggerClassName="view-collapsible-tab view-single-match-collapsible-tab"
                               triggerOpenedClassName="view-collapsible-tab view-single-match-collapsible-tab">

                    <div className="card-body pt-0">
                      <div className="transaction-table">
                        <div className="table-responsive">
                          {(this.state.allSingleMatches && this.state.allSingleMatches.length !== 0) ?

                              this.state.allSingleMatches.map(offer => (
                                  <div>
                                    <table
                                        className="table mb-0 table-responsive-sm view-offer-table"
                                        style={{color: "#5a656d"}}>
                                      <thead>
                                        <tr>
                                          <th>
                                            <div>USER NAME</div>
                                          </th>
                                          <th>
                                            <div>AMOUNT</div>
                                            <div>DIFFERENCE</div>
                                          </th>
                                          <th>
                                            <div>SOURCE</div>
                                            <div>OFFER</div>
                                          </th>
                                          <th>
                                            <div>AMOUNT</div>
                                            <div>TO SEND</div>
                                          </th>
                                          <th>
                                            <div>EXPIRATION</div>
                                            <div>DATE</div>
                                          </th>
                                          <th>
                                            <div>OFFER</div>
                                            <div>STATUS</div>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>
                                          {offer.user.nickName}
                                        </td>
                                        {(parseInt(offer.remitAmount) - parseInt(this.state.offer.finalAmount)) >= 0 ?
                                            <td className="text-success">+{(offer.remitAmount - this.state.offer.finalAmount)} {offer.srcCurrency}</td> :
                                            <td className="text-danger">{(offer.remitAmount - this.state.offer.finalAmount)} {offer.srcCurrency}</td>}
                                        <td>
                                          {offer.srcCurrency} {offer.remitAmount}
                                        </td>
                                        <td>
                                          {offer.destCurrency} {offer.finalAmount}
                                        </td>
                                        <td>
                                          {offer.expDate.substring(0, 10)}
                                        </td>
                                        <td>
                                          { offer.status}
                                        </td>
                                      </tr>
                                      </tbody>
                                    </table>
                                    <div className="buy-sell-widget">
                                      <ul className="nav nav-tabs">


                                        { (parseInt(offer.remitAmount) - parseInt(this.state.offer.finalAmount) == 0) ?
                                        <button className="counter-offer-button"
                                                data-toggle="modal"
                                                // data-target="#acceptOfferModalPopup"
                                                onClick={(e) => this.acceptSingleOfferHandler(e, offer, "accept")}

                                        >
                                          Accept
                                        </button>

                                        :
                                            <button className="counter-offer-button"
                                                    data-toggle="modal"
                                                    data-target="#acceptOfferModalPopup"
                                                    // onClick={(e) => this.acceptSingleOfferHandler(e, offer, "accept")}

                                            >
                                              Accept
                                            </button> }



                                        {(offer.counterOfferFlag.toString() === "true" ?
                                            <div>
                                              <button className="counter-offer-button"
                                                      data-toggle="modal"
                                                      data-target="#newOfferModalPopup"
                                              >
                                                Counter
                                              </button>




                                              <div
                                                  className="modal fade"
                                                  id="acceptOfferModalPopup"
                                                  role="dialog"
                                                  aria-labelledby="exampleModalCenterTitle"
                                                  aria-hidden="true"
                                              >
                                                <div
                                                    className="modal-dialog modal-dialog-centered"
                                                    role="document">
                                                  <div
                                                      className="modal-content"
                                                      style={{
                                                        width: "1000px",
                                                        background: "#eff2f7"
                                                      }}
                                                  >
                                                    <div className="modal-body"
                                                         style={{padding: "0px"}}>
                                                      <button
                                                          type="button"
                                                          className="close"
                                                          data-dismiss="modal"
                                                          aria-label="Close"
                                                          style={{padding: "10px"}}
                                                      >
                                                        <span aria-hidden="true">&times;</span>
                                                      </button>
                                                      {/*<form>*/}
                                                      <div
                                                          className="counter-offer-details">
                                                        <br/>
                                                        <h4 className="main-title">Counter
                                                          Offer
                                                          Details</h4>

                                                        <div
                                                            className="form-group">
                                                          <br/>
                                                          <div>Please note: There is a difference between your initial offer and the amount to be sent.
                                                          <br/>
                                                            <br/>
                                                            <div>  Accept below to match the offer or Post a counter offer </div>

                                                          </div>
                                                          <br />

                                                          <br/>

                                                          <button
                                                              type="submit"
                                                              className="post-counter-offer-custom-button"
                                                              onClick={(e) => this.acceptSingleOfferHandler(e, offer, "accept-match")}
                                                          >
                                                            ACCEPT OFFER
                                                          </button><br /><br/>

                                                          <div style={{color:"red"}}>{this.state.counter_error}</div>
                                                          { this.state.postCounterOfferFlag ? <div style={{color:"green"}}>{this.state.postCounterMsg}</div> : <div style={{color:"red"}}>{this.state.postCounterMsg}</div> }
                                                        </div>

                                                      </div>
                                                      {/*</form>*/}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>













                                              <div
                                                  className="modal fade"
                                                  id="newOfferModalPopup"
                                                  role="dialog"
                                                  aria-labelledby="exampleModalCenterTitle"
                                                  aria-hidden="true"
                                              >
                                                <div
                                                    className="modal-dialog modal-dialog-centered"
                                                    role="document">
                                                  <div
                                                      className="modal-content"
                                                      style={{
                                                        width: "1000px",
                                                        background: "#eff2f7"
                                                      }}
                                                  >
                                                    <div className="modal-body"
                                                         style={{padding: "0px"}}>
                                                      <button
                                                          type="button"
                                                          className="close"
                                                          data-dismiss="modal"
                                                          aria-label="Close"
                                                          style={{padding: "10px"}}
                                                      >
                                                        <span aria-hidden="true">&times;</span>
                                                      </button>
                                                      {/*<form>*/}
                                                        <div
                                                            className="counter-offer-details">
                                                          <br/>
                                                          <h4 className="main-title">Counter
                                                            Offer
                                                            Details</h4>
                                              
                                                          <div
                                                              className="form-group">
                                                            <br/>
                                                            <div>Please enter your counter offer below
                                                            </div>
                                                            <br/>
                                                            <div>Note: The counter offer must be within the range of 90%
                                                              to 110% of source remit amount
                                                            </div>
                                                            <br />
                                                            <div> eg: {(parseInt(this.state.offer.remitAmount) * 0.9)} to {(parseInt(this.state.offer.remitAmount) * 1.1)}
                                                            </div>
                                                            <br/>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                placeholder="Counter Offer Amount"
                                                                name="amount"
                                                                // value={this.state.amount}
                                                                onChange={this.counterOfferAmountHandler}
                                                                required
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="post-counter-offer-custom-button"
                                                                onClick={ (e) => this.postSingleCounterHandler(e, offer)}
                                                            >
                                                              POST COUNTER
                                                              OFFER
                                                            </button><br /><br/>
                                                            <div style={{color:"red"}}>{this.state.counter_error}</div>
                                                            { this.state.postCounterOfferFlag ? <div style={{color:"green"}}>{this.state.postCounterMsg}</div> : <div style={{color:"red"}}>{this.state.postCounterMsg}</div> }
                                                          </div>
                                              
                                                        </div>
                                                      {/*</form>*/}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            : "")}
                                      </ul>
                                    </div>
                                  </div>
                              )) : <div> No matches yet!</div>}
                        </div>
                      </div>
                    </div>

                  </Collapsible>

                  { this.state.offer.splitOfferFlag ?

                  <Collapsible trigger="View Split Matches"
                               triggerClassName="view-collapsible-tab view-split-match-collapsible-tab"
                               triggerOpenedClassName="view-collapsible-tab view-split-match-collapsible-tab">


                    <div className="card-body pt-0">
                      <div className="transaction-table">
                        <div className="table-responsive">

                          {(this.state.allSplitMatches && this.state.allSplitMatches.length !== 0) ?

                              this.state.allSplitMatches.map(offer => (
                                  <div>
                                    <table
                                        className="table mb-0 table-responsive-sm view-offer-table"
                                        style={{color: "#5a656d"}}>
                                      <thead>
                                        <tr>
                                          <th>
                                            <div>USER NAME</div>
                                          </th>
                                          <th>
                                            <div>TOTAL</div>
                                            <div>DIFFERENCE</div>
                                          </th>
                                          <th>
                                            <div>SOURCE</div>
                                            <div>OFFER</div>
                                          </th>
                                          <th>
                                            <div>AMOUNT</div>
                                            <div>TO SEND</div>
                                          </th>
                                          <th>
                                            <div>EXPIRATION</div>
                                            <div>DATE</div>
                                          </th>
                                          <th>
                                            <div>OFFER</div>
                                            <div>STATUS</div>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                        <td>
                                          {offer[0].user.nickName}
                                        </td>

                                        { (offer[0].remitAmount >= offer[1].remitAmount) ?

                                        (parseInt(offer[0].remitAmount + offer[1].remitAmount) - parseInt(this.state.offer.finalAmount)) >= 0 ?
                                            <td className="text-success">+{((offer[0].remitAmount + offer[1].remitAmount) - this.state.offer.finalAmount)} {offer[0].srcCurrency}</td> :
                                            <td className="text-danger">{((offer[0].remitAmount + offer[1].remitAmount) - this.state.offer.finalAmount)} {offer[0].srcCurrency}</td>
                                            : <td><div style={{color:"#f6f8fe"}}>  None </div></td>
                                        }

                                        <td>
                                          {offer[0].srcCurrency}  {offer[0].remitAmount}
                                        </td>

                                        <td>
                                          {offer[0].destCurrency} {offer[0].finalAmount}
                                        </td>

                                        <td>
                                          {offer[0].expDate.substring(0, 10)}
                                        </td>
                                        <td>
                                          {offer[0].status}
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>
                                          {offer[1].user.nickName}
                                        </td>

                                        { (offer[1].remitAmount > offer[0].remitAmount) ?

                                            (parseInt(offer[0].remitAmount + offer[1].remitAmount) - parseInt(this.state.offer.finalAmount)) >= 0 ?
                                                <td className="text-success">+{((offer[0].remitAmount + offer[1].remitAmount) - this.state.offer.finalAmount)} {offer[0].srcCurrency}</td> :
                                                <td className="text-danger">{((offer[0].remitAmount + offer[1].remitAmount) - this.state.offer.finalAmount)} {offer[0].srcCurrency}</td>
                                            : <td><div style={{color:"#f6f8fe"}}>  None </div></td>
                                        }

                                        <td>
                                          {offer[1].srcCurrency}  {offer[1].remitAmount}
                                        </td>
                                        <td>
                                          {offer[1].destCurrency}   {offer[1].finalAmount}
                                        </td>

                                        <td>
                                          {offer[1].expDate.substring(0, 10)}
                                        </td>
                                        <td>
                                          {offer[1].status}
                                        </td>
                                      </tr>
                                      </tbody>
                                    </table>
                                    <div className="buy-sell-widget">
                                      <ul className="nav nav-tabs">
                                        <button className="counter-offer-button"
                                                onClick={(e) => this.acceptSplitOfferHandler(e, offer[0], offer[1])}>
                                          Accept
                                        </button>

                                        {(offer[0].counterOfferFlag.toString() === "true" ?
                                            <div>
                                              <button className="counter-offer-button"
                                                      data-toggle="modal"
                                                      data-target="#newOfferModalPopup">
                                                Counter
                                              </button>
                                              <div
                                                  className="modal fade"
                                                  id="newOfferModalPopup"
                                                  role="dialog"
                                                  aria-labelledby="exampleModalCenterTitle"
                                                  aria-hidden="true"
                                              >
                                                <div
                                                    className="modal-dialog modal-dialog-centered"
                                                    role="document">
                                                  <div
                                                      className="modal-content"
                                                      style={{
                                                        width: "1000px",
                                                        background: "#eff2f7"
                                                      }}
                                                  >
                                                    <div className="modal-body"
                                                         style={{padding: "0px"}}>
                                                      <button
                                                          type="button"
                                                          className="close"
                                                          data-dismiss="modal"
                                                          aria-label="Close"
                                                          style={{padding: "10px"}}
                                                      >
                                                        <span aria-hidden="true">&times;</span>
                                                      </button>
                                                      <form
                                                          onSubmit={this.onSubmit}>
                                                        <div
                                                            className="counter-offer-details">
                                                          <br/>
                                                          <h4 className="main-title">Counter
                                                            Offer
                                                            Details</h4>

                                                          <div
                                                              className="form-group">
                                                            <br/>
                                                            <div>Please enter your counter offer below
                                                            </div>
                                                            <br/>
                                                            <div>Note: The counter offer must be within the range of 90%
                                                              to 110% of source remit amount
                                                            </div>
                                                            <br/>
                                                            <input
                                                                type="number"
                                                                min={(parseInt(this.state.offer.remitAmount) * 0.9)}
                                                                max={(parseInt(this.state.offer.remitAmount) * 1.1)}
                                                                className="form-control"
                                                                placeholder="Counter Offer Amount"
                                                                name="amount"
                                                                // value={this.state.single_count_offer_amount}
                                                                onChange={this.counterOfferAmountHandler}
                                                                required
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="post-counter-offer-custom-button">
                                                              POST COUNTER
                                                              OFFER
                                                            </button>
                                                          </div>
                                                        </div>
                                                      </form>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            : "")}
                                      </ul>
                                    </div>
                                  </div>
                              )) : <div> No matches yet!</div>}
                        </div>
                      </div>
                    </div>
                  </Collapsible>
                    : "" }
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default ViewOfferMatches;