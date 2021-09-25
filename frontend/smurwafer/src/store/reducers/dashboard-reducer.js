import * as actionTypes from '../action-types';

const initialState = {
    dashboard: null,
    casinoData: [],
    leaderboard: [],
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_DASHBOARD:
            return {
                ...state,
                dashboard: action.dashboard,
                casinoData: action.casinoData,
            }
        case actionTypes.SET_LEADERBOARD:
            return {
                ...state,
                leaderboard: action.leaderboard,
            }
        case actionTypes.DASHBOARD_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.DASHBOARD_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;