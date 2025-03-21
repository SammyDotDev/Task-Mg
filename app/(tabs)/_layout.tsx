import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import HomeIcon from "@/assets/svg/HomeIcon";
import TaskIcon from "@/assets/svg/TaskIcon";
import CalenderIcon from "@/assets/svg/CalenderIcon";
import SettingsIcon from "@/assets/svg/SettingsIcon";
import { Dimensions, Pressable, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

const Tablayout = () => {
	return (
		<Tabs
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {
					position: "absolute",
					height: rMS(62),
					marginVertical: rMS(SIZES.h5),
					elevation: 0,
					backgroundColor: COLORS.dark,
					borderRadius: 999,
					width: "60%",
					left: "50%",

					transform: [{ translateX: (Dimensions.get("window").width * 0.6) / 3 }],
				},
				tabBarItemStyle: {
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarShowLabel: false,
				tabBarButton: (props) => {
					const isSelected = props?.accessibilityState?.selected;
					const scale = useSharedValue(0.8);
					const opacity = useSharedValue(1);

					const animatedStyle = useAnimatedStyle(() => {
						return {
							// transform: [
							// 	{ scale: withTiming(scale.value, { duration: 400 }) },
							// ],
							opacity: withTiming(opacity.value, { duration: 400 }),
						};
					});
					const animatedTextStyle = useAnimatedStyle(() => {
						return {
							opacity: withTiming(opacity.value, { duration: 400 }),
						};
					});

					useEffect(() => {
						if (isSelected) {
							// scale.value = 1.1;
							opacity.value = 1;
						} else {
							// scale.value = 1;
							opacity.value = 0.5;
						}
					}, [isSelected]);
					let icon;
					switch (route.name) {
						case "index":
							icon = (
								<HomeIcon color={isSelected ? COLORS.dark : COLORS.white} />
							);
							break;
						case "tasks":
							icon = (
								<TaskIcon color={isSelected ? COLORS.dark : COLORS.white} />
							);
							break;
						case "calender":
							icon = (
								<CalenderIcon color={isSelected ? COLORS.dark : COLORS.white} />
							);
							break;
						case "settings":
							icon = (
								<SettingsIcon color={isSelected ? COLORS.dark : COLORS.white} />
							);
							break;
						default:
							break;
					}
					return (
						<Pressable
							{...props}
							style={[
								// animatedStyle,
								{
									borderRadius: 99,
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: isSelected ? COLORS.white : COLORS.deepDark,
									margin: rMS(SIZES.h13),
									// padding: rMS(SIZES.h5),
									height: rMS(50),
									width: rMS(50),
								},
							]}
						>
							<Animated.View
								style={[
									animatedStyle,
									{
										borderRadius: 99,
										justifyContent: "center",
										alignItems: "center",
										backgroundColor: isSelected
											? COLORS.white
											: COLORS.deepDark,
										margin: rMS(SIZES.h13),
										// padding: rMS(SIZES.h5),
										height: rMS(50),
										width: rMS(50),
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
						</Pressable>
					);
				},
			})}
		>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="tasks" />
			<Tabs.Screen name="calender" />
			<Tabs.Screen name="settings" />
		</Tabs>
	);
};

export default Tablayout;
