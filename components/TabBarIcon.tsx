import { View, Text, TouchableWithoutFeedback, Pressable } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { rS } from "@/utils/responsive_size";

const TabBarIcon = ({ icon }: { icon: React.ReactNode }) => {
	return (
			<Animated.View
				style={[
					{
						borderRadius: 99,
						justifyContent: "center",
						alignItems: "center",
						height: rS(50),
						width: rS(50),
					},
				]}
			>
				<View
					style={{
						margin: "auto",
					}}
				>
					{icon}
				</View>
			</Animated.View>
	);
};

export default TabBarIcon;
