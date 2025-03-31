import { View, Text, ScrollView } from "react-native";
import React from "react";
import { rMS } from "./responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

const SafeAreaScrollView = ({ children }: { children: React.ReactNode }) => {
	return (
		<ScrollView
			contentContainerStyle={{
				paddingHorizontal: rMS(SIZES.h9),
				paddingTop: rMS(SIZES.h1 * 1.5),
				backgroundColor: COLORS.white,
				paddingBottom: rMS(100),
			}}
			alwaysBounceVertical
			showsVerticalScrollIndicator={false}
			bounces={true}
			scrollEventThrottle={16}
		>
			{children}
		</ScrollView>
	);
};

export default SafeAreaScrollView;
