import { FETCHED_MOUNTAIN, SEND_NOTIFICATION_DATA, GET_OPERATORS, ADD_DISCOUNT, GET_USER_DISCOUNT } from "../constants";

const defaultState = {
    pending:false,
    userDiscount:[]
};

const notificationsReducer = (state = defaultState, action) => {
    const { type, payload, error } = action;

    switch (type) {
        case FETCHED_MOUNTAIN.PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCHED_MOUNTAIN.SUCCESS:
            return {
                ...state,
                mountainsListData:payload.data,
                pending:false
            };
        case FETCHED_MOUNTAIN.ERROR:
            return {
                ...state,
                error:error,
                pending:false
            };
        case SEND_NOTIFICATION_DATA.PENDING:
            return {
                ...state,
                pending:true
            };
        case SEND_NOTIFICATION_DATA.SUCCESS:
            return {
                ...state,
                pending:false,
                notificationDataSuccess:true
            };
        case SEND_NOTIFICATION_DATA.ERROR:
            return {
                ...state,
                pending:false,
                notificationDataSuccess:false
            };
        case GET_OPERATORS.PENDING:
            return {
                ...state,
                pending: true
            };
        case GET_OPERATORS.SUCCESS:
            return {
                ...state,
                operatorsData: payload,
                pending: false
            };
        case GET_OPERATORS.ERROR:
            return {
                ...state,
                error,
                pending: false
            };
        case ADD_DISCOUNT.PENDING:
            return {
                ...state,
                pending:true
            };
        case ADD_DISCOUNT.SUCCESS:
            return {
                ...state,
                pending:false,
                success:"You have successfully add discount"
            };
        case ADD_DISCOUNT.ERROR:
            return {
                ...state,
                pending: false,
                error
            };
        case GET_USER_DISCOUNT.PENDING:
            return {
                ...state,
                pending:true
            };
        case GET_USER_DISCOUNT.SUCCESS:
            return {
                ...state,
                userDiscount: payload,
                pending: false
            };
        case GET_USER_DISCOUNT.ERROR:
            return {
                ...state,
                pending: false,
                error
            };
        default:
            return state;
    }
};

export default notificationsReducer