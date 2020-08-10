import { SEND_CREDITS_DATA } from "../constants";
import Http from "../../shared/Http/Http";

export const sendCreditsData = (data) => async dispatch => {
    try{
        dispatch({ type: SEND_CREDITS_DATA.PENDING });
        await Http.post("/admin/users/add-credits",data);
        dispatch({ type: SEND_CREDITS_DATA.SUCCESS })
    }
    catch(error){
        dispatch({ type: SEND_CREDITS_DATA.ERROR,error  })
    }
};