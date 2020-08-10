import Http from "../../shared/Http/Http";
import { GET_USERS } from "../constants";

export const getUsers = (data) => async dispatch => {
    try{
        dispatch({ type: GET_USERS.PENDING });
        const usersData = await Http.post("/admin/users",data);
        dispatch({ type: GET_USERS.SUCCESS,usersData:usersData.data.result })
    }
    catch(error){
        dispatch({ type: GET_USERS.ERROR,error })
    }
};