const formsState = {
	skills: [],
	softSkills: [],
	langSkills: [],
	edu: [],
	exp: [],
	custom: [],
	socials: [],
	mainInfo: {
		photoURL: null,
	},
};

export const SET_USER = "SET_USER";

export const SET_MAIN_INFO = "SET_MAIN_INFO";

export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_PHOTO = "SET_PHOTO";
export const SET_PHOTO_FROM_DB = "SET_PHOTO_FROM_DB";
export const CLEAN_INFO_LINE = "CLEAN_INFO_LINE";

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

export const SET_CUST_BLOCK_FROM_DB = "SET_CUST_BLOCK_FROM_DB";
export const SAVE_CUST_BLOCK_FROM_PAGE = "SAVE_CUST_BLOCK_FROM_PAGE";
export const DELETE_CUST_BLOCK_FROM_DB = "DELETE_CUST_BLOCK_FROM_DB";

export const SET_SOCIALS_FROM_DB = "SET_SOCIALS_FROM_DB";
export const SAVE_SOCIALS_FROM_PAGE = "SAVE_SOCIALS_FROM_PAGE";
export const DELETE_SOCIAL_FROM_DB = "DELETE_SOCIAL_FROM_DB";

export const formsReducer = (state = formsState, action) => {
	const payload = action.payload;
	switch (action.type) {
		case SET_USER_NAME:
			return { ...state, mainInfo: { email: action.payload } };
		case SET_USER_INFO:
			//debugger;
			return {
				...state,
				...action.payload,
			};
		case SET_PHOTO_FROM_DB:
			return {
				...state,
				mainInfo: { ...state.mainInfo, photoURL: action.payload },
			};
		case CLEAN_INFO_LINE:
			const name = action.payload;

			return {
				...state,
				mainInfo: { [name]: "" },
			};
		case SET_USER:
			return { ...state, mainInfo: { email: payload } };
		case SET_MAIN_INFO:
			return { ...state, mainInfo: { ...state.mainInfo, ...payload } };
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
		case SET_SOCIALS_FROM_DB:
		case DELETE_SOCIAL_FROM_DB:
			return {
				...state,
				socials: [...payload],
			};
		case SAVE_SOCIALS_FROM_PAGE:
			return {
				...state,
				socials: [...state.socials, ...payload],
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
		case SET_CUST_BLOCK_FROM_DB:
		case DELETE_CUST_BLOCK_FROM_DB:
			return {
				...state,
				custom: [...payload],
			};

		case SAVE_CUST_BLOCK_FROM_PAGE:
			return {
				...state,
				custom: [...state.custom, ...payload],
			};
		default:
			return state;
	}
};
