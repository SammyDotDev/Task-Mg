import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import Header from "@/components/Header";
import { COLORS } from "@/constants/COLORS";

const Home = () => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingHorizontal: rMS(SIZES.h9),
				paddingTop: rMS(SIZES.h5),
				backgroundColor: COLORS.white,
			}}
		>
			<Header handleNotification={() => {}} />
			<Text
				style={{
					fontSize: rMS(SIZES.h5),
					marginHorizontal: rMS(SIZES.h6),
					paddingVertical: rMS(SIZES.h9),
				}}
			>
				Manage your task
			</Text>
		</SafeAreaView>
	);
};

export default Home;
