import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import Spinner from "../../SpinnerComponent/SpinnerComponent";
import "./Stripe.css";

const handleBlur = () => {
  console.log("[blur]");
};
const handleChange = () => {
  console.log("[change]");
};
const handleClick = () => {
  console.log("[click]");
};
const handleFocus = () => {
  console.log("[focus]");
};
const handleReady = () => {
  console.log("[ready]");
};

class CheckoutForm extends Component {
  componentDidMount() {
    const { total, onClickNext, amount } = this.props;
    if (total === 0) {
      onClickNext(null, amount);
    }
  }

  handleSubmit = ev => {
    const { stripe, amount, onLoader, onClickNext } = this.props;
    ev.preventDefault();
    onLoader();

    if (stripe) {
      stripe.createToken().then(payload => onClickNext(payload.token, amount, payload.error));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    const { loader, total } = this.props;
    return (
      <div className="stripe-check-form-container">
        {total !== 0 ? (
          <form onSubmit={this.handleSubmit}>
            <div className={loader ? "hide-payment-conntent" : ""}>
              <label>
                Card number
                <CardNumberElement
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onReady={handleReady}
                />
              </label>
              <div className="cvsContainer">
                <label>
                  Expiration date
                  <CardExpiryElement
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onReady={handleReady}
                  />
                </label>
                <label className="cvcLabel">
                  CVC
                  <CardCVCElement
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onReady={handleReady}
                  />
                </label>
              </div>
            </div>
            {loader ? (
              <Spinner className="stripe-check-form-spinner" />
            ) : (
              <button className="stripe-check-form-pay-button">Pay</button>
            )}
          </form>
        ) : (
          <Spinner className="stripe-check-form-spinner" />
        )}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
