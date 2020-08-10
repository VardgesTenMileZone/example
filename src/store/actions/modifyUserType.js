import { MODIFY_USER_TYPE } from "../constants";
import Http from "../../shared/Http/Http";

export const modifyUserType = (data) => async dispatch => {
    try{
        dispatch({ type: MODIFY_USER_TYPE.PENDING });
        await Http.put(`/admin/users/${data.userId}`, data ,false,false);
        dispatch({ type: MODIFY_USER_TYPE.SUCCESS })
    }
    catch(error){
        dispatch({ type: MODIFY_USER_TYPE.ERROR,error })
    }
};