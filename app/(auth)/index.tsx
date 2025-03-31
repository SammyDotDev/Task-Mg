import { View, Text, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import TextField from "@/components/TextField";
import CustomButton from "@/components/CustomButton";
import { Link, Redirect, router } from "expo-router";
import { COLORS } from "@/constants/COLORS";
import InputWrapper from "@/components/InputWrapper";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";

const Signin = () => {


	const [userInputDetails, setUserInputDetails] = useState({
		emailAddress: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);

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
			if (session?.user.aud === "authenticated") router.push("/(tabs)");
			if (error) Alert.alert(error.message);
			console.log(session);
			if (!session)
				Alert.alert("Please check your inbox for email verification!");
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

    // forgot password handler
    const handleForgotPassword = async ()=>{}

	return (
		<SafeAreaContainer>
			{isLoading && <Loader />}
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginVertical: rMS(SIZES.h1),
				}}
			>
				<Text
					style={{
						fontSize: rMS(SIZES.h3),
					}}
				>
					Welcome Back!
				</Text>
			</View>
			<View style={{ flex: 1 }}>
				<InputWrapper backgroundColor={COLORS.lightPurple}>
					<TextField
						placeholder="Email address"
						value={userInputDetails.emailAddress}
						onChangeText={(text) =>
							setUserInputDetails((prev) => ({ ...prev, emailAddress: text }))
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
				<Pressable
					style={{
						marginLeft: "auto",
						marginRight: "5%",
						marginVertical: rMS(SIZES.h6),
					}}
                    onPress={handleForgotPassword}
				>
					<Text
						style={{
							fontSize: rMS(SIZES.h8),
						}}
					>
						Forgot Password?
					</Text>
				</Pressable>

				<CustomButton
					title={"Sign in"}
					onPress={handleSignIn}
					extendedStyles={{
						marginVertical: rMS(SIZES.h1 * 2),
					}}
				/>
				<View
					style={{
						marginTop: "auto",
						marginHorizontal: "auto",
						marginBottom: rMS(SIZES.h6),
						backgroundColor: COLORS.paleYellow + 39,
						padding: rMS(SIZES.h9),
						borderRadius: 45,
					}}
				>
					<Text
						style={{
							fontSize: rMS(SIZES.h8),
							fontWeight: "500",
							color: COLORS.deepPaleBrown,
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
			</View>
		</SafeAreaContainer>
	);
};

export default Signin;
