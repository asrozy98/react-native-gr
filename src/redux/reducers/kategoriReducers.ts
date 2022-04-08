import { KategoriAction } from './../actions/kategoriActions';

type KategoriState = {
    // user: AuthModel
    data: []|null;
    count:number;
    error: string | undefined;
    loading: boolean;
}

const intialState = {
    data: null,
    error: undefined,
    count: 0,
    loading:true
}

const KategoriReducer = (state: KategoriState= intialState, action: KategoriAction)=>{
    switch(action.type){
    case 'ON_LIST_KATEGORI':
        return {
            ...state,
            data:action.data,
            loading:action.loading
        };
        case 'ON_LIST_KATEGORI_ERROR':
        return {
            ...state,
            error:action.error,
            loading:action.loading
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

export {KategoriReducer};