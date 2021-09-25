import * as actionTypes from '../action-types';
import axios from '../../axios-config';
import { header } from '../../utility/header';

export const fetchBookmarks = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/bookmark', header(token));

            if (response.status !== 200) {
                throw new Error(response.data.message);
            }

            const { bookmarks } = response.data;

            dispatch(setBookmarks(bookmarks));
        } catch (err) {
            dispatch(bookmarkFail(err.message));
        }
    }
}


const setBookmarks = (bookmarks) => {
    return {
        type: actionTypes.SET_BOOKMARKS,
        bookmarks,
    }
}

export const addBookmark = (token, bookmarkData) => {
    return async dispatch => {
        try {
            const response = await axios.post('api/bookmark', bookmarkData, header(token));

            if (response.status !== 201) {
                throw new Error(response.data.message);
            }

            dispatch(bookmarkSuccess());
        } catch (err) {
            console.log(err.message);
            dispatch(bookmarkFail(err.message));
        }
    }
}

export const updateBookmark = (token, id, bookmarkData) => {
    return async dispatch => {
        try {
            const response = await axios.put('api/bookmark/' + id, bookmarkData, header(token));

            if (response.status !== 204) {
                throw new Error(response.data.message);
            }

            dispatch(bookmarkSuccess());
        } catch (err) {
            dispatch(bookmarkFail(err.message));
        }
    }
}

export const deleteBookmark = (token, id) => {
    return async dispatch => {
        try {
            const response = await axios.delete('api/bookmark/' + id, header(token));

            if (response.status !== 202) {
                throw new Error(response.data.message);
            }

            dispatch(bookmarkSuccess());
        } catch (err) {
            dispatch(bookmarkFail(err.message));
        }
    }
}


const bookmarkSuccess = () => {
    return {
        type: actionTypes.BOOKMARK_SUCCESS,
    }
}

const bookmarkFail = (errorMessage) => {
    return {
        type: actionTypes.BOOKMARK_FAIL,
        error: errorMessage,
    }
}