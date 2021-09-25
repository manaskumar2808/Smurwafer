import * as actionTypes from '../action-types';

const initialState = {
    setting: null,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SETTINGS:
            return {
                ...state,
                setting: action.setting,
            }
        case actionTypes.SETTING_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.SETTING_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;