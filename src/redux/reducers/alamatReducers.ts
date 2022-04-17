import { combineReducers } from 'redux';
import { AlamatAction, AlamatModel } from '../actions/alamatActions';

type AlamatState = {
    data: [] | null;
    selected: number | null;
    error: string | undefined;
    loading: boolean;
}

const intialState = {
    data: null,
    selected: null,
    error: undefined,
    loading: true,
}

const AlamatReducer = (state: AlamatState = intialState, action: AlamatAction) => {
    switch (action.type) {
        case 'ON_LIST_ALAMAT':
            return {
                ...state,
                data: action.data,
                loading: action.loading,
                selected: action.selected,
            };
        case 'SET_ALAMAT':
            return {
                ...state,
                selected: action.selected,
            };
        case 'ON_LIST_ALAMAT_ERROR':
            return {
                ...state,
                message: action.message,
                loading: action.loading,
            };
        case 'ON_LOADING':
            return {
                ...state,
                loading: action.loading,
            };
        default:
            return state;
    }
}

export { AlamatReducer };