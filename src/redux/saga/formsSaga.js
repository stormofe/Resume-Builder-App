import { getDataFromDB, setDataAtDB } from "../../API/API";
import { takeEvery, call, put, select } from "redux-saga/effects";

import {
	DELETE_CUST_BLOCK_FROM_DB,
	DELETE_EDU_FROM_DB,
	DELETE_EXP_FROM_DB,
	DELETE_LANG_SKILL_FROM_DB,
	DELETE_SKILL_FROM_DB,
	DELETE_SOCIAL_FROM_DB,
	DELETE_SOFT_SKILL_FROM_DB,
	SAVE_CUST_BLOCK_FROM_PAGE,
	SAVE_EDU_FROM_PAGE,
	SAVE_EXP_FROM_PAGE,
	SAVE_LANG_SKILLS_FROM_PAGE,
	SAVE_SKILLS_FROM_PAGE,
	SAVE_SOCIALS_FROM_PAGE,
	SAVE_SOFT_SKILLS_FROM_PAGE,
	SET_CUST_BLOCK_FROM_DB,
	SET_EDU_FROM_DB,
	SET_ERROR,
	SET_ERROR_FALSE,
	SET_EXP_FROM_DB,
	SET_LANG_SKILLS_FROM_DB,
	SET_LOADING,
	SET_MAIN_INFO,
	SET_SKILLS_FROM_DB,
	SET_SOCIALS_FROM_DB,
	SET_SOFT_SKILLS_FROM_DB,
	SET_SUCCESS_FALSE,
} from "../store/formsReducer";
import { getUserInfoFromDBWorker } from "./userInfoSaga";
import { SET_SUCCESS } from "./../store/formsReducer";

const stateSkills = (state) => state.forms.skills;
const stateSoftSkills = (state) => state.forms.softSkills;
const stateLangSkills = (state) => state.forms.langSkills;
const stateEdu = (state) => state.forms.edu;
const stateExp = (state) => state.forms.exp;
const stateCustom = (state) => state.forms.custom;
const stateSocials = (state) => state.forms.socials;
const stateMainInfo = (state) => state.forms.mainInfo;

//ok
function* saveMainInfoAtDBWorker(data) {
	yield put({ type: SET_LOADING, name: "mainInfo", activity: true });
	const mainInfoObj = data.payload;
	yield put({ type: SET_MAIN_INFO, payload: mainInfoObj });
	const fullMainInfoObj = yield select(stateMainInfo);
	const arrInfo = yield Object.entries(fullMainInfoObj);
	const filteredArrInfo = yield arrInfo.filter(([key, value]) => value !== "");
	const filteredObjInfo = yield Object.fromEntries(filteredArrInfo);
	//const result = yield setUserInfoAtDB(filteredObjInfo);
	const result = yield setDataAtDB({ dataName: "mainInfo", data: filteredObjInfo });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getUserInfoFromDBWorker);
		yield put({ type: SET_LOADING, name: "mainInfo", activity: false });
		return;
	}
	yield put({ type: SET_SUCCESS });
	yield call(getUserInfoFromDBWorker);
	yield put({ type: SET_LOADING, name: "mainInfo", activity: false });
}

export function* saveMainInfoAtDBWatcher() {
	yield takeEvery("SAVE_MAIN_INFO", saveMainInfoAtDBWorker);
}

function* getSkillsFromDBWorker() {
	yield put({ type: SET_LOADING, name: "skills", activity: true });
	const objSkills = yield getDataFromDB("skills");
	const skills = yield Object.entries(objSkills);
	const newSkills = yield skills.map((arr) => arr[1]);
	yield put({ type: SET_SKILLS_FROM_DB, payload: newSkills });
	yield put({ type: SET_LOADING, name: "skills", activity: false });
}
export function* getSkillsFromDBWatcher() {
	yield takeEvery("FETCH_SKILLS", getSkillsFromDBWorker);
}

