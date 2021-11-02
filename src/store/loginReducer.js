export const initState = {
	skills: {},
	edu: {},
	exp: {},
};

const loginState = {
	email: "",
	isLogin: false,
	login: [],
};
export const SET_USER_LOGIN = "SET_USER_LOGIN";

export const loginReducer = (state = loginState, action) => {
	const payload = action.payload;
	switch (action.type) {
		case SET_USER_LOGIN:
			debugger;
			return {
				...state,
				email: action.email,
				isLogin: action.isLogin,
			};

		case "CREATE_USER":
			return { ...state, email: action.payload };
		case "LOGIN_USER":
			return { ...state, isLogin: action.payload };
		default:
			return state;
	}
};
