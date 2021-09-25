import * as actionTypes from '../action-types';
import axios from '../../axios-config';
import { header } from '../../utility/header';

export const fetchSetting = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('api/setting', header(token));

            if (response.status !== 200) {
                throw new Error(response.data.message);
            }

            const { setting } = response.data;
            dispatch(setSetting(setting));
        } catch (err) {
            dispatch(settingFail(err.message));
        }
    }
}


const setSetting = (setting) => {
    return {
        type: actionTypes.SET_SETTINGS,
        setting,
    }
}

export const updateSetting = (token, settingData) => {
    return async dispatch => {
        try {
            const response = await axios.put('api/setting', settingData, header(token));

            if (response.status !== 204) {
                throw new Error(response.data.message);
            }

            dispatch(settingSuccess());
        } catch (err) {
            dispatch(settingFail(err.message));
        }
    }
}

const settingSuccess = () => {
    return {
        type: actionTypes.SETTING_SUCCESS,
    }
}

const settingFail = (errMessage) => {
    return {
        type: actionTypes.SETTING_FAIL,
        error: errMessage,
    }
}
