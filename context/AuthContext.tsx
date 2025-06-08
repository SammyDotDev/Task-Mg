// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [session, setSession] = useState<Session | null>(null);
	const [profile, setProfile] = useState<
		| {
				id: any;
				username: any;
		  }
		| null
	>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const init = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);

			if (session?.user) {
				const { data: profile } = await supabase
					.from("profiles")
					.select("id, username")
					.eq("id", session.user.id)
					.single();
				setProfile(profile);
			}
			setLoading(false);
		};
		init();

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
				if (session?.user) {
					supabase
						.from("profiles")
						.select("id, username")
						.eq("id", session.user.id)
						.single()
						.then(({ data }) => setProfile(data));
				} else {
					setProfile(null);
				}
			}
		);

		return () => {
			listener.subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ session, profile, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
