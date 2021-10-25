const formsState = {
	email: "",
	skills: [],
};

export const SET_USER = "SET_USER";
export const SET_SKILLS_FROM_DB = "SET_SKILLS_FROM_DB";

export const formsReducer = (state = formsState, action) => {
	switch (action.type) {
		case SET_USER:
			debugger;
			return { ...state, email: action.payload };
		case SET_SKILLS_FROM_DB:
			debugger;
			return {
				...state,
				skills: action.payload,
			};
		default:
			return state;
	}
};


