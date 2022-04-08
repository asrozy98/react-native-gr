import axios from 'axios';
import ApiLink from '../../Utils/ApiLink';
import { Dispatch } from 'react';

export interface ProdukModel {
    id: number;
        nama: string;
        harga: number;
        stok: number;
}

export interface ProdukListAction {
    readonly type: 'ON_LIST_PRODUK';
    // data: any;
    data: [];
    count: number;
    loading: boolean;
}

export interface OnKategoriProdukAction {
    readonly type: 'ON_LIST_KATEGORI_PRODUK';
    // data: any;
    katData: [];
    loading: boolean;
}

export interface OnLoading{
    readonly type: 'ON_LOADING';
    loading: boolean;
}

export interface ProdukListErrorAction {
    readonly type: 'ON_LIST_PRODUK_ERROR';
    message: any;
    loading: boolean;
}

export type ProdukAction = ProdukListAction | ProdukListErrorAction | OnLoading |OnKategoriProdukAction;

export const onProduk=(token: string|null,kategori: number|null,cari: string|null,page: number|null,)=>{
  return async(dispatch:Dispatch<ProdukAction>)=>{

        try {
            const response = await axios.get(ApiLink.PRODUK,{
                headers:{
                    Authorization:`Bearer ${token}`
                },params:{
                    kategori_id:kategori,
                    q:cari,
                    perPage:page,
                }
            })
        
            if(!response){
                dispatch({
                    type:'ON_LIST_PRODUK_ERROR',
                    message:'Produk with API error',
                    loading:false,
                })  
            }else{
                dispatch({
                    type:'ON_LIST_PRODUK',
                    data:response.data.data,
                    count:response.data.count,
                    loading:false
                }) 
            }
        } catch (error) {
            dispatch({
                type:'ON_LIST_PRODUK_ERROR',
                message:error,
                loading:false,
            }) 
        }
    }
};

export const onKategoriProduk=(token: string|null,kategori: number|null,page: number|null,)=>{
    return async(dispatch:Dispatch<ProdukAction>)=>{
  
          try {
              const response = await axios.get(ApiLink.PRODUK,{
                  headers:{
                      Authorization:`Bearer ${token}`
                  },params:{
                      kategori_id:kategori,
                      perPage:page,
                  }
              })
          
              if(!response){
                  dispatch({
                      type:'ON_LIST_PRODUK_ERROR',
                      message:'Produk with API error',
                      loading:false,
                  })  
              }else{
                  dispatch({
                      type:'ON_LIST_KATEGORI_PRODUK',
                      katData:response.data.data,
                      loading:false
                  }) 
              }
          } catch (error) {
              dispatch({
                  type:'ON_LIST_PRODUK_ERROR',
                  message:error,
                  loading:false,
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