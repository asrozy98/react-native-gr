import axios from 'axios';
import ApiLink from '../../Utils/ApiLink';
import { Dispatch } from 'react';
import { ToastAndroid } from 'react-native';

export interface WishlistModel {
    id: number;
    nama: string;
    harga: number;
    stok: number;
}

export interface WishlistListAction {
    readonly type: 'ON_LIST_WISHLIST';
    data: [];
    count: number;
    loading: boolean;
}

export interface OnAddWishlistAction {
    readonly type: 'ON_ADD_WISHLIST';
    message: any;
    loading: boolean;
}

export interface OnDeleteWishlistAction {
    readonly type: 'ON_DELETE_WISHLIST';
    message: any;
    loading: boolean;
}

export interface OnLoading {
    readonly type: 'ON_LOADING';
    loading: boolean;
}

export interface WishlistListErrorAction {
    readonly type: 'ON_LIST_WISHLIST_ERROR';
    message: any;
    loading: boolean;
}

export type WishlistAction = WishlistListAction | WishlistListErrorAction | OnLoading | OnAddWishlistAction | OnDeleteWishlistAction;

export const onWishlist = (token: string | null) => {
    return async (dispatch: Dispatch<WishlistAction>) => {

        try {
            const response = await axios.get(ApiLink.Wishlist, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response) {
                dispatch({
                    type: 'ON_LIST_WISHLIST_ERROR',
                    message: response.data.message,
                    loading: false,
                })
            } else {
                dispatch({
                    type: 'ON_LIST_WISHLIST',
                    data: response.data.data,
                    count: response.data.count,
                    loading: false
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_LIST_WISHLIST_ERROR',
                message: error,
                loading: false,
            })
        }
    }
};

export const addWishlist = (token: string | null, produk: number | null,) => {
    return async (dispatch: Dispatch<WishlistAction>) => {

        try {
            const response = await axios.post(ApiLink.Wishlist, {
                product_id: produk,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response) {
                dispatch({
                    type: 'ON_LIST_WISHLIST_ERROR',
                    message: response.data.message,
                    loading: false,
                })
                ToastAndroid.show(`Wishlist: ${response.data.message}`, ToastAndroid.SHORT);
            } else {
                dispatch({
                    type: 'ON_ADD_WISHLIST',
                    message: response.data.message,
                    loading: false
                })
                ToastAndroid.show(`Wishlist: ${response.data.message}`, ToastAndroid.SHORT);
                dispatch(onWishlist(token));
            }
        } catch (error) {
            dispatch({
                type: 'ON_LIST_WISHLIST_ERROR',
                message: error,
                loading: false,
            })
            ToastAndroid.show(`Wishlist: ${error}`, ToastAndroid.SHORT);
        }
    }
};

export const deleteWishlist = (token: string | null, produk: number | null,) => {
    return async (dispatch: Dispatch<WishlistAction>) => {

        try {
            const response = await axios.delete(ApiLink.Wishlist, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }, params: {
                    product_id: produk,
                }
            });

            if (!response) {
                dispatch({
                    type: 'ON_LIST_WISHLIST_ERROR',
                    message: response.data.message,
                    loading: false,
                })
                ToastAndroid.show(`Wishlist: ${response.data.message}`, ToastAndroid.SHORT);
            } else {
                dispatch({
                    type: 'ON_DELETE_WISHLIST',
                    message: response.data.message,
                    loading: false
                })
                ToastAndroid.show(`Wishlist: ${response.data.message}`, ToastAndroid.SHORT);
                dispatch(onWishlist(token));
            }
        } catch (error) {
            dispatch({
                type: 'ON_LIST_WISHLIST_ERROR',
                message: error,
                loading: false,
            })
            ToastAndroid.show(`Wishlist: ${error}`, ToastAndroid.SHORT);
        }
    }
};

export const onLoading = () => {
    return {
        type: 'ON_LOADING',
        loading: true
    }
}