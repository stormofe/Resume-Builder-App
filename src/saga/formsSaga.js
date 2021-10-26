import { getSkillsFromBD } from "../API/API";
import { takeEvery, call, takeLatest, all, take, put, fork } from "redux-saga/effects";
import { SAVE_SKILLS_FROM_PAGE, SET_SKILLS_FROM_DB } from "../store/formsReducer";

function* saveSkillsFromDBWorker() {
	const objSkills = yield call(getSkillsFromBD);
	debugger;
	yield console.log(objSkills);
	const skills = yield Object.entries(objSkills);
	console.log(skills);
	yield put({ type: SET_SKILLS_FROM_DB, payload: skills });
}

function* saveSkillsAtStateWorker(skills) {
	console.log(skills);
	//yield put({type: SAVE_SKILLS_FROM_PAGE, payload: skills })
}

export function* skillsFromDBWatcher() {
	yield takeEvery("FETCH_SKILLS", saveSkillsFromDBWorker);
}

export function* saveSkillsAtAllWatcher() {
	yield takeLatest("SAVE_SKILLS", saveSkillsAtStateWorker);
}
