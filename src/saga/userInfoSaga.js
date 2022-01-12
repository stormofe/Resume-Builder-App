import { takeEvery, put, call } from "redux-saga/effects";
import { getDataFromDB, getPhoto, setDataAtDB, setStorage } from "../API/API";
import { SET_ERROR, SET_LOADING, SET_SUCCESS } from "../store/formsReducer";
import { SET_ERROR_PHOTO, SET_PHOTO_FROM_DB, SET_USER_INFO } from "../store/userReducer";

//?try to throw an error
export function* getUserInfoFromDBWorker() {
	//const data = yield getUserInfoFromDB();
	yield put({ type: SET_LOADING, name: "mainInfo", activity: true });
	const result = yield getDataFromDB("info");
	const edu = Object.entries(result.edu).map((item) => item[1]),
		exp = Object.entries(result.exp).map((item) => item[1]),
		custom = Object.entries(result.custom).map((item) => item[1]),
		langSkills = Object.entries(result.langSkills).map((item) => item[1]),
		skills = Object.entries(result.skills).map((item) => item[1]),
		softSkills = Object.entries(result.softSkills).map((item) => item[1]),
		socials = result.socials;
	if (result.message) {
		yield put({ type: SET_ERROR, payload: result.message });
		yield put({ type: SET_LOADING, name: "mainInfo", activity: false });
		return;
	}
	const data = {
		...result,
		edu,
		exp,
		custom,
		langSkills,
		skills,
		softSkills,
		socials,
	};
	yield put({ type: SET_USER_INFO, payload: data });
	yield put({ type: SET_LOADING, name: "mainInfo", activity: false });
}

function* cleanMainInfoLineFromDBWorker(data) {
	yield put({ type: SET_LOADING, name: "mainInfo", activity: true });
	const name = yield data.payload;
	const result = yield setDataAtDB({ dataName: name, data: "" });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield put({ type: SET_LOADING, name: "mainInfo", activity: false });
		return;
	}
	yield call(getUserInfoFromDBWorker);
	yield put({ type: SET_LOADING, name: "mainInfo", activity: false });
	yield put({ type: SET_SUCCESS });
}

export function* cleanMainInfoLineFromDB() {
	yield takeEvery("DELETE_LINE", cleanMainInfoLineFromDBWorker);
}

export function* getUserInfoFromDBWatcher() {
	yield takeEvery("GET_INFO", getUserInfoFromDBWorker);
}

function* saveUserInfoAtDBWorker(data) {
	yield put({ type: SET_LOADING, name: "mainInfo", activity: true });
	const info = data.payload;
	const arrInfo = yield Object.entries(info);
	const filteredArrInfo = yield arrInfo.filter(([key, value]) => value !== "");
	const filteredObjInfo = yield Object.fromEntries(filteredArrInfo);
	const result = yield setDataAtDB({ dataName: "mainInfo", data: filteredObjInfo });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield put({ type: SET_LOADING, name: "mainInfo", activity: false });
		return;
	}
	yield call(getUserInfoFromDBWorker);
	yield put({ type: SET_LOADING, name: "mainInfo", activity: false });
	yield put({ type: SET_SUCCESS });
}

export function* saveUserInfoAtDBWatcher() {
	yield takeEvery("SAVE_INFO", saveUserInfoAtDBWorker);
}

function* getPhotoFromDBWorker() {
	yield put({ type: SET_LOADING, name: "photo", activity: true });
	const photo = yield getPhoto();
	if (photo.message) {
		yield put({ type: SET_PHOTO_FROM_DB, payload: null });
		yield setDataAtDB({ dataName: "photoURL", data: "" });
		yield put({ type: SET_LOADING, name: "photo", activity: false });
		return;
	}
	yield put({ type: SET_PHOTO_FROM_DB, payload: photo });
	yield put({ type: SET_LOADING, name: "photo", activity: false });
}
export function* getPhotoFromDBWatcher() {
	yield takeEvery("GET_PHOTO", getPhotoFromDBWorker);
}

function* saveUserPhotoWorker(data) {
	try {
		yield put({ type: SET_LOADING, name: "photo", activity: true });
		const photo = data.payload;
		yield setStorage(photo);
		const newPhoto = yield getPhoto();
		yield put({ type: SET_PHOTO_FROM_DB, payload: newPhoto });
		yield put({ type: SET_LOADING, name: "photo", activity: false });
	} catch (err) {
		const error = err["message"];
		yield put({ type: SET_ERROR_PHOTO, payload: error });
		yield put({ type: SET_LOADING, name: "photo", activity: false });
		return;
	}
}
export function* saveUserPhotoWatcher() {
	yield takeEvery("SAVE_PHOTO", saveUserPhotoWorker);
}
