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
	getSocialsFromDBWatcher,
	saveSocialsAtAllWatcher,
	deleteSocialsFromDBWatcher,
	saveMainInfoAtDBWatcher,
	setErrorFalseWatcher,
	setSuccessFalseWatcher,
} from "./formsSaga";
import { loginLogicWatcher, logoutLogicWatcher, registerLogicWatcher } from "./loginsSaga";
import {
	cleanMainInfoLineFromDB,
	getPhotoFromDBWatcher,
	getUserInfoFromDBWatcher,
	saveUserInfoAtDBWatcher,
	saveUserPhotoWatcher,
} from "./userInfoSaga";

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
		saveUserPhotoWatcher,
		getPhotoFromDBWatcher,
		getSocialsFromDBWatcher,
		saveSocialsAtAllWatcher,
		deleteSocialsFromDBWatcher,
		saveMainInfoAtDBWatcher,
		cleanMainInfoLineFromDB,
		setErrorFalseWatcher,
		setSuccessFalseWatcher,
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
