import { View, Text } from "react-native";
import React from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

const LogoHeader = () => {
	return (
		<View
			style={{
				marginVertical: rMS(SIZES.h2),
				alignItems: "flex-end",
				width: "90%",
				marginHorizontal: "auto",
			}}
		>
			<Text
				style={{
					fontSize: rMS(SIZES.h3),
					fontWeight: "900",
					color: COLORS.darkBlue,
				}}
			>
				Task
				<Text
					style={{
						color: COLORS.lightGray,
					}}
				>
					Nest
				</Text>
			</Text>
		</View>
	);
};

export default LogoHeader;
