import { View, Text, ViewProps, ViewStyle } from "react-native";
import React from "react";
import { COLORS } from "@/constants/COLORS";
import { rMS } from "./responsive_size";
import { SIZES } from "@/constants/SIZES";

const ViewContainer = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: ViewStyle;
}) => {
	return (
		<View
			style={{
				flex: 1,
				paddingHorizontal: rMS(SIZES.h9),
				backgroundColor: COLORS.white,
                ...style
			}}
		>
			{children}
		</View>
	);
};

export default ViewContainer;
