export const initState = {
	skills: {},
	langSkills: {},
	softSkills: {},
	edu: {},
	exp: {},
	custom: {},
	socials: [],
};

const loginState = {
	email: "",
	isLogin: false,
	login: [],
	error: false,
	register: false,
};
export const SET_USER_LOGIN = "SET_USER_LOGIN";
export const SUCCESS_REGISTER = "SUCCESS_REGISTER";

export const loginReducer = (state = loginState, action) => {
	const payload = action.payload;
	switch (action.type) {
		case SET_USER_LOGIN:
			return {
				...state,
				email: action.email,
				isLogin: action.isLogin,
				error: action.error,
			};

		case "CREATE_USER":
			return { ...state, email: action.payload };
		case "LOGIN_USER":
			return { ...state, isLogin: action.payload };
		case "SET_ERROR_LOGIN":
			return {
				...state,
				error: payload,
			};
		case SUCCESS_REGISTER:
			return {
				...state,
				register: payload,
			};
		default:
			return state;
	}
};
