import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: "",
	id: "",
	username: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			console.log(action.payload, " payload");
			state.email = action.payload.email;
			state.id = action.payload.id;
			state.username = action.payload.username;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
