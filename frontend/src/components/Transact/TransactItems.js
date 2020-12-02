import Axios from "axios";
import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export class TransactItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiptAmount: 0,
    };
  }

  componentDidMount() {
    this.setState({
      receiptAmount:
        this.props.details.offerDetails.exchangeRate *
        parseFloat(this.props.details.offerDetails.remitAmount).toFixed(2) *
        0.9995,
    });
  }
  fillDetails = () => {
    let formdata = new FormData();
    console.log(this.props.details);
    formdata.append("offer_id", this.props.details.offerDetails.offerId);
    formdata.append("transaction_id", this.props.details.transactionId);
    console.log(this.props.details.transactionId);
    axios.defaults.headers.common["authorization"] =
      "Bearer " + localStorage.getItem("token");
    var decodedToken = jwt_decode(localStorage.getItem("token"));
    axios
      .put(
        "http://localhost:8080/directexchange/api/transactions/" +
          decodedToken.sub,
        formdata
      )
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
  };

  render() {
    let classValue = "badge badge-danger";

    if (this.props.details.transactionStatus === "pending") {
      classValue = "badge badge-warning";
    } else if (this.props.details.transactionStatus === "completed") {
      classValue = "badge badge-success";
    }

    return (
      <tr>
        <td>
          <span class={classValue}>
            {this.props.details.transactionStatus.toUpperCase()}
          </span>
        </td>
        <td>
          Remit Amount
          <br />
          {this.props.details.offerDetails.srcCurrency}{" "}
          {this.props.details.offerDetails.remitAmount}
        </td>
        <td>
          Recipient gets
          <br />
          {this.props.details.offerDetails.destCurrency}{" "}
          {this.state.receiptAmount.toFixed(2)}
          <br />
          <small>
            <em>*total after service fees</em>
          </small>
        </td>
        <td>
          Exchange Rate
          <br />
          {this.props.details.offerDetails.exchangeRate}
        </td>
        {this.props.details.transactionStatus === "pending" ? (
          <td class="text-danger">
            {this.props.details.is_complete ? (
              <React.Fragment>Waiting for other parties</React.Fragment>
            ) : (
              <button className="post-offer-button" onClick={this.fillDetails}>
                Fill Details
              </button>
            )}
          </td>
        ) : (
          <td style={{ fontWeight: "500" }}>
            Transaction has been {this.props.details.transactionStatus}
          </td>
        )}
      </tr>
    );
  }
}

export default TransactItems;
