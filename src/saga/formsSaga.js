import {
	getEduFromBD,
	getExpFromBD,
	getLangSkillsFromBD,
	getSkillsFromBD,
	getSoftSkillsFromBD,
	setEduAtDB,
	setExpAtDB,
	setLangSkillsAtDB,
	setSkillsAtDB,
	setSoftSkillsAtDB,
} from "../API/API";
import { takeEvery, call, put, select } from "redux-saga/effects";

import {
	DELETE_EDU_FROM_DB,
	DELETE_EXP_FROM_DB,
	DELETE_LANG_SKILL_FROM_DB,
	DELETE_SKILL_FROM_DB,
	DELETE_SOFT_SKILL_FROM_DB,
	SAVE_EDU_FROM_PAGE,
	SAVE_EXP_FROM_PAGE,
	SAVE_LANG_SKILLS_FROM_PAGE,
	SAVE_SKILLS_FROM_PAGE,
	SAVE_SOFT_SKILLS_FROM_PAGE,
	SET_EDU_FROM_DB,
	SET_EXP_FROM_DB,
	SET_LANG_SKILLS_FROM_DB,
	SET_SKILLS_FROM_DB,
	SET_SOFT_SKILLS_FROM_DB,
} from "../store/formsReducer";

const stateSkills = (state) => state.forms.skills;
const stateSoftSkills = (state) => state.forms.softSkills;
const stateLangSkills = (state) => state.forms.langSkills;
const stateEdu = (state) => state.forms.edu;
const stateExp = (state) => state.forms.exp;

function* getSkillsFromDBWorker() {
	const objSkills = yield call(getSkillsFromBD);
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
	yield setSkillsAtDB(allSkills);
}
export function* saveSkillsAtAllWatcher() {
	yield takeEvery("SAVE_SKILLS", saveSkillsWorker);
}

function* deleteSkillFromDBWorker(data) {
	const skills = data.payload;
	yield put({ type: DELETE_SKILL_FROM_DB, payload: skills });
	const allSkills = yield select(stateSkills);
	yield setSkillsAtDB(allSkills);
}
export function* deleteSkillFromDBWatcher() {
	yield takeEvery("DELETE_SKILL", deleteSkillFromDBWorker);
}

function* getSoftSkillsFromDBWorker() {
	const objSkills = yield call(getSoftSkillsFromBD);
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
	yield setSoftSkillsAtDB(allSkills);
}
export function* saveSoftSkillsAtAllWatcher() {
	yield takeEvery("SAVE_SOFT_SKILLS", saveSoftSkillsWorker);
}

function* deleteSoftSkillFromDBWorker(data) {
	const skills = data.payload;
	yield put({ type: DELETE_SOFT_SKILL_FROM_DB, payload: skills });
	const allSkills = yield select(stateSoftSkills);
	yield setSoftSkillsAtDB(allSkills);
}
export function* deleteSoftSkillFromDBWatcher() {
	yield takeEvery("DELETE_SOFT_SKILL", deleteSoftSkillFromDBWorker);
}

function* getLangSkillsFromDBWorker() {
	const objSkills = yield call(getLangSkillsFromBD);
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
	yield setLangSkillsAtDB(allSkills);
}
export function* saveLangSkillsAtAllWatcher() {
	yield takeEvery("SAVE_LANG_SKILLS", saveLangSkillsWorker);
}

function* deleteLangSkillFromDBWorker(data) {
	const skills = data.payload;
	yield put({ type: DELETE_LANG_SKILL_FROM_DB, payload: skills });
	const allSkills = yield select(stateLangSkills);
	yield setLangSkillsAtDB(allSkills);
}
export function* deleteLangSkillFromDBWatcher() {
	yield takeEvery("DELETE_LANG_SKILL", deleteLangSkillFromDBWorker);
}

function* getEduFromDBWorker() {
	const objEdu = yield call(getEduFromBD);
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
	yield setEduAtDB(edu);
	//yield call(saveEduFromDBWorker);
}
export function* saveEduWatcher() {
	yield takeEvery("SAVE_EDU", saveEduWorker);
}

function* deleteEduFromDBWorker(data) {
	const edu = data.payload;
	yield put({ type: DELETE_EDU_FROM_DB, payload: edu });
	const allEdu = yield select(stateEdu);
	yield setEduAtDB(allEdu);
}

export function* deleteEduFromDBWatcher() {
	yield takeEvery("DELETE_EDU", deleteEduFromDBWorker);
}

function* getExpFromDBWorker() {
	const objExp = yield call(getExpFromBD);
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
	yield setExpAtDB(exp);
	//yield call(saveEduFromDBWorker);
}
export function* saveExpWatcher() {
	yield takeEvery("SAVE_EXP", saveExpWorker);
}

function* deleteExpFromDBWorker(data) {
	const exp = data.payload;
	yield put({ type: DELETE_EXP_FROM_DB, payload: exp });
	const allExp = yield select(stateEdu);
	yield setExpAtDB(allExp);
}

export function* deleteExpFromDBWatcher() {
	yield takeEvery("DELETE_EXP", deleteExpFromDBWorker);
}
