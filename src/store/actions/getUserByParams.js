import { GET_USER_BY_PARAMS } from "../constants/index"
import Http from "../../shared/Http/Http";

export const getUserByParams = ( searchdata ) => async dispatch => {
    try{
        dispatch({ type: GET_USER_BY_PARAMS.PENDING });
        const usersData = await Http.post("/admin/users",{search:searchdata});
        dispatch({ type: GET_USER_BY_PARAMS.SUCCESS, usersData:usersData.data.result.Items });
    }
    catch(error){
        dispatch({ type: GET_USER_BY_PARAMS.ERROR,error });
    }
};