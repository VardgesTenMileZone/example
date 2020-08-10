import { GET_PRODUCT, GET_ONE_PRODUCT } from "../constants";
import http from '../../shared/Http/Http';
import moment from 'moment';

const filterProductsByTable = data => {
    const body = [];

    data.result.Items.map(item => {
        body.push({
            key: item.id,
            fullName: item.baseFirstName + ' ' + item.baseLastName,
            email: item.baseEmail,
            date: moment(item.createdAt).format('DD.MM.YYYY HH:mm'),
            stripeAmount: item.totalAmount ? `$${parseFloat(item.totalAmount / 100).toFixed(2)}` : '',
            member: item.userId ? 'yes' : 'no',
            action: [
                {
                    name: 'View',
                    id: item.id
                }
            ]
        })
    })

    return body;
}
  
export const getProducts = (body, infinite) => async (dispatch, currentState) => {
    try {
        dispatch({ type: GET_PRODUCT.PENDING });
        const response = await http.post(`/admin/extras/transactions`, body, currentState, false, false);
        dispatch({ type: GET_PRODUCT.SUCCESS, payload: { data: filterProductsByTable(response.data), lastEvaluatedKey: response.data.LastEvaluatedKey || null, infinite: infinite || false } })
    } catch (error) {
        dispatch({ type: GET_PRODUCT.ERROR });
    }
};
  
export const getOneProducts = id => async (dispatch, currentState) => {
    try {
        dispatch({ type: GET_ONE_PRODUCT.PENDING });
        const response = await http.get(`/admin/extras/transactions/${id}`, currentState, false, false);
        dispatch({ type: GET_ONE_PRODUCT.SUCCESS, payload: response.data })
    } catch (error) {
        dispatch({ type: GET_ONE_PRODUCT.ERROR });
    }
};