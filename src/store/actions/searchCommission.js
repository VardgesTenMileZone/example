import { SEARCH_COMMISSION} from "../constants";
import Http from "../../shared/Http/Http";

export const searchCommissionAction = (date) => async dispatch => {
    try{
        dispatch({ type: SEARCH_COMMISSION.PENDING });
        const commission = await Http.post("/admin/users/commissions",date);
        dispatch({ type: SEARCH_COMMISSION.SUCCESS, payload: commission })
    }
    catch(error){
        dispatch({ type: SEARCH_COMMISSION.ERROR, error: error && error.response  ? error.response.data.message : '' })
    }
};