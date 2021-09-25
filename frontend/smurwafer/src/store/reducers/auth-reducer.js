import * as actionTypes from '../action-types';

const initialState = {
    token: null,
    id: null,
    expiryDate: null,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                id: action.id,
                expiryDate: action.expiryDate,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                token: null,
                id: null,
                expiryDate: null,
                error: action.error,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                id: null,
                expiryDate: null,
                error: null,
            }
        default:
            return state;
    }
}

export default reducer;