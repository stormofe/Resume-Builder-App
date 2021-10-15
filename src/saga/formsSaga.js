import { getAuth } from "@firebase/auth";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { FETCH_SKILLS, saveSkillsAction, saveSkillsAtDBAction, SAVE_SKILLS_FROM_STATE } from "../store/formsReducer";
import { call, put, takeEvery, select } from "redux-saga/effects";

//const currentUser = getAuth().currentUser;
//console.log(currentUser);

const getSkillsFromBD = async (currentUser) => {
	const user = await doc(db, "user", `${currentUser.user.email}`);
	const data = await (await getDoc(user)).data().skills;
	return data;
	console.log(data);
};

const saveSkillsAtDB = async (skills) => {
	//const currentUser = await getAuth().currentUser.email;
	const user = doc(db, "user", `qwerty@gmail.com`);
	await updateDoc(user, { skills: { ...skills } });
};

function* saveSkillsAtDBWorker() {
	const skills = yield select((s) => s.forms.skills);
	console.log(skills, "skills1");
	yield saveSkillsAtDB(skills);
}

function* saveSkillsAtStateWorker(skills) {
	yield put(saveSkillsAction(skills));
}

function* fetchUserSkillsFromDBWorker(user) {
	const data = yield getSkillsFromBD(user);
	const arr = yield Object.entries(data).map((item) => item[1]);
	yield saveSkillsAction(arr);
}

export function* fetchSkillsWatcher() {
	yield takeEvery(FETCH_SKILLS, fetchUserSkillsFromDBWorker);
}

export function* saveSkillsWatcher() {
	yield takeEvery(SAVE_SKILLS_FROM_STATE, saveSkillsAtStateWorker);
	yield takeEvery(saveSkillsAtDBAction, saveSkillsAtDBWorker);
}
