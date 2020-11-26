import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import LandingPage from "../Landing/LandingPage";

export class AllExchangeOffers extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            submitted: false,
            allOffersList: ""
        }
    }

    componentDidMount() {

        // axios.defaults.withCredentials = true;
        axios.get('http://localhost:8080/directexchange/user/exchangeoffer/1')
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("Fetched All Offers: ", response.data);
                    this.setState({
                        successFlag: true,
                        allOffersList: response.data
                    })
                }
            })
            .catch(error => {
                console.log("Here we captured the error: ", error)
                this.setState({
                    successFlag: false,
                    allOffersList: "Oops! Couldn't get data."
                })
            });
    }

    render() {

        console.log("msg from java controller: ", this.state.allOffersList);

        return (
            <div>
                <LandingPage/>
                Inside All Offers Page

                <div style={{marginLeft:"100px"}}>
                {(this.state.allOffersList && this.state.allOffersList.length !== 0) ?

                    this.state.allOffersList.map(offer => (
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
                                <td>COUNTER OFFER FLAG: {offer.counterOfferFlag}</td>
                            </tr>
                            <tr>
                                <td>SPLIT OFFER FLAG: {offer.splitOfferFlag}</td>
                            </tr>
                            <br/>
                        </table>
                    )) : <div> No offers yet!</div>
                }
                </div>
            </div>
        )
    }
}

export default AllExchangeOffers;