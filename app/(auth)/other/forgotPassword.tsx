import { View, Text } from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import { Link } from "expo-router";
import { COLORS } from "@/constants/COLORS";
import { rMS, rS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import CustomButton from "@/components/CustomButton";
import InputWrapper from "@/components/InputWrapper";
import TextField from "@/components/TextField";

const ForgotPassword = () => {
	const [emailAddress, setEmailAddress] = useState<string>("");

	const handleForgotPassword = () => {};
	return (
		<SafeAreaContainer>
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
					Forgot Password
				</Text>
			</View>
			<View style={{ flex: 1 }}>
				<InputWrapper backgroundColor={COLORS.lightPurple}>
					<TextField
						placeholder="Email address"
						value={emailAddress}
						onChangeText={(text) => setEmailAddress(text)}
						keyboardType="email-address"
					/>
				</InputWrapper>
				<View style={{ flex: 1 }} />
				<CustomButton
					title={"Next"}
					onPress={() => {}}
					extendedStyles={{
						// marginVertical: rMS(SIZES.h1 * 2),
						marginBottom: rS(SIZES.h6),
					}}
				/>
			</View>
		</SafeAreaContainer>
	);
};

export default ForgotPassword;
