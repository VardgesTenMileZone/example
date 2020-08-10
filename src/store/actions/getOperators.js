import { GET_OPERATORS } from "../constants";
import Http from "../../shared/Http/Http";

export const getOperators = (operator) => async dispatch =>{
    try{
        dispatch({ type: GET_OPERATORS.PENDING });
        const operatorsData = await Http.get(`/operators/${operator}`);
        dispatch({ type: GET_OPERATORS.SUCCESS, payload: operatorsData.data.operators });
    }
    catch(error){
        dispatch({ type: GET_OPERATORS.ERROR, error });
    }
};