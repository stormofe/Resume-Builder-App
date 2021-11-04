import { put, takeEvery } from "redux-saga/effects";
import { login, logOut } from "../API/API";
import { SET_USER_LOGIN } from "../store/loginReducer";
import { register } from "./../API/API";

function* loginLogicWorker(data) {
	const { email, password } = data;
	yield login(email, password);
	yield put({ type: SET_USER_LOGIN, email, isLogin: true });
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
	const { email, password } = data;
	yield register(email, password);
}

export function* registerLogicWatcher() {
	yield takeEvery("REGISTER", registerLogicWorker);
}
