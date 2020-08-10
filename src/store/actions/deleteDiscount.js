import {
    DELETE_DISCOUNT,
    MOUNTAIN_NOTIFICATIONS,
    DELETE_MOUNTAIN_NOTIFICATION,
    ADD_MOUNTAIN_NOTIFICATION,
    UPDATE_MOUNTAIN_NOTIFICATION,
    GET_INDIVIDUAL_NOTIFICATION
} from "../constants";
import Http from "../../shared/Http/Http";

export const deleteDiscount = (id) => async dispatch => {
    try{
        dispatch({ type: DELETE_DISCOUNT.PENDING });
        await Http.delete(`/admin/users/discounts/${id}`);
        dispatch({ type: DELETE_DISCOUNT.SUCCESS });
    }
    catch(error){
        dispatch({ type: DELETE_DISCOUNT.ERROR, error })
    }
};

export const mountainNotifications = (data) => async dispatch => {
    try{
        dispatch({ type: MOUNTAIN_NOTIFICATIONS.PENDING });
        const response = await Http.post("/admin/notifications/list",data);
        dispatch({ type: MOUNTAIN_NOTIFICATIONS.SUCCESS, mountainNotification: response.data.result });
    } catch(error) {
        dispatch({ type: MOUNTAIN_NOTIFICATIONS.ERROR, error: error.response.data.body })
    }
};

export const deleteMountainNotification = (id) => async dispatch => {
    try{
        dispatch({ type: DELETE_MOUNTAIN_NOTIFICATION.PENDING });
        await Http.delete(`/admin/notifications/${id}`);
        dispatch({ type: DELETE_MOUNTAIN_NOTIFICATION.SUCCESS, success: "You have Successfully delete notification" });
    } catch(error) {
        dispatch({ type: DELETE_MOUNTAIN_NOTIFICATION.ERROR, error: error.response.data.body })
    }
};

export const addMountainNotification = (data) => async dispatch => {
    try{
        dispatch({ type: ADD_MOUNTAIN_NOTIFICATION.PENDING });
        await Http.post(`/admin/notifications`,data);
        dispatch({ type: ADD_MOUNTAIN_NOTIFICATION.SUCCESS, success: "You have Successfully add notification" });
    } catch(error) {
        dispatch({ type: ADD_MOUNTAIN_NOTIFICATION.ERROR, error: error.response.data.body })
    }
};

export const getIndividualNotification = (id) => async dispatch => {
    try{
        dispatch({ type: GET_INDIVIDUAL_NOTIFICATION.PENDING });
        const response = await Http.get(`/admin/notifications/${id}`);
        dispatch({ type: GET_INDIVIDUAL_NOTIFICATION.SUCCESS, individualNotification: response.data.result });
    } catch(error){
        dispatch({ type: GET_INDIVIDUAL_NOTIFICATION.ERROR, error: error.response.data.body });
    }
};

export const updateNotification  = (data) => async dispatch => {
    try{
        dispatch({ type: UPDATE_MOUNTAIN_NOTIFICATION.PENDING });
        await Http.put("/admin/notifications",data);
        dispatch({ type: UPDATE_MOUNTAIN_NOTIFICATION.SUCCESS, success: "You have Successfully update notification" });
    } catch(error){
        dispatch({ type: UPDATE_MOUNTAIN_NOTIFICATION.ERROR, error: error.response.data.body });
    }
};