import { GET_INDIVUDAL_USERS } from "../constants/index"
import Http from "../../shared/Http/Http";

export const getIndividualUser = (userId) => async dispatch => {
    try{
        dispatch({ type:GET_INDIVUDAL_USERS.PENDING });
        const individualUser = await Http.get(`/admin/users/${userId}`);
        dispatch({ type:GET_INDIVUDAL_USERS.SUCCESS,individualUser: individualUser.data.result })
    }
    catch (error) {
        dispatch({ type:GET_INDIVUDAL_USERS.ERROR,error })
    }
};