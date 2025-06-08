import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { router, Slot, useSegments } from "expo-router";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";

const InitialPage = () => {
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const segments = useSegments();

	useEffect(() => {
        console.log(session)
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setIsLoading(false);
		});
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
                console.log(session, "Session changed");
				setSession(session);
				setIsLoading(false);
			}
		);
		return () => authListener.subscription.unsubscribe();
	}, []);

	useEffect(() => {
		if (isLoading) return;

		const inAuthGroup = segments[0] === "(auth)";
		console.log(session);
		if (session && !inAuthGroup) {
			router.push("/(tabs)");
			console.log("Redirecting to home");
		} else if (!session) {
			router.replace("/(auth)");
		}
	}, [session, isLoading, segments]);

	if (isLoading) {
		return <Loader visible={true} />;
	}
	return <Slot />;
};

export default InitialPage;
