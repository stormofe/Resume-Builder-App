import { put, takeEvery } from "redux-saga/effects";
import { login, logOut } from "../API/API";
import { SET_LOADING } from "../store/formsReducer";
import { SET_USER_LOGIN, SUCCESS_REGISTER } from "../store/loginReducer";
import { register } from "./../API/API";

function* loginLogicWorker(data) {
	yield put({ type: SET_LOADING, name: "login", activity: true });
	const { email, password } = data;
	const result = yield login(email, password);
	if (result.err) {
		yield put({ type: "SET_ERROR_LOGIN", payload: result.err.message });
		yield put({ type: SET_LOADING, name: "login", activity: false });
		return;
	}
	yield put({ type: SET_USER_LOGIN, email, isLogin: true, error: false });
	yield put({ type: SET_LOADING, name: "login", activity: false });
}
export function* loginLogicWatcher() {
	yield takeEvery("LOG_IN", loginLogicWorker);
}

function* logoutLogicWorker() {
	yield logOut();
	yield put({ type: SET_USER_LOGIN, email: null, isLogin: false });
}

export function* logoutLogicWatcher() {
	yield takeEvery("LOG_OUT", logoutLogicWorker);
}

function* registerLogicWorker(data) {
	yield put({ type: SET_LOADING, name: "login", activity: true });
	const { email, password } = data;
	const result = yield register(email, password);
	yield put({ type: "SET_ERROR_LOGIN", payload: false });
	if (result) {
		const error = result.customData._tokenResponse.error.message;
		yield put({ type: "SET_ERROR_LOGIN", payload: error });
		yield put({ type: SET_LOADING, name: "login", activity: false });
		return;
	}
	yield put({ type: SUCCESS_REGISTER, payload: true });
	yield put({ type: SET_LOADING, name: "login", activity: false });
	yield put({ type: SUCCESS_REGISTER, payload: false });
}

export function* registerLogicWatcher() {
	yield takeEvery("REGISTER", registerLogicWorker);
}
