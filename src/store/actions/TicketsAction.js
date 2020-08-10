import {
    GET_TICKETS,
    GET_TICKETS_BY_ID,
    RESEND_EMAIL,
    TICKET_FORCE_CANCEL,
    FILTER_TICKETS_BY_ID,
    CANCELL_TICKETS
} from '../constants';
import http from '../../shared/Http/Http';

export const getTickets = ({ LastEvaluatedKey }) => async (dispatch) => {
    try {
        dispatch({ type: GET_TICKETS.PENDING });
        const res = await http.post(`/admin/tickets`, LastEvaluatedKey, false, false, false);
        dispatch({ type: GET_TICKETS.SUCCESS, tickets: res, payload: { data: sortTickets(res), LastEvaluatedKey: res.data.tickets.LastEvaluatedKey } })
    } catch (error) {
        dispatch({ type: GET_TICKETS.ERROR, error });
    }
};

export const filterTickets = ({ val, type }) => async (dispatch) => {
    try {
        dispatch({ type: FILTER_TICKETS_BY_ID.PENDING });
        const res = await http.post(`/admin/tickets`, {
            search: {
                type: type === 'email' ? 'baseEmail' : type === 'lastName' ? 'baseLastName' : type === 'confirmationCode' && 'confirmationNumber',
                value: val
            },
        }, false, false, false);
        dispatch({ type: FILTER_TICKETS_BY_ID.SUCCESS, tickets: res, payload: { data: sortTickets(res), LastEvaluatedKey: res.data.tickets.LastEvaluatedKey } })
    } catch (error) {
        dispatch({ type: FILTER_TICKETS_BY_ID.ERROR });
    }
};

export const getTicketsById = id => async (dispatch, currentState) => {
    try {
        dispatch({ type: GET_TICKETS_BY_ID.PENDING });
        const response = await http.get(`/admin/tickets/${id}`, currentState, false, false);
        dispatch({ type: GET_TICKETS_BY_ID.SUCCESS, selectedMountain: response.data.selectedMountain, payload: response.data.ticket, tickerInformation: response.data, userProducts: response.data.commonExtras,  user: response.data.userDetails })
    } catch (error) {
        dispatch({ type: GET_TICKETS_BY_ID.ERROR });
    }
};

export const sortTickets = res => {
    let data = [];
    res.data.tickets.Items.map((item, index) => {
        if(index === 20){
            return false;
        }
        if (item) {
            let action = [];

            if (item.status && item.status.toLowerCase() !== 'failed' && item.status.toLowerCase() !== 'cancelled') {
                action = [{
                    name: 'View',
                    id: item.uuid
                },
                {
                    name: 'Modify',
                    id: item.uuid
                },
                {
                    name: 'Cancell',
                    id: item.uuid
                },
                {
                    name: 'Resend Email',
                    id: item.uuid
                }]
            } else {
                action = [{
                    name: 'View',
                    id: item.uuid
                }]
            }
            data.push({
                // key: index,
                member: item.userId ? 'yes' : 'no',
                fullName: item.passengers[0].firstName + ' ' + item.passengers[0].lastName,
                email: item.baseEmail,
                paymentType: item.snowPass ? 'SnowPass' : item.useCredits ? 'Credit' : 'Credit Card',
                date: item.date,
                cancellable: item.cancellable,
                uuid: item.uuid,
                adult: item.adult,
                confCode: item.confirmationNumber,
                stripeAmount: item.amountForStripe ? `$${parseFloat(item.amountForStripe / 100).toFixed(2)}` : '',
                status: item.status ? item.status.toLowerCase() : 'Not Found',
                action: action
            })
        }
    });

    return data;
};

export const resendEmail = id => async (dispatch) => {
    try {
        dispatch({ type: RESEND_EMAIL.PENDING });
        const res = await http.post(`/admin/bookingMessage`, {uuid: id}, false, false, false);
        dispatch({ type: RESEND_EMAIL.SUCCESS, payload: res });
    } catch (error) {
        dispatch({ type: RESEND_EMAIL.ERROR, error: error })
    }
};

export const resendEmailReset = id => async (dispatch) => {
    dispatch({ type: RESEND_EMAIL.RESET })
};

export const ticketCancellation = data => async dispatch => {
    try {
        dispatch({ type: CANCELL_TICKETS.PENDING });
        const response = await http.post(`/admin/cancelTicketMessage`, data, false, false, false);
        dispatch({ type: CANCELL_TICKETS.SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CANCELL_TICKETS.ERROR });
    }
};

export const ticketForceCancel = data => async dispatch => {
    try {
        dispatch({ type: TICKET_FORCE_CANCEL.PENDING });
        await http.post(`/admin/forceCancelTicketMessage`, data, false, false, false);
        dispatch({ type: TICKET_FORCE_CANCEL.SUCCESS });
    } catch (error) {
        dispatch({ type: TICKET_FORCE_CANCEL.ERROR });
    }
};
