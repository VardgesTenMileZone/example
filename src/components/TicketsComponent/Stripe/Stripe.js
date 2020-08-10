import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./StripeCheckOutForm";
import { connect } from "react-redux";
import "./Stripe.css";

class Stripe extends Component {
  getEmailFromPassengers = () => {
    const { passengers } = this.props;
    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return "";
    }
    return passengers.length > 0 ? passengers[0].email : "";
  };
  render() {
    const { amount, onClickNext, onLoader, loader, onPuy, total} = this.props;

    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
        <div className="stripeContainer script-content">
          {total !== 0 && (
            <div className="script-content-card">
              <div className="script-puy" onClick={onPuy}>
                x
              </div>
              <img
                className="script-img"
                src="https://www.whistlersnowbus.com/wp-content/uploads/2017/05/snowbus-logo-200.png"
                alt=""
              />
              <img
                className="script-img-second"
                src="/static/assets/icons/snowbus.svg"
                alt=""
              />
              <p className="script-p">{this.getEmailFromPassengers()}</p>
            </div>
          )}
          <Elements>
            <CheckoutForm
              amount={amount}
              onClickNext={onClickNext}
              onLoader={onLoader}
              loader={loader}
              total={total}
            />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

const mapStateToProps = state => ({
  passengers: state.book.passengers
});

export default connect(mapStateToProps)(Stripe);
