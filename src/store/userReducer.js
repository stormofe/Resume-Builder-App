const userState = {
	email: "",
	photo: null,
};

export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_PHOTO = "SET_PHOTO";

export const userReducer = (state = userState, action) => {
	switch (action.type) {
		case SET_USER_NAME:
			return { ...state, email: action.payload };
		case SET_USER_INFO:
			return {
				...state,
				...action.payload,
			};
		case SET_PHOTO:
			return {
				...state,
				photo: action.payload,
			};
		default:
			return state;
	}
};

export const setUserNameAction = (user) => ({ type: SET_USER_NAME, user });
