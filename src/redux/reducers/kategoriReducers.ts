import { KategoriAction } from './../actions/kategoriActions';

type KategoriState = {
    // user: AuthModel
    data: null;
    error: string | undefined;
    // data: any;
}

const intialState = {
    data: null,
    error: undefined,
}

const KategoriReducer = (state: KategoriState= intialState, action: KategoriAction)=>{
    switch(action.type){
    case 'ON_LIST_KATEGORI':
        return {
            ...state,
            data:action.data,
        };
        case 'ON_LIST_KATEGORI_ERROR':
        return {
            ...state,
            message:action.message,
        };
        default:
            return state;
    }
}

export {KategoriReducer};