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
import LogoHeader from "@/components/LogoHeader";

const Signup = () => {
	const [userInputDetails, setUserInputDetails] = useState({
		fullName: "",
		emailAddress: "",
		password: "",
	});

	const [confirmPassword, setConfirmPassword] = useState<string>("");
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
						Sign Up
					</Text>

					<Text
						style={{
							fontSize: rMS(SIZES.h8),
							fontWeight: "400",
							color: COLORS.fadedBlue,
						}}
					>
						Create an account
					</Text>
				</View>
				<View style={{ flex: 1 }}>
					<InputWrapper backgroundColor={COLORS.paleYellow}>
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
						<TextField
							placeholder="Confirm Password"
							value={confirmPassword}
							onChangeText={(text) => setConfirmPassword(text)}
							secureTextEntry
						/>
					</InputWrapper>
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
					<CustomButton title={"Sign up"} onPress={handleSignUp} />
					{/* <View
						style={{
							marginTop: "auto",
							marginHorizontal: "auto",
							marginBottom: rMS(SIZES.h6),
							backgroundColor: COLORS.paleLightPurple,
							padding: rMS(SIZES.h9),
							borderRadius: 45,
						}}
					></View> */}
				</View>
			</SafeAreaContainer>
		</>
	);
};

export default Signup;
