import * as actionTypes from '../action-types';

const initialState = {
    galleries: [],
    memGalleries: [],
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GALLERIES:
            return {
                ...state,
                galleries: [...state.galleries, action.gallery.id],
                memGalleries: [...state.memGalleries, action.gallery],
            }
        case actionTypes.RESET_GALLERIES:
            return {
                ...state,
                galleries: [],
                memGalleries: [],
            }
        case actionTypes.REMOVE_GALLERY:
            return {
                ...state,
                galleries: [...state.galleries].filter(g => g !== action.id),
                memGalleries: [...state.memGalleries].filter(mg => mg.id !== action.id),
            }
        case actionTypes.GALLERY_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.GALLERY_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;