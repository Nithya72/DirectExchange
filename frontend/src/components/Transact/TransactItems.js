import React, { Component } from "react";

export class TransactItems extends Component {
  render() {
    let classValue = "badge badge-danger";

    if (this.props.details.transactionStatus === "pending") {
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
          Final Amount
          <br />
          {this.props.details.offerDetails.destCurrency}{" "}
          {this.props.details.offerDetails.finalAmount}
        </td>
        <td>
          Exchange Rate
          <br />
          {this.props.details.offerDetails.exchangeRate}
        </td>
        {this.props.details.transactionStatus !== "aborted" ? (
          <td class="text-danger">
            {this.props.details.is_complete ? (
              <React.Fragment>Waiting for other parties</React.Fragment>
            ) : (
              <button className="post-offer-button">Fill Details</button>
            )}
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    );
  }
}

export default TransactItems;
