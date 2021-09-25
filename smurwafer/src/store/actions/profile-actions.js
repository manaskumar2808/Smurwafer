import axios from '../../axios-config';
import { header } from '../../utility/header';
import * as actionTypes from '../action-types';

export const fetchProfile = (token, id) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/profile/' + id, header(token));
            const { profile } = response.data;
            dispatch(setProfile(profile));
        } catch (err) {
            dispatch(profileFail(err.response.data.message));
            throw err;
        }
    }
}

const setProfile = (profile) => {
    return {
        type: actionTypes.SET_PROFILE,
        profile,
    }
}

export const updateProfile = (token, id, profileData) => {
    return async dispatch => {
        try {
            await axios.put('api/profile/' + id, profileData, header(token, true));
            dispatch(profileSuccess());
        } catch (err) {
            dispatch(profileFail(err.response.data.message));
            throw err;
        }
    }
}

export const deleteProfile = (token, id, profileData) => {
    return async dispatch => {
        try {
            await axios.delete('api/profile/' + id, header(token));
            dispatch(profileSuccess());
        } catch (err) {
            dispatch(profileFail(err.response.data.message));
            throw err;
        }
    }
}


const profileSuccess = () => {
    return {
        type: actionTypes.PROFILE_SUCCESS,
    }
}

const profileFail = (errorMessage) => {
    return {
        type: actionTypes.PROFILE_FAIL,
        error: errorMessage,
    }
}