const formsState = {
	skills: [],
};

export const SAVE_SKILLS = "SAVE_SKILLS";
export const FETCH_SKILLS = "FETCH_SKILLS";
export const SAVE_SKILLS_FROM_STATE = "SAVE_SKILLS_FROM_STATE";
export const SAVE_SKILLS_AT_DB = "SAVE_SKILLS_AT_DB";

export const formsReducer = (state = formsState, action) => {
	switch (action.type) {
		case SAVE_SKILLS:
			debugger;
			return { ...state, skills: [...action.payload.payload] };
		case SAVE_SKILLS_FROM_STATE:
			return { ...state, skills: [...state.skills, ...action.payload] };
		default:
			return state;
	}
};

export const saveSkillsAction = (payload) => ({ type: SAVE_SKILLS, payload });
export const fetchSkills = (user) => ({ type: FETCH_SKILLS, user });
export const saveSkillsFromState = (payload) => ({ type: SAVE_SKILLS_FROM_STATE, payload });
export const saveSkillsAtDBAction = (payload) => ({ type: SAVE_SKILLS_AT_DB, payload });
