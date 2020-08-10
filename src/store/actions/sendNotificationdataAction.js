import { SEND_NOTIFICATION_DATA } from "../constants"
import Http from "../../shared/Http/Http";

export const SendNotificationData = (data) => async dispatch => {
    try {
        dispatch({type:SEND_NOTIFICATION_DATA.PENDING});
        await Http.post("/admin/passengers/notify",data,false,false);
        dispatch({type:SEND_NOTIFICATION_DATA.SUCCESS})
    }
    catch(error){
        dispatch({type:SEND_NOTIFICATION_DATA.ERROR,error})
    }
}