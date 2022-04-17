import axios from 'axios';
import ApiLink from '../../Utils/ApiLink';
import { Dispatch } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export interface AuthModel {
    data: any
    isLogin: boolean;
    token: string | null;
}

export interface onLoadingction {
    readonly type: 'ON_LOADING';
    loading: boolean;
}

export interface LoginAction {
    readonly type: 'ON_LOGIN';
    isLogin: boolean;
    token: string | null;
    loading: boolean;
}

export interface RegisterAction {
    readonly type: 'ON_REGISTER';
    isLogin: boolean;
    token: string | null;
    loading: boolean;
}

export interface ProfileAction {
    readonly type: 'ON_PROFILE';
    data: any;
}

export interface RestoreTokenAction {
    readonly type: 'ON_RESTORE_TOKEN';
    isLogin: boolean;
    token: string | null;
}

export interface LogOutAction {
    readonly type: 'ON_LOGOUT';
    form: {
        email: string;
        password: string;
    };
    isLogin: boolean;
    token: string | null;
}

export interface SetFormLoginAction {
    readonly type: 'ON_SET_FORM_LOGIN';
    form: {
        email: string;
        password: string;
    };
    inputType: string;
    value: string;
}

export interface SetFormRegisterAction {
    readonly type: 'ON_SET_FORM_REGISTER';
    form: {
        name: string;
        phone: string;
        email: string;
        password: string;
        c_password: string;
    };
    inputType: string;
    value: string;
}

export interface ErrorAction {
    readonly type: 'ON_ERROR';
    error: any;
    loading: boolean;
}

export type AuthAction = LoginAction | RegisterAction | ProfileAction | RestoreTokenAction | LogOutAction | ErrorAction | SetFormLoginAction | SetFormRegisterAction | onLoadingction;

export const onLogin = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {

        try {
            const response = await axios.post<AuthModel>(ApiLink.Login, {
                email,
                password
            })

            if (!response) {
                dispatch({
                    type: 'ON_ERROR',
                    error: response.data.message,
                    loading: false,
                })
                ToastAndroid.show(`Login: ${response.data.message}`, ToastAndroid.SHORT);
            } else {
                dispatch({
                    type: 'ON_LOGIN',
                    isLogin: true,
                    token: response.data.data.access_token,
                    loading: false
                })
                ToastAndroid.show('Login Success', ToastAndroid.SHORT);
                const setToken = async () => {
                    await AsyncStorage.setItem('@token-set', JSON.stringify(response.data.data.access_token));
                };
                setToken();
            }
        } catch (error) {
            dispatch({
                type: 'ON_ERROR',
                error: error,
                loading: false,
            })
            ToastAndroid.show(`Login: ${error}`, ToastAndroid.SHORT);
        }
    }
};

export const onSetFormLogin = (value: string | null, inputType: string | null) => {
    return { type: 'ON_SET_FORM_LOGIN', inputType: inputType, value: value };
}

export const onRegister = (name: string, phone: string, email: string, password: string, c_password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {

        try {
            const response = await axios.post<AuthModel>(ApiLink.Register, {
                name,
                phone,
                email,
                password,
                c_password
            })

            if (!response) {
                dispatch({
                    type: 'ON_ERROR',
                    error: response.data.message,
                    loading: false,
                })
                ToastAndroid.show(`Register: ${response.data.message}`, ToastAndroid.SHORT);
            } else {
                dispatch({
                    type: 'ON_REGISTER',
                    isLogin: true,
                    token: response.data.data.access_token,
                    loading: false
                })
                ToastAndroid.show('Register Success', ToastAndroid.SHORT);
                const setToken = async () => {
                    await AsyncStorage.setItem('@token-set', JSON.stringify(response.data.data.access_token));
                };
                setToken();
            }
        } catch (error) {
            dispatch({
                type: 'ON_ERROR',
                error: error,
                loading: false,
            })
            ToastAndroid.show(`Register: ${error}`, ToastAndroid.SHORT);
        }
    }
};

export const onSetFormRegister = (value: string | null, inputType: string | null) => {
    return { type: 'ON_SET_FORM_REGISTER', inputType: inputType, value: value };
}

export const onLogout = () => {
    return { type: 'ON_LOGOUT', form: { email: '', password: '' }, isLogin: false, token: null };
}

export const onRestoreToken = (token: string | null) => {
    if (token !== null) {
        return { type: 'ON_RESTORE_TOKEN', isLogin: true, token: token };
    } else {
        return { type: 'ON_LOGOUT', form: { email: '', password: '' }, isLogin: false, token: null };
    }
}

export const onProfile = (token: string | null) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await axios.get<AuthModel>(ApiLink.Profile, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response) {
                dispatch({
                    type: 'ON_ERROR',
                    error: response.data.message,
                    loading: false,
                })
            } else {
                dispatch({
                    type: 'ON_PROFILE',
                    data: response.data.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_ERROR',
                error: error,
                loading: false,
            })
        }
    }
}

export const onLoading = () => {
    return {
        type: 'ON_LOADING',
        loading: true
    }
}