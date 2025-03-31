import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { rMS } from "./responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

const SafeAreaContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingHorizontal: rMS(SIZES.h9),
				// paddingTop: rMS(SIZES.h5),
				backgroundColor: COLORS.white,
			}}
		>
			{children}
		</SafeAreaView>
	);
};

export default SafeAreaContainer;
