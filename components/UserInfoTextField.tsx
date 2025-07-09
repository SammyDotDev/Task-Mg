import { View, Text } from "react-native";
import React from "react";
import { SIZES } from "@/constants/SIZES";
import { rMS } from "@/utils/responsive_size";
import { COLORS } from "@/constants/COLORS";
import TextField, { TextFieldProps } from "./TextField";

const UserInfoTextField = ({
	onChangeText,
	value,
	title,
	keyboardType,
	style,
}: TextFieldProps) => {
	return (
		<View style={{ flexDirection: "column", gap: rMS(SIZES.h13 * 0.7) }}>
			<Text
				style={{
					fontSize: rMS(SIZES.h8),
					fontWeight: "400",
					color: COLORS.darkBlue,
				}}
			>
				{title}
			</Text>
			<TextField
				value={value}
				onChangeText={onChangeText}
				style={{
					width: "100%",
					padding: rMS(SIZES.h8),
				}}
                
			/>
		</View>
	);
};

export default UserInfoTextField;
