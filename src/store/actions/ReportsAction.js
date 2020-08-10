import { GET_REPORTS_DOWNLOAD, GET_SEASON_REPORTS_DOWNLOAD, GET_RIDERSHIP_REPORTS } from '../constants';
import http from '../../shared/Http/Http';

export const reportGetDownload = body => async (dispatch, currentState) => {
    try {
        dispatch({ type: GET_REPORTS_DOWNLOAD.PENDING });
        const response = await http.post(`/admin/generateFile`, body, currentState, false, false)
        dispatch({ type: GET_REPORTS_DOWNLOAD.SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_REPORTS_DOWNLOAD.ERROR });
    }
};

export const seasonReportGetDownload = () => async (dispatch, currentState) => {
    try {
        dispatch({ type: GET_SEASON_REPORTS_DOWNLOAD.PENDING });
        const response = await http.get(`/admin/season/reports`, currentState, false, false)
        dispatch({ type: GET_SEASON_REPORTS_DOWNLOAD.SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_SEASON_REPORTS_DOWNLOAD.ERROR });
    }
};

export const getRidershipReports = () => async (dispatch, currentState) => {
    try {
        dispatch({ type: GET_RIDERSHIP_REPORTS.PENDING });
        const response = await http.get(`/admin/snowbus/season/reports`, currentState, false, false);
        dispatch({ type: GET_RIDERSHIP_REPORTS.SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_RIDERSHIP_REPORTS.ERROR });
    }
};
