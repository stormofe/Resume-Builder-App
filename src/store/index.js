import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./userReducer";
import { loginReducer } from "./loginReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	user: userReducer,
	login: loginReducer,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
