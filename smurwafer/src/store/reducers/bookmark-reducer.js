import * as actionTypes from '../action-types';

const initialState = {
    bookmarks: [],
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_BOOKMARKS:
            return {
                ...state,
                bookmarks: action.bookmarks,
            }
        case actionTypes.BOOKMARK_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.BOOKMARK_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;