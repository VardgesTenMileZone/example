const LOGIN = {
  PENDING: "LOGIN_PENDING",
  SUCCESS: "LOGIN_SUCCESS",
  ERROR: "LOGIN_ERROR",
};

const LOGOUT = {
  PENDING: "LOGOUT_PENDING",
  SUCCESS: "LOGOUT_SUCCESS",
}

const GET_TICKETS = {
  PENDING: "GET_TICKETS_PENDING",
  SUCCESS: "GET_TICKETS_SUCCESS",
  ERROR: "GET_TICKETS_ERROR"
}

const TICKET_FORCE_CANCEL = {
  PENDING: "TICKET_FORCE_CANCEL_PENDING",
  SUCCESS: "TICKET_FORCE_CANCEL_SUCCESS",
  ERROR: "TICKET_FORCE_CANCEL_ERROR"
}

const RESEND_EMAIL = {
  PENDING: "RESEND_EMAIL_PENDING",
  SUCCESS: "RESEND_EMAIL_SUCCESS",
  ERROR: "RESEND_EMAIL_ERROR",
  RESET: "RESEND_EMAIL_RESET"
}

const ISLOGIN = {
  PENDING: "ISLOGIN_PENDING",
  SUCCESS: "ISLOGIN_SUCCESS",
  ERROR: "ISLOGIN_ERROR",
  RESET: "ISLOGIN_RESET"
}


const GET_TICKETS_BY_ID = {
  PENDING: "GET_TICKETS_BY_ID_PENDING",
  SUCCESS: "GET_TICKETS_BY_ID_SUCCESS",
  ERROR: "GET_TICKETS_BY_ID_ERROR"
}

const FILTER_TICKETS_BY_ID = {
  PENDING: "FILTER_TICKETS_BY_ID_PENDING",
  SUCCESS: "FILTER_TICKETS_BY_ID_SUCCESS",
  ERROR: "FILTER_TICKETS_BY_ID_ERROR"
}

const CANCELL_TICKETS = {
  PENDING: "CANCELL_TICKETS_PENDING",
  SUCCESS: "CANCELL_TICKETS_SUCCESS",
  ERROR: "CANCELL_TICKETS_ERROR"
}

const GET_REPORTS_DOWNLOAD = {
  PENDING: "GET_REPORTS_DOWNLOAD_PENDING",
  SUCCESS: "GET_REPORTS_DOWNLOAD_SUCCESS",
  ERROR: "GET_REPORTS_DOWNLOAD_ERROR"
};

const FETCHED_MOUNTAIN = {
  PENDING:"FETCHED_MOUNTAIN_PENDING",
  SUCCESS:"FETCHED_MOUNTAIN_SUCCESS",
  ERROR:"FETCHED_MOUNTAIN_ERROR"
}

const GET_USER = {
  PENDING: "GET_USER_PENDING",
  SUCCESS: "GET_USER_SUCCESS",
  ERROR: "GET_USER_ERROR"
}

const MARKETING = {
  PENDING: "MARKETING_PENDING",
  SUCCESS: "MARKETING_SUCCESS",
  ERROR: "MARKETING_ERROR",
  RESET: "MARKETING_RESET"
};

const SEND_NOTIFICATION_DATA = {
  PENDING: "SEND_NOTIFICATION_DATA_PENDING",
  SUCCESS: "SEND_NOTIFICATION_DATA_SUCCESS",
  ERROR: "SEND_NOTIFICATION_DATA_ERROR"
}

export const FIND_TRIPS_PENDING = 'FIND_TRIPS_PENDING'
export const FIND_TRIPS_SUCCESS = 'FIND_TRIPS_SUCCESS'
export const FIND_TRIPS_ERROR = 'FIND_TRIPS_ERROR'

