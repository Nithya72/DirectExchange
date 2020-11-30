import React, { Component } from "react";
import axios from "axios";
import Header from "../Navigation/Header";
import SideBar from "../Navigation/SideBar";
import TransactItems from "./TransactItems";

export class Transact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionDetails: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8080/directexchange/api/transactions/9")
      .then((response) => {
        if (response.status == 200) {
          console.log("Response ", response.data);
          this.setState({
            transactionDetails: response.data,
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }
  render() {
    console.log("state var", this.state.transactionDetails);
    return (
      <div>
        <Header />
        <SideBar />

        <div className="content-body">
          <div className="container">
            <div class="card">
              <div class="card-header border-0">
                <h4 class="card-title">Transaction Details</h4>
              </div>
              <div class="card-body pt-0">
                <div class="transaction-table">
                  <div class="table-responsive">
                    <table class="table mb-0 table-responsive-sm">
                      <tbody>
                        {this.state.transactionDetails.map((details) => {
                          return <TransactItems details={details} />;
                        })}
                      </tbody>
                    </table>
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

export default Transact;
