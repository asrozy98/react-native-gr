import { AuthAction, AuthModel } from './../actions/authActions';

type AuthState = {
    // user: AuthModel
    form: {
        name: string;
        phone: string;
        email: string;
        password: string;
        c_password: string;
    };
    data: [] | null;
    isLogin: boolean;
    token: string | null;
    error: string | undefined;
    loading: boolean;
}

const intialState = {
    // user: {} as AuthModel,
    form: {
        name: '',
        phone: '',
        email: '',
        password: '',
        c_password: ''
    },
    data: null,
    isLogin: false,
    token: null,
    error: undefined,
    loading: false,
}

const AuthReducer = (state: AuthState = intialState, action: AuthAction) => {
    switch (action.type) {
        case 'ON_SET_FORM_LOGIN':
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.inputType]: action.value
                },
            };
        case 'ON_SET_FORM_REGISTER':
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.inputType]: action.value
                },
            };
        case 'ON_LOGIN':
            return {
                ...state,
                isLogin: true,
                token: action.token,
                loading: action.loading,
            };
        case 'ON_REGISTER':
            return {
                ...state,
                isLogin: true,
                token: action.token,
                loading: action.loading,
            };
        case 'ON_PROFILE':
            return {
                ...state,
                // isLogin: true,
                // token:action.token,
                data: action.data,
            };
        case 'ON_RESTORE_TOKEN':
            return {
                ...state,
                isLogin: true,
                token: action.token,
            };
        case 'ON_LOGOUT':
            return {
                ...state,
                form: {
                    ...state.form,
                    email: '',
                    password: ''
                },
                isLogin: false,
                token: null,
            };
        case 'ON_ERROR':
            return {
                ...state,
                error: action.error,
                loading: action.loading,
            };
        default:
            return state;
    }
}

export { AuthReducer };