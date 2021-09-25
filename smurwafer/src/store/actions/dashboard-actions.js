import * as actionTypes from '../action-types';
import axios from '../../axios-config';
import { header } from '../../utility/header';

export const fetchDashboard = (token, id) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/dashboard/' + id, header(token));
            const { dashboard, casinoData } = response.data;
            dispatch(setDashboard(dashboard, casinoData));
        } catch (err) {
            dispatch(dashboardFail(err.response.data.message));
            throw err;
        }
    }
}

const setDashboard = (dashboard, casinoData) => {
    return {
        type: actionTypes.SET_DASHBOARD,
        dashboard,
        casinoData,
    }
}

export const fetchLeaderboard = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/dashboard', header(token));
            const { leaderboard } = response.data;
            dispatch(setLeaderboard(leaderboard));
        } catch (err) {
            dispatch(dashboardFail(err.response.data.message));
            throw err;
        }
    }
}

const setLeaderboard = (leaderboard) => {
    return {
        type: actionTypes.SET_LEADERBOARD,
        leaderboard,
    }
}

export const deleteDashboard = (token, id) => {
    return async dispatch => {
        try {
            await axios.delete('api/dashboard/' + id, header(token));
            dispatch(dashboardSuccess());
        } catch (err) {
            dispatch(dashboardFail(err.response.data.message));
            throw err;
        }
    }
}

const dashboardSuccess = () => {
    return {
        type: actionTypes.DASHBOARD_SUCCESS,
    }
}

const dashboardFail = (errorMessage) => {
    return {
        type: actionTypes.DASHBOARD_FAIL,
        error: errorMessage,
    }
}