import { View, Text, Pressable } from "react-native";
import React from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import AddIcon from "@/assets/svg/AddIcon";
import BellIcon from "@/assets/svg/BellIcon";

interface HeaderProps {
	handleAddTask?: () => void;
	handleNotification: () => void;
	addIsVisible?: boolean;
}

const Header = ({
	handleNotification,
	handleAddTask,
	addIsVisible = true,
}: HeaderProps) => {
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				paddingHorizontal: rMS(SIZES.h9),
			}}
		>
			<View
				style={{
					width: rMS(50),
					height: rMS(50),
					borderRadius: 99,
					backgroundColor: COLORS.paleLightPurple,
				}}
			></View>
			<View style={{ gap: rMS(SIZES.h8), flexDirection: "row" }}>
				{addIsVisible && (
					<Pressable
						onPress={handleAddTask}
						style={{
							width: rMS(50),
							height: rMS(50),
							borderRadius: 99,
							backgroundColor: COLORS.deepDark,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<AddIcon color={COLORS.white} />
					</Pressable>
				)}
				<Pressable
					onPress={handleNotification}
					style={{
						width: rMS(50),
						height: rMS(50),
						borderRadius: 99,
						backgroundColor: COLORS.paleLightPurple,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<BellIcon color={COLORS.dark} />
				</Pressable>
			</View>
		</View>
	);
};

export default Header;