function* saveSkillsWorker(data) {
	const skills = data.payload;
	yield put({ type: SET_LOADING, name: "skills", activity: true });
	yield put({ type: SAVE_SKILLS_FROM_PAGE, payload: skills });
	const allSkills = yield select(stateSkills);
	const result = yield setDataAtDB({ dataName: "skills", data: allSkills });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getSkillsFromDBWorker);
		yield put({ type: SET_LOADING, name: "skills", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "skills", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* saveSkillsAtAllWatcher() {
	yield takeEvery("SAVE_SKILLS", saveSkillsWorker);
}

function* deleteSkillFromDBWorker(data) {
	const skills = data.payload;
	yield put({ type: SET_LOADING, name: "skills", activity: true });
	yield put({ type: DELETE_SKILL_FROM_DB, payload: skills });
	const allSkills = yield select(stateSkills);
	const result = yield setDataAtDB({ dataName: "skills", data: allSkills });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getSkillsFromDBWorker);
		yield put({ type: SET_LOADING, name: "skills", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "skills", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* deleteSkillFromDBWatcher() {
	yield takeEvery("DELETE_SKILL", deleteSkillFromDBWorker);
}

function* getSoftSkillsFromDBWorker() {
	yield put({ type: SET_LOADING, name: "softSkills", activity: true });
	const objSkills = yield getDataFromDB("softSkills");
	const skills = yield Object.entries(objSkills);
	const newSkills = yield skills.map((arr) => arr[1]);
	yield put({ type: SET_SOFT_SKILLS_FROM_DB, payload: newSkills });
	yield put({ type: SET_LOADING, name: "softSkills", activity: false });
}
export function* getSoftSkillsFromDBWatcher() {
	yield takeEvery("FETCH_SOFT_SKILLS", getSoftSkillsFromDBWorker);
}

function* saveSoftSkillsWorker(data) {
	yield put({ type: SET_LOADING, name: "softSkills", activity: true });
	const skills = data.payload;
	yield put({ type: SAVE_SOFT_SKILLS_FROM_PAGE, payload: skills });
	const allSkills = yield select(stateSoftSkills);
	const result = yield setDataAtDB({ dataName: "softSkills", data: allSkills });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getSoftSkillsFromDBWorker);
		yield put({ type: SET_LOADING, name: "softSkills", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "softSkills", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* saveSoftSkillsAtAllWatcher() {
	yield takeEvery("SAVE_SOFT_SKILLS", saveSoftSkillsWorker);
}

function* deleteSoftSkillFromDBWorker(data) {
	yield put({ type: SET_LOADING, name: "softSkills", activity: true });
	const skills = data.payload;
	yield put({ type: DELETE_SOFT_SKILL_FROM_DB, payload: skills });
	const allSkills = yield select(stateSoftSkills);
	const result = yield setDataAtDB({ dataName: "softSkills", data: allSkills });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getSoftSkillsFromDBWorker);
		yield put({ type: SET_LOADING, name: "softSkills", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "softSkills", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* deleteSoftSkillFromDBWatcher() {
	yield takeEvery("DELETE_SOFT_SKILL", deleteSoftSkillFromDBWorker);
}

function* getLangSkillsFromDBWorker() {
	yield put({ type: SET_LOADING, name: "langSkills", activity: true });
	const objSkills = yield getDataFromDB("langSkills");
	const skills = yield Object.entries(objSkills);
	const newSkills = yield skills.map((arr) => arr[1]);
	yield put({ type: SET_LANG_SKILLS_FROM_DB, payload: newSkills });
	yield put({ type: SET_LOADING, name: "langSkills", activity: false });
}
export function* getLangSkillsFromDBWatcher() {
	yield takeEvery("FETCH_LANG_SKILLS", getLangSkillsFromDBWorker);
}

function* saveLangSkillsWorker(data) {
	yield put({ type: SET_LOADING, name: "langSkills", activity: true });
	const skills = data.payload;
	yield put({ type: SAVE_LANG_SKILLS_FROM_PAGE, payload: skills });
	const allSkills = yield select(stateLangSkills);
	const result = yield setDataAtDB({ dataName: "langSkills", data: allSkills });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getLangSkillsFromDBWorker);
		yield put({ type: SET_LOADING, name: "langSkills", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "langSkills", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* saveLangSkillsAtAllWatcher() {
	yield takeEvery("SAVE_LANG_SKILLS", saveLangSkillsWorker);
}

function* deleteLangSkillFromDBWorker(data) {
	yield put({ type: SET_LOADING, name: "langSkills", activity: true });
	const skills = data.payload;
	yield put({ type: DELETE_LANG_SKILL_FROM_DB, payload: skills });
	const allSkills = yield select(stateLangSkills);
	const result = yield setDataAtDB({ dataName: "langSkills", data: allSkills });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getLangSkillsFromDBWorker);
		yield put({ type: SET_LOADING, name: "langSkills", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "langSkills", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* deleteLangSkillFromDBWatcher() {
	yield takeEvery("DELETE_LANG_SKILL", deleteLangSkillFromDBWorker);
}

function* getEduFromDBWorker() {
	yield put({ type: SET_LOADING, name: "edu", activity: true });
	const objEdu = yield getDataFromDB("edu");
	const edu = yield Object.entries(objEdu);
	const newEdu = yield edu.map((arr) => arr[1]);
	yield put({ type: SET_EDU_FROM_DB, payload: newEdu });
	yield put({ type: SET_LOADING, name: "edu", activity: false });
}
export function* getEduFromDBWatcher() {
	yield takeEvery("GET_EDU_FROM_DB", getEduFromDBWorker);
}

function* saveEduWorker(data) {
	yield put({ type: SET_LOADING, name: "edu", activity: true });
	const newEdu = data.payload;
	yield put({ type: SAVE_EDU_FROM_PAGE, payload: newEdu });
	const edu = yield select(stateEdu);
	const result = yield setDataAtDB({ dataName: "edu", data: edu });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getEduFromDBWorker);
		yield put({ type: SET_LOADING, name: "edu", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "edu", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* saveEduWatcher() {
	yield takeEvery("SAVE_EDU", saveEduWorker);
}

function* deleteEduFromDBWorker(data) {
	yield put({ type: SET_LOADING, name: "edu", activity: true });
	const edu = data.payload;
	yield put({ type: DELETE_EDU_FROM_DB, payload: edu });
	const allEdu = yield select(stateEdu);
	const result = yield setDataAtDB({ dataName: "edu", data: allEdu });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getEduFromDBWorker);
		yield put({ type: SET_LOADING, name: "edu", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "edu", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* deleteEduFromDBWatcher() {
	yield takeEvery("DELETE_EDU", deleteEduFromDBWorker);
}

function* getExpFromDBWorker() {
	yield put({ type: SET_LOADING, name: "exp", activity: true });
	const objExp = yield getDataFromDB("exp");
	const edu = yield Object.entries(objExp);
	const newExp = yield edu.map((arr) => arr[1]);
	yield put({ type: SET_EXP_FROM_DB, payload: newExp });
	yield put({ type: SET_LOADING, name: "exp", activity: false });
}
export function* getExpFromDBWatcher() {
	yield takeEvery("GET_EXP_FROM_DB", getExpFromDBWorker);
}

function* saveExpWorker(data) {
	yield put({ type: SET_LOADING, name: "exp", activity: true });
	const newEdu = data.payload;
	yield put({ type: SAVE_EXP_FROM_PAGE, payload: newEdu });
	const exp = yield select(stateExp);
	const result = yield setDataAtDB({ dataName: "exp", data: exp });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getExpFromDBWorker);
		yield put({ type: SET_LOADING, name: "exp", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "exp", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* saveExpWatcher() {
	yield takeEvery("SAVE_EXP", saveExpWorker);
}

function* deleteExpFromDBWorker(data) {
	yield put({ type: SET_LOADING, name: "exp", activity: true });
	const exp = data.payload;
	yield put({ type: DELETE_EXP_FROM_DB, payload: exp });
	const allExp = yield select(stateEdu);
	const result = yield setDataAtDB({ dataName: "exp", data: allExp });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getExpFromDBWorker);
		yield put({ type: SET_LOADING, name: "exp", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "exp", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* deleteExpFromDBWatcher() {
	yield takeEvery("DELETE_EXP", deleteExpFromDBWorker);
}

function* getCustomBlockFromDBWorker() {
	yield put({ type: SET_LOADING, name: "custom", activity: true });
	const objBlocks = yield getDataFromDB("custom");
	const custom = yield Object.entries(objBlocks);
	const newECustom = yield custom.map((arr) => arr[1]);
	yield put({ type: SET_CUST_BLOCK_FROM_DB, payload: newECustom });
	yield put({ type: SET_LOADING, name: "custom", activity: false });
}
export function* getCustomBlockFromDBWatcher() {
	yield takeEvery("GET_CUST_BLOCK_FROM_DB", getCustomBlockFromDBWorker);
}

function* saveCustomBlockWorker(data) {
	yield put({ type: SET_LOADING, name: "custom", activity: true });
	const newBlock = data.payload;
	yield put({ type: SAVE_CUST_BLOCK_FROM_PAGE, payload: newBlock });
	const block = yield select(stateCustom);
	const result = yield setDataAtDB({ dataName: "custom", data: block });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getCustomBlockFromDBWorker);
		yield put({ type: SET_LOADING, name: "custom", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "custom", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* saveCustomBlockWatcher() {
	yield takeEvery("SAVE_CUST_BLOCK", saveCustomBlockWorker);
}

function* deleteCustomBlockFromDBWorker(data) {
	yield put({ type: SET_LOADING, name: "custom", activity: true });
	const block = data.payload;
	yield put({ type: DELETE_CUST_BLOCK_FROM_DB, payload: block });
	const allBlocks = yield select(stateCustom);
	const result = yield setDataAtDB({ dataName: "custom", data: allBlocks });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getCustomBlockFromDBWorker);
		yield put({ type: SET_LOADING, name: "custom", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "custom", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* deleteCustomBlockFromDBWatcher() {
	yield takeEvery("DELETE_CUST_BLOCK", deleteCustomBlockFromDBWorker);
}

function* getSocialsFromDBWorker() {
	yield put({ type: SET_LOADING, name: "socials", activity: true });
	const objSocials = yield getDataFromDB("socials");
	const socials = yield Object.entries(objSocials);
	const newSocials = yield socials.map((arr) => arr[1]);
	yield put({ type: SET_SOCIALS_FROM_DB, payload: newSocials });
	yield put({ type: SET_LOADING, name: "socials", activity: false });
}
export function* getSocialsFromDBWatcher() {
	yield takeEvery("FETCH_SOCIALS", getSocialsFromDBWorker);
}
//ok
function* saveSocialsWorker(data) {
	yield put({ type: SET_LOADING, name: "socials", activity: true });
	const socials = data.payload;
	yield put({ type: SAVE_SOCIALS_FROM_PAGE, payload: socials });
	const allSocials = yield select(stateSocials);
	const result = yield setDataAtDB({ dataName: "socials", data: allSocials });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getSocialsFromDBWorker);
		yield put({ type: SET_LOADING, name: "socials", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "socials", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* saveSocialsAtAllWatcher() {
	yield takeEvery("SAVE_SOCIALS", saveSocialsWorker);
}

function* deleteSocialFromDBWorker(data) {
	yield put({ type: SET_LOADING, name: "socials", activity: true });
	const socials = data.payload;
	yield put({ type: DELETE_SOCIAL_FROM_DB, payload: socials });
	const allSocials = yield select(stateSocials);
	const result = yield setDataAtDB({ dataName: "socials", data: allSocials });
	if (result) {
		yield put({ type: SET_ERROR, payload: result });
		yield call(getSocialsFromDBWorker);
		yield put({ type: SET_LOADING, name: "socials", activity: false });
		return;
	}
	yield put({ type: SET_LOADING, name: "socials", activity: false });
	yield put({ type: SET_SUCCESS });
}
export function* deleteSocialsFromDBWatcher() {
	yield takeEvery("DELETE_SOCIAL", deleteSocialFromDBWorker);
}

function* setErrorFalseWorker() {
	yield put({ type: SET_ERROR_FALSE });
}

export function* setErrorFalseWatcher() {
	yield takeEvery("ERROR_FALSE", setErrorFalseWorker);
}

function* setSuccessFalseWorker() {
	yield put({ type: SET_SUCCESS_FALSE });
}

export function* setSuccessFalseWatcher() {
	yield takeEvery("SUCCESS_FALSE", setSuccessFalseWorker);
}
