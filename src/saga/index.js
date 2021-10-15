import { all } from "redux-saga/effects";
import { fetchSkillsWatcher, saveSkillsWatcher } from "./formsSaga";

export function* rootWatcher() {
	yield all([fetchSkillsWatcher(), saveSkillsWatcher()]);
}
