import { FETCHED_MOUNTAIN } from "../constants"
import Http from "../../shared/Http/Http";

export const FetchedMountain = () => async dispatch => {
    try {
        dispatch({ type: FETCHED_MOUNTAIN.PENDING });
        const data = await Http.get(`/mountains`);
        dispatch({type: FETCHED_MOUNTAIN.SUCCESS, payload:data})
    }
    catch(error){
        console.log("errrt",error.response)
        debugger
        dispatch({type:FETCHED_MOUNTAIN.ERROR, error})
    }
};