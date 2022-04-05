import { combineReducers} from "redux";
import { AuthReducer } from "./authReducers";
import { ProdukReducer } from "./produkReducers";

const rootReducer = combineReducers({
    AuthReducer,
    ProdukReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};