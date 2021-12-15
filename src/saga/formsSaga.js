import { getDataFromDB, setDataAtDB, setUserInfoAtDB } from "../API/API";
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
	SET_EXP_FROM_DB,
	SET_LANG_SKILLS_FROM_DB,
	SET_MAIN_INFO,
	SET_SKILLS_FROM_DB,
	SET_SOCIALS_FROM_DB,
	SET_SOFT_SKILLS_FROM_DB,
} from "../store/formsReducer";
import { getUserInfoFromDBWorker } from "./userInfoSaga";

const stateSkills = (state) => state.forms.skills;
const stateSoftSkills = (state) => state.forms.softSkills;
const stateLangSkills = (state) => state.forms.langSkills;
const stateEdu = (state) => state.forms.edu;
const stateExp = (state) => state.forms.exp;
const stateCustom = (state) => state.forms.custom;
const stateSocials = (state) => state.forms.socials;
const stateMainInfo = (state) => state.forms.mainInfo;

function* saveMainInfoAtDBWorker(data) {
	const mainInfoObj = data.payload;
	yield put({ type: SET_MAIN_INFO, payload: mainInfoObj });
	const fullMainInfoObj = yield select(stateMainInfo);
	const arrInfo = yield Object.entries(fullMainInfoObj);
	const filteredArrInfo = yield arrInfo.filter(([key, value]) => value !== "");
	const filteredObjInfo = yield Object.fromEntries(filteredArrInfo);
	yield setUserInfoAtDB(filteredObjInfo);
	yield call(getUserInfoFromDBWorker);
}

export function* saveMainInfoAtDBWatcher() {
	yield takeEvery("SAVE_MAIN_INFO", saveMainInfoAtDBWorker);
}

function* getSkillsFromDBWorker() {
	//const objSkills = yield call(getSkillsFromBD);
	const objSkills = yield getDataFromDB("skills");
	const skills = yield Object.entries(objSkills);
	const newSkills = yield skills.map((arr) => arr[1]);
	yield put({ type: SET_SKILLS_FROM_DB, payload: newSkills });
}
export function* getSkillsFromDBWatcher() {
	yield takeEvery("FETCH_SKILLS", getSkillsFromDBWorker);
}

function* saveSkillsWorker(data) {
	const skills = data.payload;
	yield put({ type: SAVE_SKILLS_FROM_PAGE, payload: skills });
	const allSkills = yield select(stateSkills);
	//const result = yield setSkillsAtDB(allSkills);
	//console.log(result);
	yield setDataAtDB({ dataName: "skills", data: allSkills });
}
export function* saveSkillsAtAllWatcher() {
	yield takeEvery("SAVE_SKILLS", saveSkillsWorker);
}

function* deleteSkillFromDBWorker(data) {
	const skills = data.payload;
	yield put({ type: DELETE_SKILL_FROM_DB, payload: skills });
	const allSkills = yield select(stateSkills);
	yield setDataAtDB({ dataName: "skills", data: allSkills });
}
export function* deleteSkillFromDBWatcher() {
	yield takeEvery("DELETE_SKILL", deleteSkillFromDBWorker);
}

function* getSoftSkillsFromDBWorker() {
	//const objSkills = yield call(getSoftSkillsFromBD);
	const objSkills = yield getDataFromDB("softSkills");
	const skills = yield Object.entries(objSkills);
	const newSkills = yield skills.map((arr) => arr[1]);
	yield put({ type: SET_SOFT_SKILLS_FROM_DB, payload: newSkills });
}
export function* getSoftSkillsFromDBWatcher() {
	yield takeEvery("FETCH_SOFT_SKILLS", getSoftSkillsFromDBWorker);
}

