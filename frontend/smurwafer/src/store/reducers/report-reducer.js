import * as actionTypes from '../action-types';

const initialState = {
    reports: [],
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_REPORTS:
            return {
                ...state,
                reports: action.reports,
            }
        case actionTypes.REPORT_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.REPORT_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;