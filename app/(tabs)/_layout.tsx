import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { rMS, rS } from "@/utils/responsive_size";
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
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
	AntDesign,
	Entypo,
	FontAwesome6,
	MaterialIcons,
} from "@expo/vector-icons";
import { isAndroid } from "@/utils";

const Tablayout = () => {
	const logoutLoading = useSelector((state: RootState) => state.auth.loading);
	// let loading = true;
	const tabWidth = rS(50 * 4 + 40);

	return (
		<>
			{/* <Loader visible={logoutLoading} /> */}
			<Tabs
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarHideOnKeyboard: true,
					tabBarStyle: {
						position: "absolute",
						// bottom: rMS(SIZES.h5),
						height: isAndroid ? rS(70) : rS(80),
						elevation: 0,
						backgroundColor: COLORS.white,
						borderTopWidth: 0,
						// borderRadius: 999,
						// width: tabWidth,
						// left: "50%",
						// transform: [{ translateX: tabWidth / 4 }], // Center using transform
					},
					tabBarItemStyle: {
						justifyContent: "center",
						alignItems: "center",
						height: rS(60),
					},
					tabBarShowLabel: false,
					tabBarButton: (props) => {
                        const { children, onPress } = props;
						const isSelected = props?.accessibilityState?.selected;
						const opacity = useSharedValue(1);
						// const animatedStyle = useAnimatedStyle(() => {
						// 	return {
						// 		opacity: withTiming(opacity.value, { duration: 400 }),
						// 	};
						// });
						// useEffect(() => {
						// 	if (isSelected) {
						// 		opacity.value = 1;
						// 	} else {
						// 		opacity.value = 0.5;
						// 	}
						// }, [isSelected]);
						let icon;
						switch (route.name) {
							case "index":
								icon = (
									<HomeIcon color={isSelected ? COLORS.dark : COLORS.dark} />
								);
								break;
							case "tasks":
								icon = (
									<TaskIcon color={isSelected ? COLORS.dark : COLORS.dark} />
								);
								break;
							case "calender":
								icon = (
									<CalenderIcon
										color={isSelected ? COLORS.dark : COLORS.dark}
									/>
								);
								break;
							case "settings":
								icon = (
									<SettingsIcon
										color={isSelected ? COLORS.dark : COLORS.dark}
									/>
								);
								break;
							case "createTask":
								icon = (
									<View
										style={{
											borderRadius: 999,
											padding: rMS(SIZES.h7),
											backgroundColor: COLORS.darkBlue,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<FontAwesome6
											name="plus"
											color={COLORS.white}
											size={rMS(SIZES.h8)}
										/>
									</View>
								);
								break;
							default:
								break;
						}
						return (
							<Pressable
								// {...props}
                                onPress={onPress}
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
								<Animated.View
									style={[
										// animatedStyle,
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
							</Pressable>
						);
					},
				})}
			>
				<Tabs.Screen name="index" />
				<Tabs.Screen name="tasks" />
				<Tabs.Screen name="createTask" />
				<Tabs.Screen name="calender" />
				<Tabs.Screen name="settings" />
			</Tabs>
		</>
	);
};
export default Tablayout;
