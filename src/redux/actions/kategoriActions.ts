import axios from 'axios';
import ApiLink from '../../Utils/ApiLink';
import { Dispatch } from 'react';

export interface KategoriListAction {
    readonly type: 'ON_LIST_KATEGORI';
    data: {
        id: number;
        nama: string;
    };
    // message: any;
}

export interface KategoriListErrorAction {
    readonly type: 'ON_LIST_KATEGORI_ERROR';
    message: any;
}

export type KategoriAction = KategoriListAction | KategoriListErrorAction;

export const onListKategori=()=>{
  return async(dispatch:Dispatch<KategoriAction>)=>{

        try {
            const response = await axios.post(ApiLink.KATEGORI)
        
            if(!response){
                dispatch({
                    type:'ON_LIST_KATEGORI_ERROR',
                    message:'Login with API error'
                })  
            }else{
                dispatch({
                    type:'ON_LIST_KATEGORI',
                    data:{
                        id:response.data.data.id,
                        nama:response.data.data.nama
                    },
                }) 
            }
        } catch (error) {
            dispatch({
                type:'ON_LIST_KATEGORI_ERROR',
                message:error
            }) 
        }
    }
};