function* saveSoftSkillsWorker(data) {
	debugger;
	const skills = data.payload;
	yield put({ type: SAVE_SOFT_SKILLS_FROM_PAGE, payload: skills });
	const allSkills = yield select(stateSoftSkills);
	//yield setSoftSkillsAtDB(allSkills);
	yield setDataAtDB({ dataName: "softSkills", data: allSkills });
}
export function* saveSoftSkillsAtAllWatcher() {
	yield takeEvery("SAVE_SOFT_SKILLS", saveSoftSkillsWorker);
}

function* deleteSoftSkillFromDBWorker(data) {
	const skills = data.payload;
	yield put({ type: DELETE_SOFT_SKILL_FROM_DB, payload: skills });
	const allSkills = yield select(stateSoftSkills);
	yield setDataAtDB({ dataName: "softSkills", data: allSkills });
}
export function* deleteSoftSkillFromDBWatcher() {
	yield takeEvery("DELETE_SOFT_SKILL", deleteSoftSkillFromDBWorker);
}

function* getLangSkillsFromDBWorker() {
	//const objSkills = yield call(getLangSkillsFromBD);
	const objSkills = yield getDataFromDB("langSkills");
	const skills = yield Object.entries(objSkills);
	const newSkills = yield skills.map((arr) => arr[1]);
	yield put({ type: SET_LANG_SKILLS_FROM_DB, payload: newSkills });
}
export function* getLangSkillsFromDBWatcher() {
	yield takeEvery("FETCH_LANG_SKILLS", getLangSkillsFromDBWorker);
}

function* saveLangSkillsWorker(data) {
	const skills = data.payload;
	yield put({ type: SAVE_LANG_SKILLS_FROM_PAGE, payload: skills });
	const allSkills = yield select(stateLangSkills);
	yield setDataAtDB({ dataName: "langSkills", data: allSkills });
}
export function* saveLangSkillsAtAllWatcher() {
	yield takeEvery("SAVE_LANG_SKILLS", saveLangSkillsWorker);
}

function* deleteLangSkillFromDBWorker(data) {
	const skills = data.payload;
	yield put({ type: DELETE_LANG_SKILL_FROM_DB, payload: skills });
	const allSkills = yield select(stateLangSkills);
	yield setDataAtDB({ dataName: "langSkills", data: allSkills });
}
export function* deleteLangSkillFromDBWatcher() {
	yield takeEvery("DELETE_LANG_SKILL", deleteLangSkillFromDBWorker);
}

function* getEduFromDBWorker() {
	//const objEdu = yield call(getEduFromBD);
	const objEdu = yield getDataFromDB("edu");
	const edu = yield Object.entries(objEdu);
	const newEdu = yield edu.map((arr) => arr[1]);
	//debugger;
	yield put({ type: SET_EDU_FROM_DB, payload: newEdu });
}
export function* getEduFromDBWatcher() {
	yield takeEvery("GET_EDU_FROM_DB", getEduFromDBWorker);
}

function* saveEduWorker(data) {
	const newEdu = data.payload;
	yield put({ type: SAVE_EDU_FROM_PAGE, payload: newEdu });
	const edu = yield select(stateEdu);
	//yield setEduAtDB(edu);
	yield setDataAtDB({ dataName: "edu", data: edu });
}
export function* saveEduWatcher() {
	yield takeEvery("SAVE_EDU", saveEduWorker);
}

function* deleteEduFromDBWorker(data) {
	const edu = data.payload;
	yield put({ type: DELETE_EDU_FROM_DB, payload: edu });
	const allEdu = yield select(stateEdu);
	yield setDataAtDB({ dataName: "edu", data: allEdu });
}
export function* deleteEduFromDBWatcher() {
	yield takeEvery("DELETE_EDU", deleteEduFromDBWorker);
}

function* getExpFromDBWorker() {
	//const objExp = yield call(getExpFromBD);
	const objExp = yield getDataFromDB("exp");
	const edu = yield Object.entries(objExp);
	const newExp = yield edu.map((arr) => arr[1]);
	//debugger;
	yield put({ type: SET_EXP_FROM_DB, payload: newExp });
}
export function* getExpFromDBWatcher() {
	yield takeEvery("GET_EXP_FROM_DB", getExpFromDBWorker);
}

