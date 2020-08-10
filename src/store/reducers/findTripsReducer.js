import {
  FIND_TRIPS_PENDING,
  FIND_TRIPS_SUCCESS,
  FIND_TRIPS_ERROR,
  CHANGE_DATE_PENDING,
  CHANGE_DATE_SUCCESS,
  CHANGE_DATE_ERROR,
  CHANGE_DATE_RESET,
  AVAILABILITY_DATE_PENDING,
  AVAILABILITY_DATE_SUCCESS,
  AVAILABILITY_DATE_ERROR,
  GET_USERS,
  GET_INDIVUDAL_USERS, GET_USER_BY_PARAMS,
  SEND_CREDITS_DATA, MODIFY_USER_TYPE,
  DELETE_DISCOUNT
} from "../constants";

const initialState = {
  data: null,
  pending: false,
  error: false,
  changeAvailability: null,
  changeAvailabilityPending: false,
  changeAvailabilityError: false,
  availabilityData: null,
  availabilityPending: false,
  availabilityError: false,
}

const ACTION_HANDLERS = {
  [FIND_TRIPS_PENDING]: state => ({
    ...state,
    pending: true
  }),
  [FIND_TRIPS_SUCCESS]: (state, {data}) => ({
    ...state,
    data: data,
    pending: false
  }),
  [FIND_TRIPS_ERROR]: (state) => ({
    ...state,
    data: null,
    pending: false,
    error: state.error
  }),
  [CHANGE_DATE_PENDING]: state => ({
    ...state,
    changeAvailabilityPending: true
  }),
  [CHANGE_DATE_SUCCESS]: (state, {data}) => ({
    ...state,
    changeAvailability: data,
    changeAvailabilityPending: false
  }),
  [CHANGE_DATE_ERROR]: (state, {error}) => ({
    ...state,
    changeAvailability: null,
    changeAvailabilityPending: false,
    changeAvailabilityError: error
  }),

  [CHANGE_DATE_RESET]: state => ({
    ...state,
    changeAvailability: null,
    changeAvailabilityPending: false,
    changeAvailabilityError: false
  }),

  [AVAILABILITY_DATE_PENDING]: state => ({
    ...state,
    availabilityPending: true
  }),
  [AVAILABILITY_DATE_SUCCESS]: (state, {data}) => ({
    ...state,
    availabilityData: data,
    availabilityPending: false
  }),
  [AVAILABILITY_DATE_ERROR]: (state, {error}) => ({
    ...state,
    availabilityData: null,
    availabilityPending: false,
    availabilityError: error
  }),
  [GET_USERS.PENDING]: (state) => ({
    ...state,
    pending: true
  }),
  [GET_USERS.SUCCESS]: (state, {usersData}) => ({
    ...state,
    usersData,
    individualUserSearch:false,
    pending:false
  }),
  [GET_USERS.ERROR]: (state, {error}) => ({
    ...state,
    error
  }),
  [GET_INDIVUDAL_USERS.PENDING]: (state) => ({
    ...state,
    pending: true
  }),
  [GET_INDIVUDAL_USERS.SUCCESS]: (state, {individualUser}) => ({
    ...state,
    individualUser,
    pending:false
  }),
  [GET_INDIVUDAL_USERS.ERROR]: (state, {error}) => ({
    ...state,
    error
  }),
  [GET_USER_BY_PARAMS.PENDING]: (state) => ({
    ...state,
    pending:true
  }),
  [GET_USER_BY_PARAMS.SUCCESS]: (state, {usersData}) => ({
    ...state,
    usersData,
    pending:false,
    individualUserSearch:true
  }),
  [GET_USER_BY_PARAMS.ERROR]: (state, {error}) => ({
    ...state,
    pending:false,
    error
  }),
  [SEND_CREDITS_DATA.PENDING]: (state) => ({
    ...state,
    pending:true,
    success:false
  }),
  [SEND_CREDITS_DATA.SUCCESS]: (state) => ({
    ...state,
  pending:false,
  success:"You have successfully add credits"
  }),
  [SEND_CREDITS_DATA.ERROR]: (state,{error}) => ({
    ...state,
    pending:false,
    error
  }),
  [MODIFY_USER_TYPE.PENDING]: (state,{error}) => ({
  ...state,
  pending:true,
  }),
  [MODIFY_USER_TYPE.SUCCESS]: (state) => ({
    ...state,
    pending:false,
    success:"You have successfully modify a user",
    modifyUser:true
  }),
  [MODIFY_USER_TYPE.ERROR]: (state,{error}) => ({
    ...state,
    pending:false,
    error
  }),
  [DELETE_DISCOUNT.PENDING]: (state) => ({
    ...state,
    pending: true
  }),
  [DELETE_DISCOUNT.SUCCESS]: (state) => ({
    ...state,
    pending: false,
    success:"You have successfully delete discount"
  }),
  [DELETE_DISCOUNT.ERROR]: (state) => ({
    ...state,
    pending: false
  })
}


export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
