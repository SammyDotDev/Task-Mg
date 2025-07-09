import {
	View,
	Text,
	TextInput,
	KeyboardTypeOptions,
	ViewStyle,
	TextStyle,
} from "react-native";
import React from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

export interface TextFieldProps {
	onChangeText: (text: string) => void;
	value: string;
	placeholder?: string;
	secureTextEntry?: boolean;
	keyboardType?: KeyboardTypeOptions;
	style?: TextStyle;
	title?: string;
	disabled?: boolean;
}
const TextField = ({
	onChangeText,
	value,
	placeholder,
	secureTextEntry = false,
	keyboardType,
	style,
}: TextFieldProps) => {
	return (
		<TextInput
			onChangeText={(text) => onChangeText(text)}
			secureTextEntry={secureTextEntry}
			keyboardType={keyboardType}
			value={value}
			placeholder={placeholder}

			style={{
				padding: rMS(SIZES.h5),
				borderRadius: rMS(SIZES.h10),
				backgroundColor: COLORS.white,
				width: "90%",
				marginHorizontal: "auto",
				marginVertical: rMS(SIZES.h10),
				borderWidth: 1,
				borderColor: COLORS.lightGray,
				overflow: "hidden",
				...style,
			}}
			placeholderTextColor={COLORS.dark + "89"}
		/>
	);
};

export default TextField;
