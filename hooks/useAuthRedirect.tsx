import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";

const useAuthRedirect = () => {
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const checkSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

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
			authListener.subscription.unsubscribe();
		};
	}, []);
	return { loading };
};

export default useAuthRedirect;
