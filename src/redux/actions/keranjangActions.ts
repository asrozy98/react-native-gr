import axios from 'axios';
import ApiLink from '../../Utils/ApiLink';
import { Dispatch } from 'react';
import { ToastAndroid } from 'react-native';

export interface KeranjangListAction {
    readonly type: 'ON_LIST_KERANJANG';
    data: [];
    count: number;
    loading: boolean;
}

export interface OnLoading {
    readonly type: 'ON_LOADING';
    loading: boolean;
}

export interface AddKeranjang {
    readonly type: 'ON_ADD_KERANJANG';
    loading: boolean;
    message: string;
}

export interface UpdateKeranjang {
    readonly type: 'ON_UPDATE_KERANJANG';
    loading: boolean;
    message: string;
}

export interface OnDelete {
    readonly type: 'ON_DELETE_KERANJANG';
    loading: boolean;
    message: string;
}

export interface KeranjangListErrorAction {
    readonly type: 'ON_KERANJANG_ERROR';
    error: any;
    loading: boolean;
}

export type KeranjangAction =
    | KeranjangListAction
    | KeranjangListErrorAction
    | OnLoading
    | OnDelete
    | AddKeranjang
    | UpdateKeranjang;

export const onListKeranjang = (
    token: string | null,
) => {
    return async (dispatch: Dispatch<KeranjangAction>) => {
        try {
            const response = await axios.get(ApiLink.Keranjang, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response) {
                dispatch({
                    type: 'ON_KERANJANG_ERROR',
                    error: 'Login with API error',
                    loading: false,
                });
            } else {
                dispatch({
                    type: 'ON_LIST_KERANJANG',
                    data: response.data.data,
                    loading: false,
                    count: response.data.count,
                });
            }
        } catch (error) {
            dispatch({
                type: 'ON_KERANJANG_ERROR',
                error: error,
                loading: false,
            });
        }
    };
};

export const onLoading = () => {
    return {
        type: 'ON_LOADING',
        loading: true,
    };
};

export const onDeleteKeranjang = (
    token: string | null,
    product_id: number | null,
    user_id: number | null,
) => {
    return async (dispatch: Dispatch<KeranjangAction>) => {
        try {
            const response = await axios.get(ApiLink.KeranjangDelete, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    product_id: product_id,
                    user_id: user_id,
                },
            });

            if (!response) {
                dispatch({
                    type: 'ON_KERANJANG_ERROR',
                    error: response.data.message,
                    loading: false,
                });
                ToastAndroid.show(`${response.data.message}`, ToastAndroid.SHORT);
            } else {
                dispatch({
                    type: 'ON_DELETE_KERANJANG',
                    message: response.data.message,
                    loading: false
                });
                ToastAndroid.show(`${response.data.message}`, ToastAndroid.SHORT);
                dispatch(onListKeranjang(token));
            }
        } catch (error) {
            dispatch({
                type: 'ON_KERANJANG_ERROR',
                error: error,
                loading: false,
            });
            ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
        }
    };
};

export const onAddKeranjang = (
    token: string | null,
    product_id: number | null,
) => {
    return async (dispatch: Dispatch<KeranjangAction>) => {
        try {
            const response = await axios.get(ApiLink.KeranjangAdd, {
                headers: {
                    Authorization: `Bearer ${token}`
                }, params: {
                    product_id: product_id,
                    qty: 1
                }
            });

            if (!response) {
                dispatch({
                    type: 'ON_KERANJANG_ERROR',
                    error: response.data.message,
                    loading: false,
                });
                ToastAndroid.show(`${response.data.message}`, ToastAndroid.SHORT);
            } else {
                dispatch({
                    type: 'ON_ADD_KERANJANG',
                    message: response.data.message,
                    loading: false,
                });
                ToastAndroid.show(`${response.data.message}`, ToastAndroid.SHORT);
                dispatch(onListKeranjang(token));
            }
        } catch (error) {
            dispatch({
                type: 'ON_KERANJANG_ERROR',
                error: error,
                loading: false,
            });
            ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
        }
    };
};

export const onUpdateKeranjang = (
    token: string | null,
    product_id: number | null,
    qty: number | null,
) => {
    return async (dispatch: Dispatch<KeranjangAction>) => {
        try {
            const response = await axios.get(ApiLink.KeranjangUpdate, {
                headers: {
                    Authorization: `Bearer ${token}`
                }, params: {
                    product_id: product_id,
                    qty: qty
                }
            });

            if (!response) {
                dispatch({
                    type: 'ON_KERANJANG_ERROR',
                    error: response.data.message,
                    loading: false,
                });
                ToastAndroid.show(`${response.data.message}`, ToastAndroid.SHORT);
            } else {
                dispatch({
                    type: 'ON_UPDATE_KERANJANG',
                    message: response.data.message,
                    loading: false,
                });
                ToastAndroid.show(`${response.data.message}`, ToastAndroid.SHORT);
                dispatch(onListKeranjang(token));
            }
        } catch (error) {
            dispatch({
                type: 'ON_KERANJANG_ERROR',
                error: error,
                loading: false,
            });
            ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
        }
    };
};
