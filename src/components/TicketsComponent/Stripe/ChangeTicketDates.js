import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ButtonDropdown,


} from "reactstrap";
import Spinner from "../Spinner/Spinner";
import Calender from '../Home/Calender/Calender';
import moment from "moment";
import {
  search as searchActrion,
  searchRequest as searchRequestAction,
  setDepFilters as setDepFiltersAction,
  resetSearchRequest as resetSearchRequestAction,
} from "../../store/actions/searchActions";
import {
  changeDateofTrip as changeDateofTripAction,
  availabilityDateofTrip as availabilityDateofTripAction,
  setResetChangeDates as setResetChangeDatesAction
} from "../../store/actions/myTripsActions";
import './ChangeTicketDates.css';
import _ from 'lodash';
import Stripe from "../book/views/Stripe";
import './ticket.css';
import '../../components/book/views/Price.css';
import ChangeTicketDatesTable from './ChangeTicketDatesTable';

class ChangeTicketDates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLocationInputs: false,
      isOpenPickup: false,
      showTimeFilter: false,
      selectedTicket: null,
      availabilityOfChange: false,
      changeTicketForFree: false,
      stripeModalOpen: false,
      cleanStates: false,
    }
  }
  componentDidUpdate() {
    const { searchParams, search, loading, loaded, item, startDateList, depFilters, depPickup, changeAvailability, availabilityData, changeTicketDatesIsOpen, resetSearchRequest, setResetChangeDates } = this.props;
    const { from, to, startDate, traveler  } = this.props.searchParams;

    if(depFilters.pickupStop && depFilters.dropoffStop && !this.state.showTimeFilter) {
      this.setState({showTimeFilter: true})
    }

    // availabilityDateofTrip
    if(searchParams.from && searchParams.to && searchParams.startDate && !this.state.showLocationInputs) {
      this.setState({showLocationInputs: true});
      const fromCity = item.from.city ? item.from.city.toLowerCase() : "";
      const toCity = item.to.city ? item.to.city.toLowerCase() : "";
      search(
        {
          from: fromCity.charAt(0).toUpperCase() + fromCity.slice(1),
          to: toCity.charAt(0).toUpperCase() + toCity.slice(1),
          startDate: moment(startDate).format('YYYY-MM-DD'),

          // endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
          traveler
        },
        this.props.apolloClient
      );
    }
    if(this.props.changeAvailabilityError && this.props.changeAvailabilityError.response &&  this.props.changeAvailabilityError.response.data && this.props.changeAvailabilityError.response.data.message){

      setTimeout(async () => {
        const a = await swal({
          title: "Error",
          text: `${this.props.changeAvailabilityError.response.data.message}`,
          icon: "error",
          dangerMode: false,
          className: ""
        });
        if (a === true) {
          location.reload();
        }
        if (a === null) {
          location.reload();
        }
      }, 200);

    }

    if(changeAvailability && changeAvailability.message === 'success' && !this.state.availabilityOfChange){
      this.setState({availabilityOfChange : true});

      if(changeAvailability.paymentAmount.value === 0){
        this.setState({ changeTicketForFree : true });
      } else if(changeAvailability.paymentAmount.value > 0){
        this.setState({ changeTicketWithPayment : true });
      }
    }

    if(availabilityData && changeAvailability.message){
      setTimeout(async () => {
        const a = await swal({
          title: "Success",
          text: "You have successfully changed your ticket.",
          icon: "success",
          dangerMode: false,
          className: ""
        });
        if (a === true) {
          location.reload();
        }
        if (a === null) {
          location.reload();
        }
      }, 200);
    }

    if((!changeTicketDatesIsOpen && !loading && loaded) || (!changeTicketDatesIsOpen &&  changeAvailability && changeAvailability.message === 'success' && this.state.availabilityOfChange)  ){
      resetSearchRequest();
      setResetChangeDates();
      this.setState({
        showLocationInputs : false,
        showTimeFilter: false,
        availabilityOfChange: false,
        changeTicketForFree: false,
        changeTicketWithPayment: false,
      });
    }
  }

  updateSearchParams = newVal => {
    const { searchParams, searchRequest } = this.props;
    this.setState({ showLocationInputs : false })
    searchRequest({
      ...searchParams,
      ...newVal
    });
  };

  onChange = (key, val) => {
    if(val === '') {
      this.setState({showTimeFilter: false, selectedTicket: null});
    }
    // let val = e.target.value
    const { setDepFilters, depFilters } = this.props;
    // create new filter conditions
    const conditions = { ...depFilters, [key]: val };
    // update filter conditions (redux)
    setDepFilters(conditions);
  };

  onChangeTime = (e) => {
    const obj = JSON.parse(e.target.value);
    this.setState({selectedTicket : obj})
  }

  togglePickup = () => {
    // eslint-disable-line
    const { isOpenPickup } = this.state;
    this.setState({ isOpenPickup: !isOpenPickup });
  };

  toggleDropoff = () => {
    const { isOpenDropoff } = this.state;
    this.setState({ isOpenDropoff: !isOpenDropoff });
  };

  renderTitle = title => (
    <div className="filter-modal-title-container">
      <h4 className="filter-modal-sub-title">{title}</h4>
    </div>
  );

  renderPickupLocations = () => {
    const { depFilters, depPickup, item } = this.props;
    const { isOpenPickup } = this.state;
    const title = depFilters.pickupStop
      ? depFilters.pickupStop[0]
      : "Show me all stops";

    return (
      <ButtonDropdown isOpen={isOpenPickup} toggle={this.togglePickup}>
        <div className="select-box-card">
          <select
            placeholder="Select a person"
            onChange={ (e) => this.onChange("pickupStop", e.target.value)}
          >
            <option value=''>Show me all stops</option>
            {depPickup && depPickup.map((val) => {
              return (
                <option
                  // selected={item.from.spot === val ? true : false}
                  value={val}
                >{val}</option>
              )
            })}
          </select>
        </div>
      </ButtonDropdown>
    );
  };

  renderDropoffLocations = () => {
    const { depFilters, depDropoff, item } = this.props;
    const { isOpenDropoff } = this.state;
    const title = depFilters.dropoffStop
      ? depFilters.dropoffStop[0]
      : "Show me all stops";
    return (
      <ButtonDropdown isOpen={isOpenDropoff} toggle={this.toggleDropoff}>
        <div className="select-box-card">
          <select
            placeholder="Select a person"
            onChange={ (e) => this.onChange("dropoffStop", e.target.value)}
          >
            <option value=''>Show me all stops</option>
            {depDropoff && depDropoff.map((val) => {
              return (
                <option
                  // selected={item.to.spot === val ? true : false}
                  value={val}
                >{val}</option>
              )
            })}
          </select>
        </div>

      </ButtonDropdown>
    );
  };

  // eslint-disable-line
  isMatchTimeRange = (timeStr, timeRangeConditions) => {
    // check params
    if (!timeRangeConditions || timeRangeConditions.lenght === 0) return true
    if (!timeStr || timeStr.length === 0 || timeStr.split(':').length < 2) return false

    // convert time to minutes
    const minutes = Number(timeStr.split(':')[0]) * 60 + Number(timeStr.split(':')[1])

    // check each conditions are match or not
    let isMatch = false
    timeRangeConditions.forEach((t) => {
      // eslint-disable-line
      let start,
        end
      if (t === '4AM to 12PM') {
        start = 4 * 60
        end = 12 * 60
      } else if (t === '12PM to 9PM') {
        start = 12 * 60
        end = 21 * 60
      } else if (t === '9PM to 4AM') {
        start = 21 * 60
        end = 4 * 60
      }
      const isBetween = start <= minutes && minutes <= end
      if (isBetween) isMatch = true
    })

    return isMatch
  }

  isMatch = (item) => {
    // eslint-disable-line
    if (!item) return false
    const { type, depFilters, retFilters } = this.props
    const filters =  depFilters
    const {
      pickupStop, pickupTime, dropoffStop, dropoffTime, operators,
    } = filters
    // check params
    const { pickUp, dropOff, productName } = item
    if (!pickUp || !dropOff) return false

    // check filter and conditions
    const { supplierPickupName, supplierPickupTime } = pickUp
    const { supplierDropoffName, supplierDropoffTime } = dropOff
    if (
      !supplierPickupName ||
      !supplierPickupTime ||
      !supplierDropoffName ||
      !supplierDropoffTime ||
      (pickupStop && pickupStop.indexOf(supplierPickupName) === -1) ||
      (dropoffStop && dropoffStop.indexOf(supplierDropoffName) === -1) ||
      // (operators && operators.indexOf(productName) === -1) ||
      !this.isMatchTimeRange(supplierPickupTime, pickupTime) ||
      !this.isMatchTimeRange(supplierDropoffTime, dropoffTime)
    ) {
      return false
    }

    if (operators && operators.indexOf(productName) === -1) {
      return false
    }
    return true
  }

  tConvert = time => {
    const H = +time.substr(0, 2);
    const h = H % 12 || 12;
    const ampm = H < 12 ? " AM" : " PM";
    return h + time.substr(2, 3) + ampm;
  };

  changeDate = () => {
    if( this.state.selectedTicket ) {
      const body = {
        date: this.state.selectedTicket.date,
        fromSpotCode: this.props.loggedIn ? this.state.selectedTicket.memberDetails.pickUp.supplierPickupCode : this.state.selectedTicket.pickUp.supplierPickupCode ,
        toSpotCode: this.props.loggedIn ? this.state.selectedTicket.memberDetails.dropOff.supplierDropoffCode : this.state.selectedTicket.dropOff.supplierDropoffCode ,
        productCode: this.props.loggedIn ? this.state.selectedTicket.memberDetails.productCode : this.state.selectedTicket.productCode,
        fromSpot: this.props.depFilters.pickupStop.trim(),
        toSpot: this.props.depFilters.dropoffStop.trim(),
        uuid: this.props.item.uuid,
      }
      this.props.changeDateofTrip(body);

    }
  }

  changeTicketWithPayment = () => {
    this.setState({ stripeModalOpen : true });
  }

  changeTicketForFree = () => {
    const data = {
      date: this.state.selectedTicket.date,
      uuid: this.props.item.uuid,
      // token: res.id,
      supplierPickupCode: this.state.selectedTicket.pickUp.supplierPickupCode,
      supplierDropoffCode: this.state.selectedTicket.dropOff.supplierDropoffCode,
      productCode: this.props.loggedIn ? this.state.selectedTicket.memberDetails.productCode : this.state.selectedTicket.productCode,
      fromTime:this.state.selectedTicket.pickUp.supplierPickupTime,
      toTime:this.state.selectedTicket.dropOff.supplierDropoffTime,
      fromSpot: this.props.loggedIn ? this.state.selectedTicket.memberDetails.pickUp.supplierPickupName.trim() : this.state.selectedTicket.pickUp.supplierPickupName.trim(),
      toSpot: this.props.loggedIn ? this.state.selectedTicket.memberDetails.dropOff.supplierDropoffName.trim() : this.state.selectedTicket.dropOff.supplierDropoffName.trim(),
      // userId: userId
    }
    this.props.availabilityDateofTrip(data);
  }

  onLoader = () => {
    this.setState({
      loader: true
    });
  };

  onStripeCallback = async (res, amount, stripeError) => {
    this.setState({
      loader: true
    });

    if(res && res.id){
      const userId = localStorage.getItem('token');
      const data = {
        date: this.state.selectedTicket.date,
        uuid: this.props.item.uuid,
        token: res.id,
        supplierPickupCode: this.state.selectedTicket.pickUp.supplierPickupCode,
        supplierDropoffCode: this.state.selectedTicket.dropOff.supplierDropoffCode,
        productCode: this.props.loggedIn ? this.state.selectedTicket.memberDetails.productCode : this.state.selectedTicket.productCode,
        fromTime:this.state.selectedTicket.pickUp.supplierPickupTime,
        toTime:this.state.selectedTicket.dropOff.supplierDropoffTime,
        fromSpot: this.props.loggedIn ? this.state.selectedTicket.memberDetails.pickUp.supplierPickupName.trim() : this.state.selectedTicket.pickUp.supplierPickupName.trim(),
        toSpot: this.props.loggedIn ? this.state.selectedTicket.memberDetails.dropOff.supplierDropoffName.trim() : this.state.selectedTicket.dropOff.supplierDropoffName.trim(),
      }

      if(this.props.loggedIn){
        data.userId = userId
      }
      this.props.availabilityDateofTrip(data);
    }

  }

  render() {
    const { changeTicketDatesIsOpen, loading, loaded, startDateList, changeAvailabilityPending, availabilityPending } = this.props;
    const listData = startDateList ?  _.sortBy(startDateList, [o => o.pickUp.supplierPickupTime]) : null;
    return (
      <>
        <div>
          <Modal
            className="cancellation-modal-container change-date-modal-container"
            isOpen={changeTicketDatesIsOpen}
            toggle={this.props.toggleTicketDatesModal}
          >
            { ((loading && !loaded) || changeAvailabilityPending || availabilityPending) && (
              <Spinner
                styles={{
                  zIndex: "9",
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#00000033"
                }}
              />
            )}
            <ModalHeader toggle={this.props.toggleTicketDatesModal}>Change Date And Time</ModalHeader>
            <p className="change-section-header">
              <p>
                <strong>Change Fees</strong>
              </p>
              <p>
                <i>
                  All refunds and changes are processed by you through your “Member Account” or through the “My Tickets” section of the site. No changes or cancelations are permitted within an hour of pick up time, after which time tickets will be deemed lost.
                </i>
              </p>
              <div>
                <ul>
                  <li>Same Date & Zone – no fee</li>
                  <li>Same Date with different Zone – Difference in fare</li>
                  <li>New Date - $5</li>
                  <li>New Date & Zone - Difference in fare + $5</li>
                </ul>
              </div>
            </p>
            <ModalBody>
              { ( !this.state.changeTicketForFree && !this.state.changeTicketWithPayment)  &&
                <div>
                  <div className="from-date-conatainer">
                    {this.renderTitle("Date")}
                    <Calender
                      value=""
                      placeholder="Depart"
                      onChange={date => {
                        this.updateSearchParams({
                          startDate: moment(date).toISOString(),
                          to: this.props.item.to.spot,
                          from: this.props.item.from.spot
                        })
                      }

                      }
                    />
                  </div>
                  { ( !loading && loaded ) &&
                    <div>
                      <div className="filter-modal-contents-container">
                        {this.renderTitle("Pickup Locations")}
                        {this.renderPickupLocations()}
                      </div>
                      <div className="filter-modal-contents-container">
                        {this.renderTitle("Dropoff Locations")}
                        {this.renderDropoffLocations()}
                      </div>
                    </div>
                  }
                  { this.state.showTimeFilter &&
                    <div>
                      {this.renderTitle("Time")}
                      <div className="select-box-card">
                        <select onChange={(e)=>this.onChangeTime(e)}>
                          <option selected disabled>Select Times</option>
                          {listData && listData.map((item) => {
                            if (!this.isMatch(item)) {
                              return null
                            } else {
                              return (
                                <option value={JSON.stringify(item)}>{this.tConvert(item.pickUp.supplierPickupTime)}</option>
                              )
                            }
                          })}
                        </select>
                      </div>
                    </div>
                  }
                </div>
              }
              { this.state.changeTicketForFree &&
                <div className="change-ticket-for-free">
                  <h4 className="filter-modal-sub-title"> You are eligible to daily your ticket for free. Are you sure you want to charge ticket ? </h4>
                  <ChangeTicketDatesTable
                    selectedTicket={this.state.selectedTicket}
                    item={this.props.item}
                  />
                </div>
              }
              { this.state.changeTicketWithPayment &&
                <div className="change-ticket-with-payment">
                  <h4 className="filter-modal-sub-title"> You need to process payment to change your ticket based on ticket change policy. </h4>
                  <ChangeTicketDatesTable
                    selectedTicket={this.state.selectedTicket}
                    item={this.props.item}
                  />
                  { this.props.changeAvailability &&
                    <div className="price-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> Amount: </td>
                            <td> $ {((this.props.changeAvailability.paymentAmount.value) / 100).toFixed(2)} </td>
                          </tr>
                          <tr>
                            <td> Tax: </td>
                            <td> $ {((this.props.changeAvailability.paymentAmount.tax) / 100).toFixed(2)} </td>
                          </tr>
                          <tr>
                            <td> Total: </td>
                            <td> $ {((this.props.changeAvailability.paymentAmount.total) / 100).toFixed(2)} </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  }
                </div>
              }
            </ModalBody>
            <ModalFooter>
              <div className="edit-buttons">
                  <button className="cencel" onClick={this.props.toggleTicketDatesModal}>Close</button>

                  <button className="modify" onClick={ (!this.state.changeTicketWithPayment && !this.state.changeTicketForFree) ? this.changeDate : ( this.state.changeTicketWithPayment ? this.changeTicketWithPayment :  this.changeTicketForFree )  } disabled={!this.state.selectedTicket}>Confirm</button>

              </div>
            </ModalFooter>
          </Modal>

          {this.state.stripeModalOpen && (
            <div className="price-stripe-modal-container">
              <div className="price-stripe-modal">
                <Stripe
                  onPuy={this.onPuy}
                  amount={this.props.changeAvailability.paymentAmount.value}
                  onClickNext={this.onStripeCallback}
                  onLoader={this.onLoader}
                  loader={this.state.loader}
                  total={this.props.changeAvailability.paymentAmount.total}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  search: (data, apolloClient) => dispatch(searchActrion(data, apolloClient)),
  searchRequest: data => dispatch(searchRequestAction(data)),
  resetSearchRequest: data => dispatch(resetSearchRequestAction(data)),
  setDepFilters: data => dispatch(setDepFiltersAction(data)),
  setResetChangeDates: data => dispatch(setResetChangeDatesAction(data)),
  changeDateofTrip: data => dispatch(changeDateofTripAction(data)),
  availabilityDateofTrip: data => dispatch(availabilityDateofTripAction(data)),
});
const mapStateToProps = state => ({
  startDateList: state.search.startDateList,
  searchParams: state.search.searchParameters,
  loading: state.search.loading,
  loaded: state.search.loaded,
  loggedIn: state.app.loggedIn,
  depFilters: state.search.depFilters,
  retFilters: state.search.retFilters,
  depPickup: state.search.stops.dep.pickup,
  depDropoff: state.search.stops.dep.dropoff,
  coordinates: state.search.coordinates,
  changeAvailability: state.findTrips.changeAvailability,
  changeAvailabilityPending: state.findTrips.changeAvailabilityPending,
  changeAvailabilityError: state.findTrips.changeAvailabilityError,
  availabilityData: state.findTrips.availabilityData,
  availabilityPending: state.findTrips.availabilityPending,
  availabilityError : state.findTrips.availabilityError
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeTicketDates);
