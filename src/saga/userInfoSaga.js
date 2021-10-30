import { takeEvery, put, call } from "redux-saga/effects";
import { getUserInfoFromDB, setUserInfoAtDB } from "../API/API";
import { SET_USER_INFO } from "../store/userReducer";

function* getUserInfoFromDBWorker() {
	const data = yield getUserInfoFromDB();
	//yield console.log(data);
	yield put({ type: SET_USER_INFO, payload: data });
}

export function* getUserInfoFromDBWatcher() {
	yield takeEvery("GET_INFO", getUserInfoFromDBWorker);
}

function* saveUserInfoAtDBWorker(data) {
	const info = data.payload;
	const arrInfo = yield Object.entries(info);
	const filteredArrInfo = yield arrInfo.filter(([key, value]) => value !== "");
	const filteredObjInfo = yield Object.fromEntries(filteredArrInfo);
	yield setUserInfoAtDB(filteredObjInfo);
	yield call(getUserInfoFromDBWorker);
}

export function* saveUserInfoAtDBWatcher() {
	yield takeEvery("SAVE_INFO", saveUserInfoAtDBWorker);
}
