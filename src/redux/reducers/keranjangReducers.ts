import { KeranjangAction } from './../actions/keranjangActions';

type KeranjangState = {
    // user: AuthModel
    data: [] | null;
    count: number;
    error: string | undefined;
    loading: boolean;
    message: string | undefined;
}

const intialState = {
    data: null,
    error: undefined,
    count: 0,
    loading: true,
    message: ''
}

const KeranjangReducer = (state: KeranjangState = intialState, action: KeranjangAction) => {
    switch (action.type) {
        case 'ON_LIST_KERANJANG':
            return {
                ...state,
                data: action.data,
                count: action.count,
                loading: action.loading
            };
        case 'ON_KERANJANG_ERROR':
            return {
                ...state,
                error: action.error,
                loading: action.loading
            };
        case 'ON_LOADING':
            return {
                ...state,
                loading: action.loading,
            };
        case 'ON_DELETE_KERANJANG':
            return {
                ...state,
                loading: action.loading,
                message: action.message,
                count: action.count
            };
        case 'ON_ADD_KERANJANG':
            return {
                ...state,
                loading: action.loading,
                message: action.message,
            };
        case 'ON_UPDATE_KERANJANG':
            return {
                ...state,
                loading: action.loading,
                message: action.message,
            };
        default:
            return state;
    }
}

export { KeranjangReducer };