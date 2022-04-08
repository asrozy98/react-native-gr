import { combineReducers} from "redux";
import { AuthReducer } from "./authReducers";
import { KategoriReducer } from "./kategoriReducers";
import { ProdukReducer } from "./produkReducers";

const rootReducer = combineReducers({
    AuthReducer,
    KategoriReducer,
    ProdukReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};