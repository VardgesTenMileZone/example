

import { LOGIN, LOGOUT, ISLOGIN } from '../constants'

const defaultState = {
  loginStatus: null,
  data: null,
  loginError: null,
  logoutStatus: null,
  loggedIn: false
};

const authReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN.PENDING:
      return {
        ...state,
        data: null,
        loginStatus: 'pending',
        loginError: null
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        data: payload,
        loginStatus: 'success',
        loginError: null
      };
    case LOGIN.ERROR:
      return {
        ...state,
        loginStatus: 'error',
        loginError: action.error,
        data: null
      };
    case LOGOUT.PENDING:
      return {
        ...state,
        logoutStatus: 'pending'
      };
    case LOGOUT.SUCCESS:
      return {
        loginStatus: null,
        data: null,
        loginError: null,
        logoutStatus: 'success',
      };
    case ISLOGIN.PENDING:
      return {
        ...state,
        loggedIn: false
      };
    case ISLOGIN.SUCCESS:
      return {
        ...state,
        loggedIn: true
      };
    case ISLOGIN.ERROR:
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
};

export default authReducer;