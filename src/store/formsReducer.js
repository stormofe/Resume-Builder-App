const formsState = {
	email: "",
	skills: [],
};

export const SET_USER = "SET_USER";
export const SET_SKILLS_FROM_DB = "SET_SKILLS_FROM_DB";
export const SAVE_SKILLS_FROM_PAGE = "SAVE_SKILLS_FROM_PAGE";
export const DELETE_SKILL_FROM_DB = "DELETE_SKILL_FROM_DB";

export const formsReducer = (state = formsState, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, email: action.payload };
		case SET_SKILLS_FROM_DB:
			return {
				...state,
				skills: [...action.payload],
			};
		case SAVE_SKILLS_FROM_PAGE:
			return {
				...state,
				skills: [...state.skills, ...action.payload],
			};
		case DELETE_SKILL_FROM_DB:
			return {
				...state,
				skills: [...action.payload],
			};
		default:
			return state;
	}
};


