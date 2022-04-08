import axios from 'axios';
import ApiLink from '../../Utils/ApiLink';
import { Dispatch } from 'react';

export interface KategoriListAction {
    readonly type: 'ON_LIST_KATEGORI';
    data: [];
    count: number;
    loading: boolean;
}

export interface OnLoading{
    readonly type: 'ON_LOADING';
    loading: boolean;
}

export interface KategoriListErrorAction {
    readonly type: 'ON_LIST_KATEGORI_ERROR';
    error: any;
    loading: boolean;
}

export type KategoriAction = KategoriListAction | KategoriListErrorAction | OnLoading;

export const onListKategori=(token:string|null,perPage:number|null)=>{
  return async(dispatch:Dispatch<KategoriAction>)=>{

        try {
            const response = await axios.get(ApiLink.KATEGORI,{
                headers:{
                    Authorization:`Bearer ${token}`
                },params:{
                    perPage:perPage,
                }
            })
        
            if(!response){
                dispatch({
                    type:'ON_LIST_KATEGORI_ERROR',
                    error:'Login with API error',
                    loading:false
                })  
            }else{
                dispatch({
                    type:'ON_LIST_KATEGORI',
                    data:response.data.data,
                    loading:false,
                    count:response.data.count
                }) 
            }
        } catch (error) {
            dispatch({
                type:'ON_LIST_KATEGORI_ERROR',
                error:error,
                loading:false
            }) 
        }
    }
};

export const onLoading=()=>{
    return{
        type:'ON_LOADING',
        loading:true
    }
}