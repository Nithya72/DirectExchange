import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import LandingPage from "../Landing/LandingPage";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";

export class ViewOfferMatches extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            offer: this.props.location.state.offer,
            submitted: false,
            allSingleMatches: null,
            allSplitMatches: ""
        }
        // this.getSingleMatches = this.getSingleMatches.bind(this);

    }

    componentDidMount() {
        this.getSingleMatches(this.state.offer);
    }

    getSingleMatches = (e) => {
        console.log("Inside get single matches");

        let userId = e.userId;
        let remitAmount = e.finalAmount;
        let srcCurrency = e.destCurrency;

        axios.get('http://localhost:8080/directexchange/user/singlematch/' + userId + "/" + remitAmount + "/" + srcCurrency)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Fetched All Offers: ", response.data);
                    this.setState({
                        successFlag: true,
                        allSingleMatches: response.data
                    })
                }
            })
            .catch(error => {
                console.log("Here we captured the error: ", error)
                this.setState({
                    successFlag: false,
                    allSingleMatches: "Oops! Couldn't get data."
                })
            });
    }


    render() {

        console.log("msg from java controller: ", this.state.allOffersList);

        return (

            <div>
                <Header/>
                <SideBar/>

                <div className="content-body">
                    <div className="myContainer">
                        <span className="PageTitle">View Offer Matches</span>
                        {(this.state.allSingleMatches && this.state.allSingleMatches.length !== 0) ?

                            this.state.allSingleMatches.map(offer => (
                                <table>
                                    <tr>
                                        <td>SOURCE COUNTRY: {offer.srcCurrency}</td>
                                    </tr>
                                    <tr>
                                        <td>REMIT AMOUNT: {offer.remitAmount}</td>
                                    </tr>
                                    <tr>
                                        <td>DESTINATION CURRENCY: {offer.destCurrency}</td>
                                    </tr>
                                    <tr>
                                        <td>COUNTER OFFER FLAG: {offer.counterOfferFlag.toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>SPLIT OFFER FLAG: {offer.splitOfferFlag.toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>EXPIRATION DATE: {offer.expDate.substring(0, 10)}</td>
                                    </tr>
                                    <br/>
                                </table>
                            )) : <div> No matches yet!</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewOfferMatches;