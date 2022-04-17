import { combineReducers } from 'redux';
import { WishlistAction, WishlistModel } from './../actions/wishlistActions';

type WishlistState = {
    data: [] | null;
    message: any | null;
    count: number;
    error: string | undefined;
    loading: boolean;
}

const intialState = {
    data: null,
    message: undefined,
    count: 0,
    error: undefined,
    loading: true,
}

const WishlistReducer = (state: WishlistState = intialState, action: WishlistAction) => {
    switch (action.type) {
        case 'ON_LIST_WISHLIST':
            return {
                ...state,
                data: action.data,
                count: action.count,
                loading: action.loading,
            };
        case 'ON_ADD_WISHLIST':
            return {
                ...state,
                message: action.message,
                loading: action.loading,
            };
        case 'ON_DELETE_WISHLIST':
            return {
                ...state,
                message: action.message,
                loading: action.loading,
            };
        case 'ON_LIST_WISHLIST_ERROR':
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

export { WishlistReducer };