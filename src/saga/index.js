import { call, all, spawn } from "redux-saga/effects";
import {
	addEduWatcher,
	deleteSkillFromDBWatcher,
	getEduFromDBWatcher,
	saveEduWatcher,
	saveSkillsAtAllWatcher,
	getSkillsFromDBWatcher,
	deleteEduFromDBWatcher,
} from "./formsSaga";
export function* rootWatcher() {
	const sagas = [
		getSkillsFromDBWatcher,
		saveSkillsAtAllWatcher,
		deleteSkillFromDBWatcher,
		addEduWatcher,
		saveEduWatcher,
		getEduFromDBWatcher,
		deleteEduFromDBWatcher,
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
