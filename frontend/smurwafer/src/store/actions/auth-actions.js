import axios from '../../axios-config';
import * as actionTypes from '../action-types';

let timer = null;

export const autoLogin = (token, id, expiryDate) => {
    return dispatch => {
        if (token) {
            dispatch(authSuccess(token, id, expiryDate));
        } else {
            dispatch(authLogout());
        }
    }
}

export const login = (loginData) => {
    return async dispatch => {
        try {
            const response = await axios.post('api/auth/login', loginData);

            const { token, id, expiryDate } = response.data;

            const expiryDateModified = new Date(expiryDate).getTime() - new Date().getTime();

            dispatch(setLocalVariables(token, id, expiryDateModified));
        } catch (err) {
            console.log(err.response.data);
            dispatch(authFail(err.response.data.message));
            throw err;
        }
    }
}

export const signup = (signupData) => {
    return async dispatch => {
        try {
            const response = await axios.post('api/auth/signup', signupData);

            const { token, id, expiryDate } = response.data;

            const expiryDateModified = new Date(expiryDate).getTime() - new Date().getTime();

            dispatch(setLocalVariables(token, id, expiryDateModified));
        } catch (err) {
            dispatch(authFail(err.response.data.message));
            throw err;
        }
    }
}

export const logout = () => {
    return async dispatch => {
        localStorage.removeItem('authData');
        if (timer) {
            clearTimeout(timer);
        }
        dispatch(authLogout());
    }
}

const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}


const setLocalVariables = (token, id, expiryDate) => {
    return dispatch => {
        localStorage.setItem('authData', JSON.stringify({
            token,
            id,
        }));

        timer = setTimeout(() => {
            dispatch(logout());
        }, expiryDate);

        dispatch(authSuccess(token, id, expiryDate));
    }
}

const authSuccess = (token, id, expiryDate) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        id,
        expiryDate,
    }
}

const authFail = (errorMessage) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: errorMessage,
    }
}   