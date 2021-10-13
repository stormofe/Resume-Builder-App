const userState = {
	email: "none",
	name: "Jon Dou",
	id: 1,
	customers: [],
};

const CREATE_USER = "CREATE_USER";
const CREATE_MANY_USERS = "CREATE_MANY_USERS";

export const userReducer = (state = userState, action) => {
	switch (action.type) {
		case "CREATE_USER":
			return { ...state, ...action.payload };
		case CREATE_MANY_USERS:
			return { ...state, customers: [...state.customers, ...action.payload] };
		default:
			return state;
	}
};

export const createUserAction = (payload) => ({ type: CREATE_USER, payload });
export const createManyUserAction = (payload) => ({ type: CREATE_MANY_USERS, payload });
