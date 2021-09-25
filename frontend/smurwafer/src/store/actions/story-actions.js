import axios from '../../axios-config';
import * as actionTypes from '../action-types';
import { header } from '../../utility/header';

export const fetchStories = (token, page = 1) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/story?page=' + page, header(token));
            const { stories } = response.data;
            dispatch(setStories(stories));
        } catch (err) {
            dispatch(storyFail(err.response.data.message));
            throw err;
        }
    }
}

export const fetchTrending = (token, page = 1) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/trending?page=' + page, header(token));
            const { trending } = response.data;
            dispatch(setTrending(trending));
        } catch (err) {
            dispatch(storyFail(err.response.data.message));
            throw err;
        }
    }
}

export const fetchTagStories = (token, hashtag, page = 1) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/story?hashtag=' + hashtag + '&page=' + page, header(token));
            const { stories } = response.data;
            dispatch(setStories(stories));
        } catch (err) {
            dispatch(storyFail(err.response.data.message));
            throw err;
        }
    }
}

export const fetchTagTrending = (token, hashtag, page = 1) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/trending?hashtag=' + hashtag + '&page=' + page, header(token));
            const { trending } = response.data;
            dispatch(setTrending(trending));
        } catch (err) {
            dispatch(storyFail(err.response.data.message));
            throw err;
        }
    }
}

export const fetchUserStories = (token, id, page = 1) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/story?author=' + id + '&page=' + page, header(token));
            const { stories } = response.data;
            dispatch(setUserStories(stories));
        } catch (err) {
            dispatch(storyFail(err.response.data.message));
            throw err;
        }
    }
}

export const displaySearchResults = (results) => {
    return dispatch => {
        dispatch(setSearchStories(results));
    }
}

const setStories = (stories) => {
    const loadedStories = [];

    for (let key in stories) {
        loadedStories.push(stories[key]);
    }

    return {
        type: actionTypes.SET_STORIES,
        stories: loadedStories,
    }
}

const setTrending = (trending) => {
    return {
        type: actionTypes.SET_TRENDING,
        trending,
    }
}

const setUserStories = (stories) => {
    const loadedStories = [];

    for (let key in stories) {
        loadedStories.push(stories[key]);
    }

    return {
        type: actionTypes.SET_USER_STORIES,
        userStories: loadedStories,
    }
}

const setSearchStories = (searchStories) => {
    const loadedStories = [];

    for (let key in searchStories) {
        loadedStories.push(searchStories[key].item);
    }

    return {
        type: actionTypes.SET_SEARCH_STORIES,
        searchStories: loadedStories,
    }
}

export const postStory = (token, storyData) => {
    return async dispatch => {
        try {
            await axios.post('api/story', storyData, header(token));
            dispatch(storySuccess());
        } catch (err) {
            dispatch(storyFail(err.response.data.message));
            throw err;
        }
    }
}

export const updateStory = (token, id, storyData) => {
    return async dispatch => {
        try {
            await axios.put('api/story/' + id, storyData, header(token));
            dispatch(storySuccess());
        } catch (err) {
            dispatch(storyFail(err.response.data.message));
            throw err;
        }
    }
}

export const deleteStory = (token, id) => {
    return async dispatch => {
        try {
            await axios.delete('api/story/' + id, header(token));
            dispatch(storySuccess());
        } catch (err) {
            dispatch(storyFail(err.response.data.message));
            throw err;
        }
    }
}

const storySuccess = () => {
    return {
        type: actionTypes.STORY_SUCCESS,
    }
}

const storyFail = (errorMessage) => {
    return {
        type: actionTypes.STORY_FAIL,
        error: errorMessage,
    }
}