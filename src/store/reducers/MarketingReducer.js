
import {
    MARKETING,
    SEARCH_COMMISSION
} from '../constants'

const defaultState = {
    data: null,
    reportsStatus: null,
    error: null
};

const marketingReducer = (state = defaultState, action) => {
    const { type, payload, error } = action;

    switch (type) {
        case MARKETING.PENDING:
            return {
                ...state,
                reportsStatus: 'pending',
                data: null,
                error: null
            };
        case MARKETING.SUCCESS:
            return {
                ...state,
                data: payload,
                reportsStatus: 'success'
            };
        case MARKETING.ERROR:
            return {
                ...state,
                reportsStatus: 'error',
                data: null,
                error: error
            };
        case SEARCH_COMMISSION.PENDING:
            return {
                ...state,
                pending:true
            };
        case SEARCH_COMMISSION.SUCCESS:
            return {
                ...state,
                pending: false,
                commission: payload
            };
        case SEARCH_COMMISSION.ERROR:
            return {
                ...state,
                pending: false,
                error
            };
        default:
            return state;
    }
};

export default marketingReducer;