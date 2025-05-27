import {
	View,
	Text,
	StyleProp,
	ViewStyle,
	StyleSheet,
	TextStyle,
} from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

interface Props {
	onPress: () => void;
	title: string | JSX.Element;
	extendedStyles?: ViewStyle;
	disabled?: boolean;
	task?: boolean;
	titleStyles?: TextStyle;
}

const CustomButton = ({
	onPress,
	title,
	extendedStyles,
	disabled,
	task,
	titleStyles,
}: Props) => {
	return (
		<Button
			onPress={onPress}
			title={title}
			disabled={disabled}
			buttonStyle={[
				{
					borderWidth: 3,
					borderColor: COLORS.darkBlue,
					padding: rMS(SIZES.h7),
					borderRadius: task ? 999 : rMS(SIZES.h10),
					width: "90%",
					marginHorizontal: "auto",
					backgroundColor: COLORS.darkBlue,
					...extendedStyles,
				},
			]}
			titleStyle={{
				fontSize: rMS(SIZES.h8),
				...titleStyles,
			}}
		/>
	);
};

export default CustomButton;
