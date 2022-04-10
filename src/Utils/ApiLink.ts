const URL = 'https://koperasi.teknoloka.com';
// const URL = 'http://127.0.0.1:8000';
// const URL = 'https://178.128.92.250';
const BaseUrl = URL + '/api/v1';


const ApiLink = {
    Url: URL,
    Login: BaseUrl + '/auth/login',
    Register: BaseUrl + '/auth/register',
    Profile: BaseUrl + '/profile',

    Kategori: BaseUrl + '/product/category',
    KeranjangAdd: BaseUrl + '/product/cart/tambah',
    KeranjangUpdate: BaseUrl + '/product/cart/update',
    Keranjang: BaseUrl + '/product/cart',
    KeranjangDelete: BaseUrl + '/product/cart/delete',
    Produk: BaseUrl + '/product',
}

export default ApiLink;