import React, { Component } from "react";
import { connect } from "react-redux";
import './ChangeTicketDates.css';
import './Stripe.css'

class ChangeTicketDatesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log("selectedTicket", this.props.selectedTicket)
    console.log("item", this.props.item)
    const { selectedTicket, item } = this.props;

    return (
      <>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Existing</th>
              <th>Changing To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Date</td>
              <td>{item.date}</td>
              <td>{selectedTicket.date}</td>
            </tr>
            <tr>
              <td>Pickup Spot</td>
              <td>{item.from.spot}</td>
              <td>{selectedTicket.pickUp.supplierPickupName}</td>
            </tr>
            <tr>
              <td>Pickup Time</td>
              <td>{item.from.time}</td>
              <td>{selectedTicket.pickUp.supplierPickupTime}</td>
            </tr>
            <tr>
              <td>Dropoff Spot</td>
              <td>{item.to.spot}</td>
              <td>{selectedTicket.dropOff.supplierDropoffName}</td>
            </tr>
            <tr>
              <td>Dropoff Time</td>
              <td>{item.to.time}</td>
              <td>{selectedTicket.dropOff.supplierDropoffTime}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeTicketDatesTable);
