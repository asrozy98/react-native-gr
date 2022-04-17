import axios from 'axios';
import ApiLink from '../../Utils/ApiLink';
import { Dispatch } from 'react';
import { State } from 'react-native-gesture-handler';

export interface AlamatModel {
    id: number;
    nama: string;
    harga: number;
    stok: number;
}

export interface AlamatListAction {
    readonly type: 'ON_LIST_ALAMAT';
    data: [];
    loading: boolean;
    selected: number;
}

export interface OnSetAlamatAction {
    readonly type: 'SET_ALAMAT';
    selected: number;
}

export interface OnLoading {
    readonly type: 'ON_LOADING';
    loading: boolean;
}

export interface AlamatListErrorAction {
    readonly type: 'ON_LIST_ALAMAT_ERROR';
    message: any;
    loading: boolean;
}

export type AlamatAction = AlamatListAction | AlamatListErrorAction | OnLoading | OnSetAlamatAction;

export const onAlamat = (token: string | null) => {
    return async (dispatch: Dispatch<AlamatAction>) => {

        try {
            const response = await axios.get(ApiLink.Alamat, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response) {
                dispatch({
                    type: 'ON_LIST_ALAMAT_ERROR',
                    message: response.data.message,
                    loading: false,
                })
            } else {
                dispatch({
                    type: 'ON_LIST_ALAMAT',
                    data: response.data.data,
                    loading: false,
                    selected: response.data.data.find((item: any) => item.default === 1).id,
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_LIST_ALAMAT_ERROR',
                message: error,
                loading: false,
            })
        }
    }
};

export const setAlamat = (id: number) => {
    return {
        type: 'SET_ALAMAT',
        selected: id
    }
};

export const onLoading = () => {
    return {
        type: 'ON_LOADING',
        loading: true
    }
}