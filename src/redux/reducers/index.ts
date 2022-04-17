import { combineReducers } from "redux";
import { AuthReducer } from "./authReducers";
import { AlamatReducer } from "./alamatReducers";
import { KategoriReducer } from "./kategoriReducers";
import { ProdukReducer } from "./produkReducers";
import { KeranjangReducer } from "./keranjangReducers";
import { WishlistReducer } from "./wishlistReducers";

const rootReducer = combineReducers({
    AuthReducer,
    KategoriReducer,
    ProdukReducer,
    KeranjangReducer,
    AlamatReducer,
    WishlistReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };