import { call, all, spawn } from "redux-saga/effects";
import { deleteSkillFromDBWatcher, saveSkillsAtAllWatcher, skillsFromDBWatcher } from "./formsSaga";
export function* rootWatcher() {
	const sagas = [skillsFromDBWatcher, saveSkillsAtAllWatcher, deleteSkillFromDBWatcher];

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
