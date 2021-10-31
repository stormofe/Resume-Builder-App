import { call, all, spawn } from "redux-saga/effects";
import {
	deleteSkillFromDBWatcher,
	getEduFromDBWatcher,
	saveEduWatcher,
	saveSkillsAtAllWatcher,
	getSkillsFromDBWatcher,
	deleteEduFromDBWatcher,
	getExpFromDBWatcher,
	saveExpWatcher,
	deleteExpFromDBWatcher,
} from "./formsSaga";
import { getUserInfoFromDBWatcher, saveUserInfoAtDBWatcher } from "./userInfoSaga";

export function* rootWatcher() {
	const sagas = [
		getSkillsFromDBWatcher,
		saveSkillsAtAllWatcher,
		deleteSkillFromDBWatcher,
		saveEduWatcher,
		getEduFromDBWatcher,
		deleteEduFromDBWatcher,
		saveUserInfoAtDBWatcher,
		getUserInfoFromDBWatcher,
		getExpFromDBWatcher,
		saveExpWatcher,
		deleteExpFromDBWatcher,
	];

	//yield all([getUserWithAuth(), setSkillsFromDBWatcher()]);
	//yield all([getUserWithAuth(), fetchSkillsWatcher(), saveSkillsWatcher()]);
	const retrySagas = yield sagas.map((saga) => {
		return spawn(function* () {
			while (true) {
				try {
					yield call(saga);
					break;
				} catch (e) {
					//console.log(e);
				}
			}
		});
	});
	yield all(retrySagas);
}
