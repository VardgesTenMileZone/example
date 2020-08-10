import React, { Component, Fragment } from "react";
import moment from "moment";
import { Modal } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "antd";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";
import "./Calender.scss";

export default class Calender extends Component {
  state = {
    isOpen: false,
    selectedDate: this.props.value
  };

  onChangeDate = date => {
    const { onChange } = this.props;
    if (date && onChange) {
      this.setState({ selectedDate: date, isOpen: false });
      onChange(date);
    }
  };

  onClearDate = () => {
    const { onChange } = this.props;
    if (onChange) {
      this.setState({ selectedDate: null, isOpen: false });
      onChange(null);
    }
  };

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { isOpen, selectedDate } = this.state;
    const { placeholder, minForRetun } = this.props;
    const nowDate = new Date();
    return (
      <Fragment>
        <button
          className="btn btn-date-picker calendar-button"
          onClick={this.toggle}
        >
          <p
            className={
              selectedDate ? "calendar-selected-text" : "calendar-text"
            }
          >
            {selectedDate
              ? moment(selectedDate).format("MMM Do, YYYY")
              : placeholder}
          </p>
          <i className="fa fa-calendar-o calendar-icon" />
        </button>
        <Modal
          className="calendar-spacial-modal"
          isOpen={isOpen}
          toggle={this.toggle}
          bg-light
        >
          <InfiniteCalendar
            selected={selectedDate || minForRetun || nowDate}
            minDate={minForRetun ? new Date(minForRetun) : new Date()}
            className=""
            onSelect={value => {
              this.setState({ isOpen: !this.state.isOpen });
              this.onChangeDate(value);
            }}
            width={"100%"}
            theme={{
              selectionColor: "#f58153",
              textColor: {
                default: "#000",
                active: "#FFF"
              },
              weekdayColor: "#f58153",
              headerColor: "#f58153",
              floatingNav: {
                background: "#f15d77",
                color: "#FFF",
                chevron: "#FFA726"
              }
            }}
          />
          <div className="calendar-clear-button-cotnainer">
            <Button
              title="Clear Date"
              className="btn btn-hobber-effect calendar-clear-button"
              onClick={this.onClearDate}
            />
          </div>
        </Modal>
      </Fragment>
    );
  }
}
