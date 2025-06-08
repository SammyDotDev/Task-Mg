import { View, Text, Pressable } from "react-native";
import React from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import AddIcon from "@/assets/svg/AddIcon";
import BellIcon from "@/assets/svg/BellIcon";
import ViewContainer from "@/utils/ViewContainer";
import { universalStyles } from "@/utils";

interface HeaderProps {
	handleAddTask?: () => void;
	handleNotification: () => void;
	addIsVisible?: boolean;
	username: string;
}

const Header = ({
	handleNotification,
	handleAddTask,
	addIsVisible = true,
	username,
}: HeaderProps) => {
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					fontSize: rMS(SIZES.h5),
					fontWeight: "800",
					color: COLORS.darkBlue,
				}}
			>
				Hello, {username}!
			</Text>
			<View
				style={{
					width: rMS(50),
					height: rMS(50),
					borderRadius: 99,
					backgroundColor: COLORS.lightGray,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text
					style={[
						universalStyles.headerText,
						{
							fontSize: rMS(SIZES.h5),
						},
					]}
				>
					{username && username?.charAt(0)}
				</Text>
			</View>
		</View>
	);
};

export default Header;