export const CHANGE_DATE_PENDING = 'CHANGE_DATE_PENDING'
export const CHANGE_DATE_SUCCESS = 'CHANGE_DATE_SUCCESS'
export const CHANGE_DATE_ERROR = 'CHANGE_DATE_ERROR'
export const CHANGE_DATE_RESET = 'CHANGE_DATE_RESET'

export const AVAILABILITY_DATE_PENDING = 'AVAILABILITY_DATE_PENDING'
export const AVAILABILITY_DATE_SUCCESS = 'AVAILABILITY_DATE_SUCCESS'
export const AVAILABILITY_DATE_ERROR = 'AVAILABILITY_DATE_ERROR'
export const GET_CREDITS = {
  PENDING: "GET_CREDITS_PENDING",
  SUCCESS: "GET_CREDITS_SUCCESS",
  ERROR: "GET_CREDITS_ERROR"
};


export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_REQUEST_RESET = 'SEARCH_REQUEST_RESET'
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS'

export const BUSLINE_STOPS = 'BUSLINE_STOPS'
export const BUSLINE_OPERATORS = 'BUSLINE_OPERATORS'
export const BUSLINE_DEP_FILTERS = 'BUSLINE_DEP_FILTERS'
export const BUSLINE_RET_FILTERS = 'BUSLINE_RET_FILTERS'

export const SWAP_DEPARTURE_DESTINATION = 'SWAP_DEPARTURE_DESTINATION'

export const BOOK_PASSENGERS_INFO = 'BOOK_PASSENGERS_INFO'
export const BOOK_DRIVER_TIP = 'BOOK_DRIVER_TIP'
export const BOOK_SELECTED_DEPARTURE_TICKET = 'BOOK_SELECTED_DEPARTURE_TICKET'
export const BOOK_SELECTED_RETURN_TICKET = 'BOOK_SELECTED_RETURN_TICKET'
export const BOOK_SELECTED_RESET_TICKET = 'BOOK_SELECTED_RESET_TICKET'

export const GET_USERS = {
  SUCCESS:"GET_USERS_SUCCESS",
  PENDING:"GET_USERS_PENDING",
  ERROR:"GET_USERS_ERROR"
};

export const GET_INDIVUDAL_USERS = {
  SUCCESS:"GET_INDIVUDAL_USERS_SUCCESS",
  PENDING:"GET_INDIVUDAL_USERS_PENDING",
  ERROR:"GET_INDIVUDAL_USERS_ERROR"
};

export const GET_SEASON_REPORTS_DOWNLOAD = {
  SUCCESS:"GET_SEASON_REPORTS_DOWNLOAD_SUCCESS",
  PENDING:"GET_SEASON_REPORTS_DOWNLOAD_PENDING",
  ERROR:"GET_SEASON_REPORTS_DOWNLOAD_ERROR"
};

export const GET_RIDERSHIP_REPORTS = {
  SUCCESS:"GET_RIDERSHIP_REPORTS_SUCCESS",
  PENDING:"GET_RIDERSHIP_REPORTS_PENDING",
  ERROR:"GET_RIDERSHIP_REPORTS_ERROR"
};

export const GET_PRODUCT = {
  SUCCESS:"GET_PRODUCT_SUCCESS",
  PENDING:"GET_PRODUCT_PENDING",
  ERROR:"GET_PRODUCT_ERROR"
};

export const GET_ONE_PRODUCT = {
  SUCCESS:"GET_ONE_PRODUCT_SUCCESS",
  PENDING:"GET_ONE_PRODUCT_PENDING",
  ERROR:"GET_ONE_PRODUCT_ERROR"
};

export const GET_USER_BY_PARAMS = {
  SUCCESS:"GET_USER_BY_PARAMS_SUCCESS",
  PENDING:"GET_USER_BY_PARAMS_PENDING",
  ERROR:"GET_USER_BY_PARAMS_ERROR"
};

