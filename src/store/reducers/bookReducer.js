import {
  BOOK_PASSENGERS_INFO,
  BOOK_DRIVER_TIP,
  BOOK_SELECTED_DEPARTURE_TICKET,
  BOOK_SELECTED_RESET_TICKET,
  BOOK_SELECTED_RETURN_TICKET,
  MOUNTAIN_NOTIFICATIONS,
  DELETE_MOUNTAIN_NOTIFICATION,
  ADD_MOUNTAIN_NOTIFICATION,
  GET_INDIVIDUAL_NOTIFICATION,
  UPDATE_MOUNTAIN_NOTIFICATION
} from '../constants'

const initialState = {
  passengers: null,
  departureTicket: null,
  returnTicket: null,
  success: null,
  error: null,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [BOOK_PASSENGERS_INFO]: (state, { passengers }) => ({
    ...state,
    passengers,
  }),
  [BOOK_DRIVER_TIP]: (state, { driverTip }) => ({
    ...state,
    driverTip,
  }),
  [BOOK_SELECTED_DEPARTURE_TICKET]: (state, { ticket }) => ({
    ...state,
    departureTicket: ticket,
  }),
  [BOOK_SELECTED_RETURN_TICKET]: (state, { ticket }) => ({
    ...state,
    returnTicket: ticket,
  }),
  [BOOK_SELECTED_RESET_TICKET]: state => ({
    ...state,
    departureTicket: null,
    returnTicket: null,
  }),
  [MOUNTAIN_NOTIFICATIONS.PENDING]: (state) => ({
    ...state,
    pending: true,
  }),
  [MOUNTAIN_NOTIFICATIONS.SUCCESS]: (state, { mountainNotification }) => ({
    ...state,
    pending: false,
    mountainNotification,
  }),
  [MOUNTAIN_NOTIFICATIONS.ERROR]: (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }),
  [DELETE_MOUNTAIN_NOTIFICATION.PENDING]: (state) => ({
    ...state,
    pending: true,
  }),
  [DELETE_MOUNTAIN_NOTIFICATION.SUCCESS]: (state, { success }) => ({
    ...state,
    pending: false,
    success,
  }),
  [DELETE_MOUNTAIN_NOTIFICATION.ERROR]: (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }),
  [ADD_MOUNTAIN_NOTIFICATION.PENDING]: (state) => ({
    ...state,
    pending: true,
  }),
  [ADD_MOUNTAIN_NOTIFICATION.SUCCESS]: (state, { success }) => ({
    ...state,
    pending: false,
    success,
  }),
  [ADD_MOUNTAIN_NOTIFICATION.ERROR]: (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }),
  [GET_INDIVIDUAL_NOTIFICATION.PENDING]: (state) => ({
    ...state,
    pending: true,
  }),
  [GET_INDIVIDUAL_NOTIFICATION.SUCCESS]: (state, { individualNotification }) => ({
    ...state,
    pending: false,
    individualNotification,
  }),
  [GET_INDIVIDUAL_NOTIFICATION.ERROR]: (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }),
  [UPDATE_MOUNTAIN_NOTIFICATION.PENDING]: (state) => ({
    ...state,
    pending: true,
  }),
  [UPDATE_MOUNTAIN_NOTIFICATION.SUCCESS]: (state, { success }) => ({
    ...state,
    pending: false,
    success,
  }),
  [UPDATE_MOUNTAIN_NOTIFICATION.ERROR]: (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }),
  // add action handler here...
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
