import { View, Text, Pressable } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

interface TaskInputProps {
	label: string;
	value: string | Date;
	onChangeText?: (text: string) => void;
	hasIcon?: boolean;
	icon?: React.ReactNode;
	isDescription?: boolean;
	onIconPress?: () => void;
	hasContainer?: boolean;
	onFocus?: () => void;
}

const TaskInput = ({
	label,
	value,
	onChangeText,
	hasIcon,
	icon,
	isDescription = false,
	onIconPress,
	hasContainer = false,
	onFocus,
}: TaskInputProps) => {
	return (
		<View
			style={{
				gap: rMS(SIZES.h11),
				width: !hasContainer ? (hasIcon ? "45%" : "90%") : "100%",
			}}
		>
			<Text
				style={{
					fontSize: rMS(SIZES.h9),
					fontWeight: "400",
					color: COLORS.fadedBlue,
				}}
			>
				{label}
			</Text>
			<View
				style={{
					flexDirection: "row",
					// alignItems: isDescription ? "flex-start" : "center",
					padding: rMS(SIZES.h11),
					paddingVertical: isDescription ? 0 : rMS(SIZES.h10),
					borderWidth: 1,
					borderColor: COLORS.lightGray,
					borderRadius: rMS(SIZES.h10),
					width: "100%",
					overflow: "hidden",
					height: isDescription ? rMS(90) : null,
				}}
			>
				<TextInput
					onChangeText={onChangeText}
					value={value}
					style={[
						{
							width: hasIcon ? "80%" : "100%",
							padding: isDescription ? rMS(SIZES.h11) : 0,
							paddingHorizontal: 0,
						},
						isDescription && { textAlignVertical: "top" },
					]}
					multiline={isDescription}
					numberOfLines={isDescription ? 5 : 1}
					onFocus={onFocus}
				/>
				{hasIcon && (
					<Pressable
						onPress={onIconPress}
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
