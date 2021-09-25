import axios from '../../axios-config';
import { header } from '../../utility/header';
import * as actionTypes from '../action-types';

export const fetchUsers = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/user', header(token));
            const { users } = response.data;
            dispatch(setUsers(users));
        } catch (err) {
            dispatch(userFail(err.response.data.message));
            throw err;
        }
    }
}

const setUsers = (users) => {
    const loadedUsers = [];

    for (let key in users) {
        loadedUsers.push(users[key]);
    }

    return {
        type: actionTypes.SET_USERS,
        users: loadedUsers,
    }
}

export const fetchCurrentUser = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/current-user', header(token));
            const { currentUser } = response.data;
            dispatch(setCurrentUser(currentUser));
        } catch (err) {
            dispatch(userFail(err.response.data.message));
            throw err;
        }
    }
}

const setCurrentUser = (currentUser) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        currentUser,
    }
}


export const updateUser = (token, id, userData) => {
    return async dispatch => {
        try {
            await axios.put('api/user/' + id, userData, header(token));
            dispatch(userSuccess());
        } catch (err) {
            dispatch(userFail(err.response.data.message));
            throw err;
        }
    }
}

export const updatePassword = (token, id, passwordData) => {
    return async dispatch => {
        try {
            await axios.put('api/update-password/' + id, passwordData, header(token));
            dispatch(userSuccess());
        } catch (err) {
            dispatch(userFail(err.response.data.message));
            throw err;
        }
    }
}

export const deleteUser = (token, id) => {
    return async dispatch => {
        try {
            await axios.delete('api/user/' + id, header(token));
            dispatch(userSuccess());
        } catch (err) {
            dispatch(userFail(err.response.data.message));
            throw err;
        }
    }
}

export const fetchOnlineUsers = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/online-users', header(token));
            const { onlineUsers } = response.data;
            dispatch(setOnlineUsers(onlineUsers));
        } catch (err) {
            dispatch(userFail(err.response.data.message));
            throw err;
        }
    }
}

const setOnlineUsers = (onlineUsers) => {
    return {
        type: actionTypes.SET_ONLINE_USERS,
        onlineUsers,
    }
}

export const userOnlineStatus = (token, onlineData) => {
    return async dispatch => {
        try {
            await axios.put('api/online-check', onlineData, header(token));
            dispatch(userSuccess());
        } catch (err) {
            dispatch(userFail(err.response.data.message));
            throw err;
        }
    }
}

const userSuccess = () => {
    return {
        type: actionTypes.USER_SUCCESS,
    }
}

const userFail = (errorMessage) => {
    return {
        type: actionTypes.USER_FAIL,
        error: errorMessage,
    }
}