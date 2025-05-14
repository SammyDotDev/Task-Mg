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
				paddingVertical: rMS(SIZES.h8),
				borderRadius: rMS(SIZES.h10),
				backgroundColor: isSelectedPriority ? COLORS.darkBlue : "transparent",
				width: "32%",
				justifyContent: "center",
				alignItems: "center",
				borderWidth: 1,
				borderColor: isSelectedPriority ? "transparent" : COLORS.lightGray,
			}}
		>
			<Text
				style={{
					fontSize: rMS(SIZES.h9),
					fontWeight: "500",
					color: isSelectedPriority ? COLORS.white : COLORS.darkBlue,
				}}
			>
				{priorityText}
			</Text>
		</Pressable>
	);
};

export default PriorityButton;
