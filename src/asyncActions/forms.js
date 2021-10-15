import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { saveSkillsAction } from "../store/formsReducer";

let arr = [];
export const getSkills = async (email) => {
	const user = doc(db, "user", `${email.email}`);
	const result = await (await getDoc(user))
		.data()
		.skills.then((result) => (arr = Object.entries(result).map((item) => item[1])));
	debugger;
	//arr = await Object.entries(result).map((item) => item[1]);
	return arr;
};

export const setSkillsAtState = (email) => {
	//debugger;

	getSkills(email);
	return function (dispatch) {
		//debugger;
		dispatch(saveSkillsAction(arr));
	};
};

//export const saveSkills = async () => {
//	const arr = [...gettingSkills, ...skills];
//	await updateDoc(user, { skills: { ...arr } })
//		.then(() => setSkills([]))
//		.then(() => getSkills());
//};

//const deleteSkillFromDB = async (index) => {
//	const arr = gettingSkills.filter((skill, i) => (i !== index ? skill : false));
//	await updateDoc(user, {
//		skills: deleteField(),
//	})
//		.then(() => {
//			updateDoc(user, { skills: { ...arr } });
//		})
//		.then(() => setSkills([]))
//		.then(() => getSkills());
//};
