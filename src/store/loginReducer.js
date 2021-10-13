const loginState = {
	email: "",
	isLogin: false,
	login: [],
};
const CREATE_USER = "CREATE_USER";
const LOGIN_USER = "LOGIN_USER";

export const loginReducer = (state = loginState, action) => {
	switch (action.type) {
		case "CREATE_USER":
			return { ...state, email: action.payload };
		case "LOGIN_USER":
			return { ...state, isLogin: action.payload };
		default:
			return state;
	}
};

export const createUserAction = (payload) => ({ type: CREATE_USER, payload });
export const loginUserAction = (payload) => ({ type: LOGIN_USER, payload });
