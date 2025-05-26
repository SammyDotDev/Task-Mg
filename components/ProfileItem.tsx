import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

type Props = {
	icon: React.ReactNode;
	title: string;
	isLanguage?: boolean;
	onPress: () => void;
	isLogout?: boolean;
};

const ProfileItem = ({
	icon,
	title,
	isLanguage = false,
	onPress,
	isLogout,
}: Props) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			style={{
				flexDirection: "row",
				alignItems: "center",
				paddingVertical: rMS(SIZES.h4),
				justifyContent: "space-between",
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: rMS(SIZES.h11),
				}}
			>
				{icon}
				<Text
					style={{
						fontSize: rMS(SIZES.h8),
						fontWeight: "500",
						color: isLogout ? COLORS.red : COLORS.darkBlue,
					}}
				>
					{title}
				</Text>
			</View>
			{isLanguage && (
				<Text
					style={{
						fontSize: rMS(SIZES.h8),
						fontWeight: "500",
						color: COLORS.darkBlue,
					}}
				>
					English (US)
				</Text>
			)}
		</TouchableOpacity>
	);
};

export default ProfileItem;
