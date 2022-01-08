const userState = {
	email: "",
	photoURL: null,
	error: false,
};

export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_PHOTO = "SET_PHOTO";
export const SET_PHOTO_FROM_DB = "SET_PHOTO_FROM_DB";
export const CLEAN_INFO_LINE = "CLEAN_INFO_LINE";
export const SET_ERROR_PHOTO = "SET_ERROR_PHOTO";

export const userReducer = (state = userState, action) => {
	switch (action.type) {
		case SET_ERROR_PHOTO:
			return {
				...state,
				error: action.payload,
			};
		case SET_USER_NAME:
			return { ...state, email: action.payload };
		case SET_USER_INFO:
			return {
				...state,
				...action.payload,
			};
		case SET_PHOTO_FROM_DB:
			return {
				...state,
				photoURL: action.payload,
			};
		case CLEAN_INFO_LINE:
			const name = action.payload;

			return {
				...state,
				[name]: "",
			};
		default:
			return state;
	}
};

export const setUserNameAction = (user) => ({ type: SET_USER_NAME, user });