function* saveExpWorker(data) {
	const newEdu = data.payload;
	yield put({ type: SAVE_EXP_FROM_PAGE, payload: newEdu });
	const exp = yield select(stateExp);
	//yield setExpAtDB(exp);
	yield setDataAtDB({ dataName: "exp", data: exp });
}
export function* saveExpWatcher() {
	yield takeEvery("SAVE_EXP", saveExpWorker);
}

function* deleteExpFromDBWorker(data) {
	const exp = data.payload;
	yield put({ type: DELETE_EXP_FROM_DB, payload: exp });
	const allExp = yield select(stateEdu);
	yield setDataAtDB({ dataName: "exp", data: allExp });
}
export function* deleteExpFromDBWatcher() {
	yield takeEvery("DELETE_EXP", deleteExpFromDBWorker);
}

function* getCustomBlockFromDBWorker() {
	//const objBlocks = yield call(getCustomBlockFromBD);
	const objBlocks = yield getDataFromDB("custom");
	const custom = yield Object.entries(objBlocks);
	const newECustom = yield custom.map((arr) => arr[1]);
	//debugger;
	yield put({ type: SET_CUST_BLOCK_FROM_DB, payload: newECustom });
}
export function* getCustomBlockFromDBWatcher() {
	yield takeEvery("GET_CUST_BLOCK_FROM_DB", getCustomBlockFromDBWorker);
}

function* saveCustomBlockWorker(data) {
	const newBlock = data.payload;
	yield put({ type: SAVE_CUST_BLOCK_FROM_PAGE, payload: newBlock });
	const block = yield select(stateCustom);
	//yield setCustomBlockAtDB(block);
	yield setDataAtDB({ dataName: "custom", data: block });
}
export function* saveCustomBlockWatcher() {
	yield takeEvery("SAVE_CUST_BLOCK", saveCustomBlockWorker);
}

function* deleteCustomBlockFromDBWorker(data) {
	const block = data.payload;
	yield put({ type: DELETE_CUST_BLOCK_FROM_DB, payload: block });
	const allBlocks = yield select(stateCustom);
	yield setDataAtDB({ dataName: "custom", data: allBlocks });
}
export function* deleteCustomBlockFromDBWatcher() {
	yield takeEvery("DELETE_CUST_BLOCK", deleteCustomBlockFromDBWorker);
}

function* getSocialsFromDBWorker() {
	//const objSocials = yield call(getSocialsFromBD);
	const objSocials = yield getDataFromDB("socials");
	const socials = yield Object.entries(objSocials);
	const newSocials = yield socials.map((arr) => arr[1]);
	yield put({ type: SET_SOCIALS_FROM_DB, payload: newSocials });
}
export function* getSocialsFromDBWatcher() {
	yield takeEvery("FETCH_SOCIALS", getSocialsFromDBWorker);
}

function* saveSocialsWorker(data) {
	const socials = data.payload;
	yield put({ type: SAVE_SOCIALS_FROM_PAGE, payload: socials });
	const allSocials = yield select(stateSocials);
	//yield setSocialsAtDB(allSocials);
	yield setDataAtDB({ dataName: "socials", data: allSocials });
}
export function* saveSocialsAtAllWatcher() {
	yield takeEvery("SAVE_SOCIALS", saveSocialsWorker);
}

function* deleteSocialFromDBWorker(data) {
	const socials = data.payload;
	yield put({ type: DELETE_SOCIAL_FROM_DB, payload: socials });
	const allSocials = yield select(stateSocials);
	yield setDataAtDB({ dataName: "socials", data: allSocials });
}
export function* deleteSocialsFromDBWatcher() {
	yield takeEvery("DELETE_SOCIAL", deleteSocialFromDBWorker);
}
