import { combineReducers} from "redux";
import { AuthReducer } from "./authReducers";
import { KategoriReducer } from "./kategoriReducers";
import { ProdukReducer } from "./produkReducers";
import { KeranjangReducer } from "./keranjangReducers";

const rootReducer = combineReducers({
    AuthReducer,
    KategoriReducer,
    ProdukReducer,
    KeranjangReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};