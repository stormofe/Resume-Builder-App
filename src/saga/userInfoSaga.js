import { takeEvery, put, call, select } from "redux-saga/effects";
import { getDataFromDB, getPhoto, setDataAtDB, setStorage, setUserInfoAtDB } from "../API/API";
import { CLEAN_INFO_LINE, SET_PHOTO_FROM_DB, SET_USER_INFO } from "../store/userReducer";

export function* getUserInfoFromDBWorker() {
	//const data = yield getUserInfoFromDB();
	const result = yield getDataFromDB("info");
	const edu = Object.entries(result.edu).map((item) => item[1]),
		exp = Object.entries(result.exp).map((item) => item[1]),
		custom = Object.entries(result.custom).map((item) => item[1]),
		langSkills = Object.entries(result.langSkills).map((item) => item[1]),
		skills = Object.entries(result.skills).map((item) => item[1]),
		softSkills = Object.entries(result.softSkills).map((item) => item[1]),
		socials = Object.entries(result.socials);

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
}

function* cleanMainInfoLineFromDBWorker(data) {
	const name = yield data.payload;
	yield setDataAtDB({ dataName: name, data: "" });
	yield call(getUserInfoFromDBWorker);
}

export function* cleanMainInfoLineFromDB() {
	yield takeEvery("DELETE_LINE", cleanMainInfoLineFromDBWorker);
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

function* getPhotoFromDBWorker() {
	const photo = yield getPhoto();
	yield put({ type: SET_PHOTO_FROM_DB, payload: photo });
}
export function* getPhotoFromDBWatcher() {
	yield takeEvery("GET_PHOTO", getPhotoFromDBWorker);
}

function* saveUserPhotoWorker(data) {
	const photo = data.payload;
	yield setStorage(photo);
	const newPhoto = yield getPhoto();
	yield put({ type: SET_PHOTO_FROM_DB, payload: newPhoto });
}
export function* saveUserPhotoWatcher() {
	yield takeEvery("SAVE_PHOTO", saveUserPhotoWorker);
}
