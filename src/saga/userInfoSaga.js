import { takeEvery, put, call, select } from "redux-saga/effects";
import { getUserInfoFromDB, setStorage, setUserInfoAtDB } from "../API/API";
import { SET_PHOTO, SET_USER_INFO } from "../store/userReducer";
const statePhoto = (state) => state.user.photo;

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

function* getPhotoFromDBWorker() {}

function* saveUserPhotoWorker(data) {
	const photo = data.payload;
	yield put({ type: SET_PHOTO, payload: photo });
	const userPhoto = yield select(statePhoto);
	yield setStorage(userPhoto);
}
export function* saveUserPhotoWatcher() {
	yield takeEvery("SAVE_PHOTO", saveUserPhotoWorker);
}
