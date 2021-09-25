import * as actionTypes from '../action-types';
import axios from '../../axios-config';
import { header } from '../../utility/header';

export const fetchReports = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/report', header(token));

            if (response.status !== 200) {
                throw new Error(response.data.message);
            }

            const { reports } = response.data;

            dispatch(setReports(reports));
        } catch (err) {
            dispatch(reportFail(err.message));
        }
    }
}

const setReports = (reports) => {
    return {
        type: actionTypes.SET_REPORTS,
        reports,
    }
}

export const addReport = (token, reportData) => {
    return async dispatch => {
        try {
            const response = await axios.post('api/report', reportData, header(token));

            if (response.status !== 201) {
                throw new Error(response.data.message);
            }

            dispatch(reportSuccess());
        } catch (err) {
            dispatch(reportFail(err.message));
        }
    }
}

export const deleteReport = (token, id) => {
    return async dispatch => {
        try {
            const response = await axios.delete('api/report/' + id, header(token));

            if (response.status !== 202) {
                throw new Error(response.data.message);
            }

            dispatch(reportSuccess());
        } catch (err) {
            dispatch(reportFail(err.message));
        }
    }
}

const reportSuccess = () => {
    return {
        type: actionTypes.REPORT_SUCCESS,
    }
}

const reportFail = (errorMessage) => {
    return {
        type: actionTypes.REPORT_FAIL,
        error: errorMessage,
    }
}