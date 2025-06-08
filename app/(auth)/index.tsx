import {
	View,
	Text,
	Alert,
	Pressable,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import { rMS, rS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import TextField from "@/components/TextField";
import CustomButton from "@/components/CustomButton";
import { Link, Redirect, router } from "expo-router";
import { COLORS } from "@/constants/COLORS";
import InputWrapper from "@/components/InputWrapper";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";
import LogoHeader from "@/components/LogoHeader";
import { ScrollView } from "react-native";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";

const Signin = () => {
	const [userInputDetails, setUserInputDetails] = useState({
		emailAddress: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		// console.log(userInputDetails);
	}, [userInputDetails]);

	// sign in handler
	const handleSignIn = async () => {
		setIsLoading(true);
		try {
			const {
				data: { session },
				error,
			} = await supabase.auth.signInWithPassword({
				email: userInputDetails.emailAddress,
				password: userInputDetails.password,
			});
			console.log(session);
			const { data: profile, error: err } = await supabase
				.from("profiles")
				.select(
					`
                    id,
                    username
                `
				)
				.eq("id", session?.user.id);
			console.log(profile, session?.user.id, " USER ID");
			if (session?.user.aud === "authenticated") {
				dispatch(
					setUser({
						id: session.user.id,
						email: session.user.email,
						username: profile ? profile[0].username : null,
					})
				);
				router.push("/(tabs)");
			}
			if (error) Alert.alert(error.message);
			console.log(session?.user.email);
			// if (!session)
			// 	Alert.alert("Please check your inbox for email verification!");
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// forgot password handler
	const handleForgotPassword = async () => {
		router.push("/(auth)/other/forgotPassword");
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
			}}
		>
			<SafeAreaScrollView>
				<Loader visible={isLoading} />
				<LogoHeader />
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						marginVertical: rMS(SIZES.h1),
						marginTop: rMS(SIZES.h1),
					}}
				>
					<Text
						style={{
							fontSize: rMS(SIZES.h3),
							fontWeight: "600",
							color: COLORS.darkBlue,
						}}
					>
						Sign In
					</Text>

					<Text
						style={{
							fontSize: rMS(SIZES.h8),
							fontWeight: "400",
							color: COLORS.fadedBlue,
						}}
					>
						Sign into your account
					</Text>
				</View>
				<View style={{ flex: 1 }}>
					<InputWrapper backgroundColor={COLORS.lightPurple}>
						<TextField
							placeholder="Email address"
							value={userInputDetails.emailAddress}
							onChangeText={(text) =>
								setUserInputDetails((prev) => ({
									...prev,
									emailAddress: text,
								}))
							}
							keyboardType="email-address"
						/>
						<TextField
							placeholder="Password"
							value={userInputDetails.password}
							onChangeText={(text) =>
								setUserInputDetails((prev) => ({ ...prev, password: text }))
							}
							secureTextEntry
						/>
					</InputWrapper>
					{/* <View style={{ flex: 1 }} /> */}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
							width: "90%",
							marginHorizontal: "auto",
							marginVertical: rMS(SIZES.h10),
						}}
					>
						<Link
							href={"/(auth)/other/forgotPassword"}
							onPress={handleForgotPassword}
							style={{
								fontSize: rMS(SIZES.h9),
								color: COLORS.darkBlue,
								fontWeight: "600",
							}}
						>
							Forgot Password?
						</Link>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							width: "90%",
							marginHorizontal: "auto",
							marginVertical: rMS(SIZES.h10),
						}}
					>
						<Text
							style={{
								fontSize: rMS(SIZES.h9),

								color: COLORS.fadedBlue,
								// textAlign: "center",
							}}
						>
							Don't have an account?{" "}
							<Link
								href={"/(auth)/signup"}
								style={{
									color: COLORS.dark,
									fontWeight: "900",
								}}
							>
								Sign Up
							</Link>
						</Text>
					</View>
					<CustomButton
						title={"Sign in"}
						onPress={handleSignIn}
						extendedStyles={
							{
								// marginVertical: rMS(SIZES.h1 * 2),
								// marginBottom: rS(SIZES.h6),
							}
						}
					/>
				</View>
			</SafeAreaScrollView>
		</KeyboardAvoidingView>
	);
};

export default Signin;
