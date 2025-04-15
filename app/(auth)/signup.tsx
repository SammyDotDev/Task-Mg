import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import { Link } from "expo-router";
import { COLORS } from "@/constants/COLORS";
import { SIZES } from "@/constants/SIZES";
import { rMS } from "@/utils/responsive_size";
import TextField from "@/components/TextField";
import CustomButton from "@/components/CustomButton";
import InputWrapper from "@/components/InputWrapper";
import "react-native-url-polyfill/auto";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";

const Signup = () => {
	const [userInputDetails, setUserInputDetails] = useState({
		fullName: "",
		emailAddress: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log(userInputDetails);
	}, [userInputDetails]);

	const handleSignUp = async () => {
		setIsLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: userInputDetails.emailAddress,
			password: userInputDetails.password,
		});

		if (error) Alert.alert(error.message);
		console.log(session);
		if (!session)
			Alert.alert("Please check your inbox for email verification!");
		setIsLoading(false);
	};

	return (
		<>
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
						Create your Account
					</Text>
				</View>
				<View style={{ flex: 1 }}>
					<InputWrapper backgroundColor={COLORS.paleYellow}>
						<TextField
							placeholder="Full name"
							value={userInputDetails.fullName}
							onChangeText={(text) =>
								setUserInputDetails((prev) => ({ ...prev, fullName: text }))
							}
						/>
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
					<CustomButton
						title={"Sign in"}
						onPress={handleSignUp}
						extendedStyles={{
							marginVertical: rMS(SIZES.h1 * 2),
						}}
					/>
					<View
						style={{
							marginTop: "auto",
							marginHorizontal: "auto",
							marginBottom: rMS(SIZES.h6),
							backgroundColor: COLORS.paleLightPurple,
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
							Already have an account?{" "}
							<Link
								href={"/(auth)"}
								style={{
									color: COLORS.dark,
									fontWeight: "900",
								}}
							>
								Sign In
							</Link>
						</Text>
					</View>
				</View>
			</SafeAreaContainer>
		</>
	);
};

export default Signup;
