import {
  GET_TICKETS,
  GET_TICKETS_BY_ID,
  RESEND_EMAIL,
  CANCELL_TICKETS,
  FILTER_TICKETS_BY_ID,
  TICKET_FORCE_CANCEL
} from '../constants'

const defaultState = {
  data: null,
  LastEvaluatedKey: {},
  getDataStatus: null,
  filtered: null,
  filteredData: null,
  userProducts: null,
  filterStatus: null,
  dataById: null,
  selectedMountain: null,
  getDataByIdStatus: null,
  userInfo: null,
  resendEmailStatus: null,
  resendEmailData: null,
  cancellTicketStatus: null,
  tickets: null,
  ticketForceCancelStatus: null
};

const ticketsReducer = (state = defaultState, action) => {
  const { type, payload, user, userProducts, selectedMountain, tickerInformation } = action;
  switch (type) {
    case GET_TICKETS.PENDING:
      return {
        ...state,
        getDataStatus: 'pending'
      };
    case GET_TICKETS.SUCCESS:
      return {
        ...state,
        data: payload.data,
        LastEvaluatedKey: payload.LastEvaluatedKey,
        tickets: action.tickets,
        getDataStatus: 'success'
      };
    case GET_TICKETS.ERROR:
      return {
        ...state,
        getDataStatus: 'error',
        LastEvaluatedKey: {},
        tickets: null,
        data: null
      };
    case GET_TICKETS_BY_ID.PENDING:
      return {
        ...state,
        getDataByIdStatus: 'pending'
      };
    case GET_TICKETS_BY_ID.SUCCESS:
      return {
        ...state,
        dataById: payload,
        getDataByIdStatus: 'success',
        userInfo: user,
        userProducts: userProducts,
        selectedMountain: selectedMountain,
        tickerInformation:tickerInformation
      };
    case GET_TICKETS_BY_ID.ERROR:
      return {
        ...state,
        getDataByIdStatus: 'error',
        dataById: null,
        userInfo: null
      };
    case FILTER_TICKETS_BY_ID.PENDING:
      return {
        ...state,
        filterStatus: 'pending'
      };
    case FILTER_TICKETS_BY_ID.SUCCESS:
      return {
        ...state,
        filteredData: payload,
        filterStatus: 'success',
        tickets: action.tickets,
      };
    case FILTER_TICKETS_BY_ID.ERROR:
      return {
        ...state,
        filterStatus: 'error',
        filteredData: null,
        tickets: null
      };
    case RESEND_EMAIL.PENDING:
      return {
        ...state,
        resendEmailStatus: 'pending'
      };
    case RESEND_EMAIL.SUCCESS:
      return {
        ...state,
        resendEmailStatus: 'success',
        resendEmailData: payload
      };
    case RESEND_EMAIL.ERROR:
      return {
        ...state,
        resendEmailStatus: 'error',
        resendEmailData: null
      };
    case RESEND_EMAIL.RESET:
      return {
        ...state,
        resendEmailStatus: null,
        resendEmailData: null
      }
    case CANCELL_TICKETS.PENDING:
      return {
        ...state,
        cancellTicketStatus: 'pending'
      };
    case CANCELL_TICKETS.SUCCESS:
      return {
        ...state,
        cancellTicketStatus: 'success'
      };
    case CANCELL_TICKETS.ERROR:
      return {
        ...state,
        cancellTicketStatus: 'error',
      };
    case TICKET_FORCE_CANCEL.PENDING:
      return {
        ...state,
        ticketForceCancelStatus: 'pending'
      };
    case TICKET_FORCE_CANCEL.SUCCESS:
      return {
        ...state,
        ticketForceCancelStatus: 'success'
      };
    case TICKET_FORCE_CANCEL.ERROR:
      return {
        ...state,
        ticketForceCancelStatus: 'error',
      };
    default:
      return state;
  }
};

export default ticketsReducer;
