import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

const useAuthRedirect = () => {
	const [loading, setLoading] = useState(false);
	const [currentSession, setCurrentSession] = useState<Session | null>(null);
	const [currentProfile, setCurrentProfile] = useState<
		| {
				id: any;
				username: any;
		  }[]
		| null
	>(null);
	const router = useRouter();

	useEffect(() => {
		let isMounted = true;

		// function to check session
		const checkSession = async () => {
			setLoading(true);
			// get session info
			const {
				data: { session },
			} = await supabase.auth.getSession();

			// get current user info from user session id
			const { data: profile, error: err } = await supabase
				.from("profiles")
				.select(
					`
                                id,
                                username
                            `
				)
				.eq("id", session?.user.id);

			// console.log(session, "SESSIONSSSS");
			// if (!isMounted) return;

			// set current session for the global state
			setCurrentSession(session);
			setCurrentProfile(profile);

			// check if session exists
			if (session) {
				router.replace("/(tabs)"); // Redirect to home screen
			} else {
				router.replace("/(auth)"); // Redirect to login screen
			}
			setLoading(false);
		};
		checkSession();

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				if (session) {
					router.replace("/(tabs)"); // Redirect to home screen
				} else {
					router.replace("/(auth)"); // Redirect to login screen
				}
			}
		);

		return () => {
			// isMounted = false;
			authListener.subscription.unsubscribe();
		};
	}, []);
	return { loading, currentSession, currentProfile };
};

export default useAuthRedirect;
