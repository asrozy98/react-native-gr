import { combineReducers } from 'redux';
import { ProdukAction, ProdukModel } from './../actions/produkActions';

type ProdukState = {
    data: []|null;
    count: number;
    error: string | undefined;
    loading: boolean;
}

const intialState = {
    data: null,
    count: 0,
    error: undefined,
    loading: true,
}

const ProdukReducer = (state: ProdukState= intialState, action: ProdukAction)=>{
    switch(action.type){
    case 'ON_LIST_PRODUK':
        return {
            ...state,
            data:action.data,
            count:action.count,
            loading:action.loading,
        };
        case 'ON_LIST_PRODUK_ERROR':
        return {
            ...state,
            message:action.message,
            loading:action.loading,
        };
        case 'ON_LOADING':
        return {
            ...state,
            loading:action.loading,
        };
        default:
            return state;
    }
}

export {ProdukReducer};