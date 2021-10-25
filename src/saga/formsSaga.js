import { getSkillsFromBD } from "../API/API";
import { takeEvery, call, all, put } from "redux-saga/effects";
import { SET_SKILLS_FROM_DB } from "../store/formsReducer";

function* saveSkillsFromDBWorker() {
	const objSkills = yield call(getSkillsFromBD);
	const skills = yield Object.entries(objSkills);
	yield put({ type: SET_SKILLS_FROM_DB, payload: skills });
}

export default function* skillsWatcher() {
	yield takeEvery("FETCH", saveSkillsFromDBWorker);
}
