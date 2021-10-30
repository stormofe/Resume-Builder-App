import {
	getEduFromBD,
	getSkillsFromBD,
	getUserInfoFromDB,
	setEduAtDB,
	setSkillsAtDB,
	setUserInfoAtDB,
} from "../API/API";
import { takeEvery, call, put, select } from "redux-saga/effects";

import {
	ADD_EDU,
	DELETE_EDU_FROM_DB,
	DELETE_SKILL_FROM_DB,
	SAVE_EDU_FROM_PAGE,
	SAVE_SKILLS_FROM_PAGE,
	SET_EDU_FROM_DB,
	SET_SKILLS_FROM_DB,
} from "../store/formsReducer";

const stateSkills = (state) => state.forms.skills;
const stateEdu = (state) => state.forms.edu;

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

function* addEdu(obj) {
	yield put({ type: ADD_EDU, payload: obj.payload });
}
export function* addEduWatcher() {
	yield takeEvery("SET_EDU", addEdu);
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
