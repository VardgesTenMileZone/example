import {
  FIND_TRIPS_PENDING,
  FIND_TRIPS_SUCCESS,
  FIND_TRIPS_ERROR,
  CHANGE_DATE_PENDING,
  CHANGE_DATE_SUCCESS,
  CHANGE_DATE_ERROR,
  AVAILABILITY_DATE_PENDING,
  AVAILABILITY_DATE_SUCCESS,
  CHANGE_DATE_RESET,
  AVAILABILITY_DATE_ERROR,
} from "../constants";
import Http from '../../shared/Http/Http';

export function findTrips(data){
  return async (dispatch, currentState) => {
    dispatch({ type: FIND_TRIPS_PENDING });
    const url = '/my-trips';
    Http.post(url, data, currentState, false, false)
      .then(response => {
        dispatch({ type: FIND_TRIPS_SUCCESS, data: response.data });
      })
      .catch((error) => {
          dispatch({ type: FIND_TRIPS_ERROR, error });
      });
  };
}

export const setResetChangeDates = () => ({
  type: CHANGE_DATE_RESET
});

export function changeDateofTrip(data){
  return async (dispatch, currentState) => {
    dispatch({ type: CHANGE_DATE_PENDING });
    const url = '/change-ticket-availablity';
    Http.post(url, data, currentState, false, false)
      .then(response => {
        dispatch({ type: CHANGE_DATE_SUCCESS, data: response.data });
      })
      .catch((error) => {
          dispatch({ type: CHANGE_DATE_ERROR, error });
      });
  };
}

export function availabilityDateofTrip(data){
  return async (dispatch, currentState) => {
    dispatch({ type: AVAILABILITY_DATE_PENDING });
    const url = '/change-ticket';
    Http.post(url, data, currentState, false, false)
      .then(response => {
        dispatch({ type: AVAILABILITY_DATE_SUCCESS, data: response.data });
      })
      .catch((error) => {
          dispatch({ type: AVAILABILITY_DATE_ERROR, error });
      });
  };
}
