import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";

const useAuthRedirect = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		let isMounted = true;
		const checkSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			// console.log(session, "SESSIONSSSS");
			// if (!isMounted) return;
			if (session) {
				router.replace("/(tabs)"); // Redirect to home screen
			} else {
				router.replace("/(auth)"); // Redirect to login screen
			}
			setLoading(false);
		};
		checkSession();

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
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
	return { loading };
};

export default useAuthRedirect;
