import { AuthAction, AuthModel } from './../actions/authActions';

type AuthState = {
    // user: AuthModel
    form:{
        email:string;
        password:string;
    };
    isLogin: boolean;
    token: string | null;
    error: string | undefined;
    loading: boolean;
}

const intialState = {
    // user: {} as AuthModel,
    form:{
        email:'',
        password:''
    },
    isLogin: false,
    token: null,
    error: undefined,
    loading: false,
}

const AuthReducer = (state: AuthState= intialState, action: AuthAction)=>{
    switch(action.type){
    case 'ON_SET_FORM_LOGIN':
        return {
            ...state,
            form:{
                ...state.form,
                [action.inputType]:action.value
            },
        };
        case 'ON_LOGIN':
        return {
            ...state,
            isLogin: true,
            token:action.token,
            loading:action.loading,
        };
        case 'ON_PROFILE':
        return {
            ...state,
            // isLogin: true,
            // token:action.token,
            data:action.data,
        };
        case 'ON_RESTORE_TOKEN':
        return {
            ...state,
            isLogin: true,
            token:action.token,
        };
        case 'ON_LOGOUT':
        return {
            ...state,
            form:{
                ...state.form,
                email:'',
                password:''
            },
            isLogin: false,
            token:null,
        };
        case 'ON_ERROR':
        return {
            ...state,
            error:action.error,
            loading:action.loading,
        };
        default:
            return state;
    }
}

export {AuthReducer};