import { getSkillsFromBD, setSkillsAtDB } from "../API/API";
import { takeEvery, call, put, select } from "redux-saga/effects";
import { DELETE_SKILL_FROM_DB, SAVE_SKILLS_FROM_PAGE, SET_SKILLS_FROM_DB } from "../store/formsReducer";

const stateSkills = (state) => state.forms.skills;

function* saveSkillsFromDBWorker() {
	const objSkills = yield call(getSkillsFromBD);
	const skills = yield Object.entries(objSkills);
	const newSkills = yield skills.map((arr) => arr[1]);
	yield put({ type: SET_SKILLS_FROM_DB, payload: newSkills });
}

function* saveSkillsAtStateWorker(data) {
	const skills = data.payload;
	yield put({ type: SAVE_SKILLS_FROM_PAGE, payload: skills });
	const allSkills = yield select(stateSkills);
	yield setSkillsAtDB(allSkills);
}

function* deleteSkillFromDBWorker(data) {
	const skills = data.payload;
	yield put({ type: DELETE_SKILL_FROM_DB, payload: skills });
	const allSkills = yield select(stateSkills);
	yield setSkillsAtDB(allSkills);
}

export function* skillsFromDBWatcher() {
	yield takeEvery("FETCH_SKILLS", saveSkillsFromDBWorker);
}

export function* saveSkillsAtAllWatcher() {
	yield takeEvery("SAVE_SKILLS", saveSkillsAtStateWorker);
}

export function* deleteSkillFromDBWatcher() {
	yield takeEvery("DELETE_SKILL", deleteSkillFromDBWorker);
}
