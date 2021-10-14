import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./userReducer";
import { loginReducer } from "./loginReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { formsReducer } from "./formsReducer";
import createSagaMiddleware from "@redux-saga/core";
import { loginWatcher } from "../saga/loginSaga";
import { rootWatcher } from "../saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
	user: userReducer,
	login: loginReducer,
	forms: formsReducer,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootWatcher);