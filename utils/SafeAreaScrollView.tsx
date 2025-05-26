import { View, Text, ScrollView, ScrollViewProps } from "react-native";
import React from "react";
import { rMS } from "./responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

const SafeAreaScrollView = ({
	children,
	contentContainerStyle,
	scrollEnabled,
}: {
	children: React.ReactNode;
	contentContainerStyle?: ScrollViewProps;
	scrollEnabled?: boolean;
}) => {
	return (
		<ScrollView
			// scrollEnabled={scrollEnabled}
			contentContainerStyle={{
				paddingHorizontal: rMS(SIZES.h9),
				paddingTop: rMS(SIZES.h1 * 1.5),
				backgroundColor: COLORS.white,
				paddingBottom: rMS(100),
				...contentContainerStyle,
			}}
			// alwaysBounceVertical
			showsVerticalScrollIndicator={false}
			// bounces={true}
			// scrollEventThrottle={16}
		>
			{children}
		</ScrollView>
	);
};

export default SafeAreaScrollView;
