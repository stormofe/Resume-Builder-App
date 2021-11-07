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
	getSoftSkillsFromDBWatcher,
	saveSoftSkillsAtAllWatcher,
	deleteSoftSkillFromDBWatcher,
	getLangSkillsFromDBWatcher,
	saveLangSkillsAtAllWatcher,
	deleteLangSkillFromDBWatcher,
	getCustomBlockFromDBWatcher,
	deleteCustomBlockFromDBWatcher,
	saveCustomBlockWatcher,
} from "./formsSaga";
import { loginLogicWatcher, logoutLogicWatcher, registerLogicWatcher } from "./loginsSaga";
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
		loginLogicWatcher,
		logoutLogicWatcher,
		registerLogicWatcher,
		getSoftSkillsFromDBWatcher,
		saveSoftSkillsAtAllWatcher,
		deleteSoftSkillFromDBWatcher,
		getLangSkillsFromDBWatcher,
		saveLangSkillsAtAllWatcher,
		deleteLangSkillFromDBWatcher,
		getCustomBlockFromDBWatcher,
		saveCustomBlockWatcher,
		deleteCustomBlockFromDBWatcher,
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
