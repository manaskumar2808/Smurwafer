import * as actionTypes from '../action-types';

const initialState = {
    profile: null,
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        case actionTypes.PROFILE_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.PROFILE_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;