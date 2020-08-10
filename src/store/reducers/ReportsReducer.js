

import {
    GET_REPORTS_DOWNLOAD,
    GET_SEASON_REPORTS_DOWNLOAD,
    GET_RIDERSHIP_REPORTS
} from '../constants'

const defaultState = {
    data: null,
    reportsStatus: null,
    seasonReportStatus: null,
    seasonReportData: null,
    ridershipReportsData: null,
    ridershipReportsStatus: null,
};

const reportsReducer = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_REPORTS_DOWNLOAD.PENDING:
            return {
                ...state,
                reportsStatus: 'pending'
            };
        case GET_REPORTS_DOWNLOAD.SUCCESS:
            return {
                ...state,
                data: payload,
                reportsStatus: 'success'
            };
        case GET_REPORTS_DOWNLOAD.ERROR:
            return {
                ...state,
                reportsStatus: 'error',
            };
        case GET_SEASON_REPORTS_DOWNLOAD.PENDING:
            return {
                ...state,
                seasonReportStatus: 'pending'
            };
        case GET_SEASON_REPORTS_DOWNLOAD.SUCCESS:
            return {
                ...state,
                seasonReportData: payload,
                seasonReportStatus: 'success'
            };
        case GET_SEASON_REPORTS_DOWNLOAD.ERROR:
            return {
                ...state,
                seasonReportStatus: 'error',
            };
        case GET_RIDERSHIP_REPORTS.PENDING:
            return {
                ...state,
                ridershipReportsStatus: 'pending'
            };
        case GET_RIDERSHIP_REPORTS.SUCCESS:
            return {
                ...state,
                ridershipReportsData: payload,
                ridershipReportsStatus: 'success'
            };
        case GET_RIDERSHIP_REPORTS.ERROR:
            return {
                ...state,
                ridershipReportsStatus: 'error',
            };
        default:
            return state;
    }
};

export default reportsReducer;