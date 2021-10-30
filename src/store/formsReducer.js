const formsState = {
	email: "",
	skills: [],
	edu: [],
	exp: [],
};

export const SET_USER = "SET_USER";
export const SET_SKILLS_FROM_DB = "SET_SKILLS_FROM_DB";
export const SAVE_SKILLS_FROM_PAGE = "SAVE_SKILLS_FROM_PAGE";
export const DELETE_SKILL_FROM_DB = "DELETE_SKILL_FROM_DB";
export const ADD_EDU = "ADD_EDU";
export const SET_EDU_FROM_DB = "SET_EDU_FROM_DB";
export const SAVE_EDU_FROM_PAGE = "SAVE_EDU_FROM_PAGE";
export const DELETE_EDU_FROM_DB = "DELETE_EDU_FROM_DB";

export const formsReducer = (state = formsState, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, email: action.payload };
		case SET_SKILLS_FROM_DB:
		case DELETE_SKILL_FROM_DB:
			return {
				...state,
				skills: [...action.payload],
			};
		case SAVE_SKILLS_FROM_PAGE:
			return {
				...state,
				skills: [...state.skills, ...action.payload],
			};
		case ADD_EDU:
			return {
				...state,
				edu: [...state.edu, action.payload],
			};
		case SET_EDU_FROM_DB:
		case DELETE_EDU_FROM_DB:
			return {
				...state,
				edu: [...action.payload],
			};
		case SAVE_EDU_FROM_PAGE:
			return {
				...state,
				edu: [...state.edu, ...action.payload],
			};
		default:
			return state;
	}
};


