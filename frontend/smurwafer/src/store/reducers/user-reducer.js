import * as actionTypes from '../action-types';

const initialState = {
    users: [],
    onlineUsers: [],
    currentUser: null,
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case actionTypes.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineUsers,
            }
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser,
            }
        case actionTypes.USER_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.USER_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;