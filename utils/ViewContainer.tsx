import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/constants/COLORS";
import { rMS } from "./responsive_size";
import { SIZES } from "@/constants/SIZES";

const ViewContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<View
			style={{
				flex: 1,
				paddingHorizontal: rMS(SIZES.h9),
				backgroundColor: COLORS.white,
			}}
		>
			{children}
		</View>
	);
};

export default ViewContainer;