export const SEND_CREDITS_DATA = {
  SUCCESS:"SEND_CREDITS_DATA_SUCCESS",
  PENDING:"SEND_CREDITS_DATA_PENDING",
  ERROR:"SEND_CREDITS_DATA_ERROR"
};

export const MODIFY_USER_TYPE = {
  SUCCESS:"MODIFY_USER_TYPE_SUCCESS",
  PENDING:"MODIFY_USER_TYPE_PENDING",
  ERROR:"MODIFY_USER_TYPE_ERROR"
};

export const GET_USER_DISCOUNT = {
  SUCCESS:"GET_USER_DISCOUNT_SUCCESS",
  PENDING:"GET_USER_DISCOUNT_PENDING",
  ERROR:"GET_USER_DISCOUNT_ERROR"
};

export const GET_OPERATORS = {
  SUCCESS:"GET_OPERATORS_SUCCESS",
  PENDING:"GET_OPERATORS_PENDING",
  ERROR:"GET_OPERATORS_ERROR"
};

export const ADD_DISCOUNT = {
  SUCCESS:"ADD_DISCOUNT_SUCCESS",
  PENDING:"ADD_DISCOUNT_PENDING",
  ERROR:"ADD_DISCOUNT_ERROR"
};

export const DELETE_DISCOUNT = {
  SUCCESS:"DELETE_DISCOUNT_SUCCESS",
  PENDING:"DELETE_DISCOUNT_PENDING",
  ERROR:"DELETE_DISCOUNT_ERROR"
};

export const SEARCH_COMMISSION = {
  SUCCESS:"SEARCH_COMMISSION_SUCCESS",
  PENDING:"SEARCH_COMMISSION_PENDING",
  ERROR:"SEARCH_COMMISSION_ERROR"
};

export const MOUNTAIN_NOTIFICATIONS = {
  SUCCESS:"MOUNTAIN_NOTIFICATIONS_SUCCESS",
  PENDING:"MOUNTAIN_NOTIFICATIONS_PENDING",
  ERROR:"MOUNTAIN_NOTIFICATIONS_ERROR"
};

export const DELETE_MOUNTAIN_NOTIFICATION = {
  SUCCESS:"DELETE_MOUNTAIN_NOTIFICATION_SUCCESS",
  PENDING:"DELETE_MOUNTAIN_NOTIFICATION_PENDING",
  ERROR:"DELETE_MOUNTAIN_NOTIFICATION_ERROR"
};

export const ADD_MOUNTAIN_NOTIFICATION = {
  SUCCESS:"ADD_MOUNTAIN_NOTIFICATION_SUCCESS",
  PENDING:"ADD_MOUNTAIN_NOTIFICATION_PENDING",
  ERROR:"ADD_MOUNTAIN_NOTIFICATION_ERROR"
};

export const UPDATE_MOUNTAIN_NOTIFICATION = {
  SUCCESS:"UPDATE_MOUNTAIN_NOTIFICATION_SUCCESS",
  PENDING:"UPDATE_MOUNTAIN_NOTIFICATION_PENDING",
  ERROR:"UPDATE_MOUNTAIN_NOTIFICATION_ERROR"
};

export const GET_INDIVIDUAL_NOTIFICATION = {
  SUCCESS:"GET_INDIVIDUAL_NOTIFICATION_SUCCESS",
  PENDING:"GET_INDIVIDUAL_NOTIFICATION_PENDING",
  ERROR:"GET_INDIVIDUAL_NOTIFICATION_ERROR"
};

export {
  LOGIN,
  LOGOUT,
  GET_USER,
  MARKETING,
  GET_TICKETS_BY_ID,
  GET_TICKETS,
  GET_REPORTS_DOWNLOAD,
  ISLOGIN,
  TICKET_FORCE_CANCEL,
  RESEND_EMAIL,
  FILTER_TICKETS_BY_ID,
  CANCELL_TICKETS,
  FETCHED_MOUNTAIN,
  SEND_NOTIFICATION_DATA
}