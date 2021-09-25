import axios from '../../axios-config';
import { header } from '../../utility/header';
import * as actionTypes from '../action-types';

export const addGallery = (token, galleryData) => {
    return async dispatch => {
        try {
            const response = await axios.post('api/gallery', galleryData, header(token, true));
            const { gallery } = response.data;
            dispatch(setGallery(gallery));
        } catch (err) {
            dispatch(galleryFail(err.response.data.message));
            throw err;
        }
    }
}

export const deleteGallery = (token, id) => {
    return async dispatch => {
        try {
            await axios.delete('api/gallery/' + id, header(token));
            dispatch(removeGallery(id));
        } catch (err) {
            dispatch(galleryFail(err.response.data.message));
            throw err;
        }
    }
}


export const clearGallery = () => {
    return dispatch => {
        dispatch(resetGallery());
    }
}


const setGallery = (gallery) => {
    return {
        type: actionTypes.SET_GALLERIES,
        gallery,
    }
}

const resetGallery = () => {
    return {
        type: actionTypes.RESET_GALLERIES,
    }
}


const removeGallery = (id) => {
    return {
        type: actionTypes.REMOVE_GALLERY,
        id,
    }
}

const galleryFail = (errorMessage) => {
    return {
        type: actionTypes.GALLERY_FAIL,
        error: errorMessage,
    }
}