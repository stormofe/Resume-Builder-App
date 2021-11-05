const formsState = {
	email: "",
	skills: [],
	softSkills: [],
	langSkills: [],
	edu: [],
	exp: [],
};

export const SET_USER = "SET_USER";

export const SET_SKILLS_FROM_DB = "SET_SKILLS_FROM_DB";
export const SAVE_SKILLS_FROM_PAGE = "SAVE_SKILLS_FROM_PAGE";
export const DELETE_SKILL_FROM_DB = "DELETE_SKILL_FROM_DB";

export const SET_SOFT_SKILLS_FROM_DB = "SET_SOFT_SKILLS_FROM_DB";
export const SAVE_SOFT_SKILLS_FROM_PAGE = "SAVE_SOFT_SKILLS_FROM_PAGE";
export const DELETE_SOFT_SKILL_FROM_DB = "DELETE_SOFT_SKILL_FROM_DB";

export const SET_LANG_SKILLS_FROM_DB = "SET_LANG_SKILLS_FROM_DB";
export const SAVE_LANG_SKILLS_FROM_PAGE = "SAVE_LANG_SKILLS_FROM_PAGE";
export const DELETE_LANG_SKILL_FROM_DB = "DELETE_LANG_SKILL_FROM_DB";

export const SET_EDU_FROM_DB = "SET_EDU_FROM_DB";
export const SAVE_EDU_FROM_PAGE = "SAVE_EDU_FROM_PAGE";
export const DELETE_EDU_FROM_DB = "DELETE_EDU_FROM_DB";

export const SET_EXP_FROM_DB = "SET_EXP_FROM_DB";
export const SAVE_EXP_FROM_PAGE = "SAVE_EXP_FROM_PAGE";
export const DELETE_EXP_FROM_DB = "DELETE_EXP_FROM_DB";

export const formsReducer = (state = formsState, action) => {
	const payload = action.payload;
	switch (action.type) {
		case SET_USER:
			return { ...state, email: payload };
		case SET_SKILLS_FROM_DB:
		case DELETE_SKILL_FROM_DB:
			return {
				...state,
				skills: [...payload],
			};
		case SAVE_SKILLS_FROM_PAGE:
			return {
				...state,
				skills: [...state.skills, ...payload],
			};
		case SET_SOFT_SKILLS_FROM_DB:
		case DELETE_SOFT_SKILL_FROM_DB:
			return {
				...state,
				softSkills: [...payload],
			};
		case SAVE_SOFT_SKILLS_FROM_PAGE:
			debugger;
			return {
				...state,
				softSkills: [...state.softSkills, ...payload],
			};
		case SET_LANG_SKILLS_FROM_DB:
		case DELETE_LANG_SKILL_FROM_DB:
			return {
				...state,
				langSkills: [...payload],
			};
		case SAVE_LANG_SKILLS_FROM_PAGE:
			return {
				...state,
				langSkills: [...state.langSkills, ...payload],
			};
		case SET_EDU_FROM_DB:
		case DELETE_EDU_FROM_DB:
			return {
				...state,
				edu: [...payload],
			};
		case SAVE_EDU_FROM_PAGE:
			return {
				...state,
				edu: [...state.edu, ...payload],
			};
		case SET_EXP_FROM_DB:
		case DELETE_EXP_FROM_DB:
			return {
				...state,
				exp: [...payload],
			};

		case SAVE_EXP_FROM_PAGE:
			return {
				...state,
				exp: [...state.exp, ...payload],
			};
		default:
			return state;
	}
};


