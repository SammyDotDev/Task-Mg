import { View, Text, Pressable } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import CalenderIcon from "@/assets/svg/CalenderIcon";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

interface TaskInputProps {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	hasIcon?: boolean;
	icon?: React.ReactNode;
	isDescription?: boolean;
}

const TaskInput = ({
	label,
	value,
	onChangeText,
	hasIcon,
	icon,
	isDescription = false,
}: TaskInputProps) => {
	return (
		<View
			style={{
				gap: rMS(SIZES.h11),
				width: hasIcon ? "45%" : "90%",
			}}
		>
			<Text
				style={{
					fontSize: rMS(SIZES.h8),
					fontWeight: "500",
					color: COLORS.dark,
				}}
			>
				{label}
			</Text>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					padding: rMS(SIZES.h11),
					paddingVertical: isDescription ? 0 : rMS(SIZES.h10),
					borderRadius: 30,
					backgroundColor: COLORS.white,
					width: "100%",
					overflow: "hidden",
				}}
			>
				<TextInput
					onChangeText={onChangeText}
					value={value}
					style={{
						width: hasIcon ? "80%" : "100%",
						borderRadius: 30,
						height: isDescription ? rMS(80) : null,
						padding: isDescription ? rMS(SIZES.h11) : 0,
					}}
					multiline={isDescription}
					numberOfLines={isDescription ? 4 : 1}
				/>
				{hasIcon && (
					<Pressable
						style={{
							width: "10%",
						}}
					>
						{icon}
					</Pressable>
				)}
			</View>
		</View>
	);
};

export default TaskInput;
