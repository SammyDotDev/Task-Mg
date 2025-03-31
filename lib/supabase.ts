import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Redirect } from "expo-router";
import { AppState } from "react-native";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});
const { data } = supabase.auth.onAuthStateChange((event, session) => {
	console.log(event, session);
	if (event === "INITIAL_SESSION") {
		// handle initial session
	} else if (event === "SIGNED_IN") {
		// handle sign in event
	} else if (event === "SIGNED_OUT") {
		// handle sign out event
	} else if (event === "PASSWORD_RECOVERY") {
		// handle password recovery event
	} else if (event === "TOKEN_REFRESHED") {
		// handle token refreshed event
	} else if (event === "USER_UPDATED") {
		// handle user updated event
	}
});
