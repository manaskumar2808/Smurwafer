import * as actionTypes from '../action-types';

const initialState = {
    stories: [],
    userStories: [],
    searchStories: [],
    trending: [],
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STORIES:
            return {
                ...state,
                stories: action.stories,
                error: null,
            }
        case actionTypes.SET_TRENDING:
            return {
                ...state,
                trending: action.trending,
                error: null,
            }
        case actionTypes.SET_USER_STORIES:
            return {
                ...state,
                userStories: action.userStories,
                error: null,
            }
        case actionTypes.STORY_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.STORY_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;