import { View, Text, StyleProp, ViewStyle, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

interface Props {
	onPress: () => void;
	title: string | JSX.Element;
	extendedStyles?: StyleProp<ViewStyle>;
	disabled?: boolean;
	task?: boolean;
}

const CustomButton = ({
	onPress,
	title,
	extendedStyles,
	disabled,
	task,
}: Props) => {
	return (
		<Button
			onPress={onPress}
			title={title}
			disabled={disabled}
			buttonStyle={[
				StyleSheet.flatten(extendedStyles),
				{
					padding: rMS(SIZES.h6),
					borderRadius: task ? 999 : rMS(SIZES.h10),
					width: "90%",
					marginHorizontal: "auto",
					backgroundColor: COLORS.darkBlue,
				},
			]}
			titleStyle={{
				fontSize: rMS(SIZES.h8),
			}}
		/>
	);
};

export default CustomButton;
