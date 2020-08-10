import gql from "graphql-tag";
import config from "../../utils/config";
import {
  BOOK_PASSENGERS_INFO,
  BOOK_DRIVER_TIP,
  BOOK_SELECTED_DEPARTURE_TICKET,
  BOOK_SELECTED_RESET_TICKET,
  BOOK_SELECTED_RETURN_TICKET
} from "../constants";

const axios = require("axios");

export const getCompanyInfo = productName => {
  // eslint-disable-line
  const companyName = productName.split("-")[0];
  switch (companyName) {
    case "SNOWBUS":
      return {
        name: "SNOWBUS",
        src: "/static/assets/icons/snowbus-whistler.svg"
      };
    case "EPIC RIDES":
      return {
        name: "EPIC RIDES",
        src: "/static/assets/icons/epic-rides-black.png"
      };
    case "UNIVERSAL":
      return {
        name: "Universal",
        src: "/static/assets/icons/gray-ucl-red.png"
      };
    default:
      return {
        name: "SNOWBUS",
        src: "/static/assets/icons/snowbus-whistler.svg"
      };
  }
};

const formatTicketForBooking = (ticket, adult, from, to) => {
  if (!ticket) return null;
  const { productCode, date, pickUp, dropOff, productName, price, dropoffName, pickupName } = ticket;

  if (
    !adult ||
    adult === 0 ||
    !productCode ||
    !date ||
    !pickUp ||
    !dropOff ||
    !price ||
    !pickUp.supplierPickupCode ||
    !pickUp.supplierPickupTime ||
    !pickUp.supplierPickupName ||
    !dropOff.supplierDropoffCode ||
    !dropOff.supplierDropoffTime ||
    !dropOff.supplierDropoffName
  ) {
    return null;
  }
  return {
    adult,
    date,
    busline: productName,

    from: {
      time: pickUp.supplierPickupTime,
      spot: pickUp.supplierPickupName,
      city: from
    },
    to: {
      time: dropOff.supplierDropoffTime,
      spot: dropOff.supplierDropoffName,
      city: to
    },
    productCode,
    pickupCode: pickUp.supplierPickupCode,
    dropoffCode: dropOff.supplierDropoffCode,
    price,
    dropoffName,
    pickupName
  };
};

// ------------------------------------
// Actions
// ------------------------------------

export const setPassengerInfo = passengers => ({
  type: BOOK_PASSENGERS_INFO,
  passengers
});

export const setDriverTip = driverTip => ({
  type: BOOK_DRIVER_TIP,
  driverTip
});

export const setDepartureTicket = ticket => ({
  type: BOOK_SELECTED_DEPARTURE_TICKET,
  ticket
});

export const setReturnTicket = ticket => ({
  type: BOOK_SELECTED_RETURN_TICKET,
  ticket
});

export const setResetTicket = () => ({
  type: BOOK_SELECTED_RESET_TICKET
});

export const payForBooking = (input, loggedIn, userId, useCredits) => async (
  dispatch,
  getState
) => {
  const response = await bookTickets(getState);

  if (useCredits) {
    return axios.post(`${config.host}/charge`, {
      token: input.requestId,
      userId,
      tickets: response.tickets,
      passengers: response.passengers,
      roundTrip: response.roundTrip,
      driverTip: response.driverTip,
      useCredits: input.useCredits,
      snowPass: input.snowPass
    });
  }

  return axios.post(`${config.host}/charge`, {
    token: input.requestId,
    userId,
    tickets: response.tickets,
    passengers: response.passengers,
    roundTrip: response.roundTrip,
    driverTip: response.driverTip,
    useCredits: input.useCredits,
    snowPass: input.snowPass
  });
};

export const bookTickets = async getState => {
  const {
    search,
    book,
    app: { loggedIn }
  } = getState();

  const { searchParameters } = search;
  const { departureTicket, returnTicket, passengers, driverTip } = book;

  // format tickets
  const formatedDepartureTicket = formatTicketForBooking(
    loggedIn
      ? { ...departureTicket.memberDetails, date: departureTicket.date }
      : departureTicket,
    searchParameters.traveler.total,
    searchParameters.from,
    searchParameters.to,
  );

  let formatedReturnTicket = null;
  if (returnTicket) {
    formatedReturnTicket = formatTicketForBooking(
      loggedIn
        ? { ...returnTicket.memberDetails, date: returnTicket.date }
        : returnTicket,
      searchParameters.traveler.total,
      searchParameters.to,
      searchParameters.from,
    );
  }
  if (
    !formatedDepartureTicket ||
    !passengers ||
    (returnTicket && !formatedReturnTicket)
  ) {
    return null;
  }

  // create params
  const tickets = [formatedDepartureTicket];
  if (formatedReturnTicket) tickets.push(formatedReturnTicket);

  let roundTrip = false;
  console.log("tickets[0]: ", tickets[0]);
  console.log("tickets[1]: ", tickets[1]);

  if (
    tickets.length > 1 &&
    tickets[0].busline === tickets[1].busline &&
    tickets[0].pickupName === tickets[1].dropoffName &&
    tickets[0].dropoffName === tickets[1].pickupName
  ) {
    roundTrip = true;
  }

  return {
    tickets,
    passengers,
    roundTrip,
    driverTip
  };
  // try {
  //   // eslint-disable-next-line no-shadow
  //   const { data: { createBooking: { booking } } } = await apollo.mutate({
  //     mutation: gql`
  //       mutation createBooking($input: BookingInput!) {
  //         createBooking(input: $input) {
  //           booking {
  // eslint-disable-next-line no-tabs
  //           	tickets {
  // eslint-disable-next-line no-tabs
  //            	bookingReference,
  //               confirmationNumber,
  //               type,
  //               date,
  //               transactionId
  // eslint-disable-next-line no-tabs
  //           	}
  //           },
  //         }
  //       }
  //     `,
  //     variables: { input },
  //   })
  //   return booking
  // } catch (err) {
  //   console.log(err)
  //   alert(err)
  // }
};

export const actions = {
  setPassengerInfo,
  setDriverTip,
  setDepartureTicket,
  setReturnTicket,
  getCompanyInfo
};
