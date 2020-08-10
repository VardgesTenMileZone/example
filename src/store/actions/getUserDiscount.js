import { GET_USER_DISCOUNT } from "../constants";
import Http from "../../shared/Http/Http";

export const getUserDiscount = (id) => async dispatch => {
    try{
        dispatch({ type: GET_USER_DISCOUNT.PENDING });
        const userDiscount = await Http.get(`/admin/users/${id}/discounts`);
        dispatch({ type: GET_USER_DISCOUNT.SUCCESS, payload: userDiscount.data.result})
    }
    catch(error){
        dispatch({ type: GET_USER_DISCOUNT.ERROR,error })
    }
};