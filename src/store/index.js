import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./userReducer";
import { loginReducer } from "./loginReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { formsReducer } from "./formsReducer";
import createSagaMiddleware from "@redux-saga/core";
import { rootWatcher } from "../saga";
import { userInfo } from "../saga/context/userInfo";

const sagaMiddleware = createSagaMiddleware({
	context: {
		userInfo,
	},
});




const rootReducer = combineReducers({
	user: userReducer,
	login: loginReducer,
	forms: formsReducer,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootWatcher);