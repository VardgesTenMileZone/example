import { ADD_DISCOUNT } from "../constants";
import Http from "../../shared/Http/Http";

export const addDiscount = (data) => async dispatch => {
    try{
        dispatch({ type: ADD_DISCOUNT.PENDING });
        await Http.post("/admin/users/discounts",data);
        dispatch({ type: ADD_DISCOUNT.SUCCESS })
    }
    catch(error){
        dispatch({ type: ADD_DISCOUNT.ERROR, error })
    }
};