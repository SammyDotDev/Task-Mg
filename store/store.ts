import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tasksReducer from "./slices/taskSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		tasks: tasksReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
