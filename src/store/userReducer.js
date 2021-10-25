const userState = {
	email: "",
};

export const SET_USER_NAME = "SET_USER_NAME";

export const userReducer = (state = userState, action) => {
	switch (action.type) {
		case SET_USER_NAME:
			return { ...state, email: action.payload };
		default:
			return state;
	}
};

export const setUserNameAction = (user) => ({ type: SET_USER_NAME, user });
