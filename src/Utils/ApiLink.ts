const URL = 'https://koperasi.teknoloka.com';
// const URL = 'https://178.128.92.250';
const BASE_URL =URL+'/api/v1';


const ApiLink = {
    LOGIN : BASE_URL+'/auth/login',
    REGISTER : BASE_URL+'/auth/register',
    PROFILE : BASE_URL+'/profile',

    KATEGORI : BASE_URL+'/kategori',
    PRODUK : BASE_URL+'/product',
}

export default ApiLink;