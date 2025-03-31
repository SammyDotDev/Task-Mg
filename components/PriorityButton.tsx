import { View, Text, Pressable } from "react-native";
import React from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

type PriorityButtonProps = {
	onPress: () => void;
	priorityText: string;
	isSelectedPriority: boolean;
};

const PriorityButton = ({
	onPress,
	priorityText,
	isSelectedPriority,
}: PriorityButtonProps) => {
	return (
		<Pressable
			onPress={onPress}
			style={{
				paddingVertical: rMS(SIZES.h6),
				borderRadius: 99,
				backgroundColor: isSelectedPriority ? COLORS.paleYellow : "transparent",
				width: "30%",
				justifyContent: "center",
				alignItems: "center",
				borderWidth: 2,
				borderColor: isSelectedPriority ? "transparent" : COLORS.dark,
			}}
		>
			<Text
				style={{
					fontSize: rMS(SIZES.h9),
					fontWeight: "500",
				}}
			>
				{priorityText}
			</Text>
		</Pressable>
	);
};

export default PriorityButton;
