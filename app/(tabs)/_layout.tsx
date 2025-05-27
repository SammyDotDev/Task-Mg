import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { rMS, rS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
// import HomeIcon from "@/assets/svg/HomeIcon";
import TaskIcon from "@/assets/svg/TaskIcon";
import CalenderIcon from "@/assets/svg/CalenderIcon";
import SettingsIcon from "@/assets/svg/SettingsIcon";
import {
	Dimensions,
	Pressable,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
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
import ActiveHomeIcon from "@/assets/svg/navIcons/ActiveHomeIcon";
import ActiveTasksIcon from "@/assets/svg/navIcons/ActiveTasksIcon";
import TasksIcon from "@/assets/svg/navIcons/TasksIcon";
import ActiveCalendarIcon from "@/assets/svg/navIcons/ActiveCalendarIcon";
import CalendarIcon from "@/assets/svg/navIcons/CalendarIcon";
import ActiveProfilesIcon from "@/assets/svg/navIcons/ActiveProfilesIcon";
import ProfilesIcon from "@/assets/svg/navIcons/ProfilesIcon";
import HomeIcon from "@/assets/svg/navIcons/HomeIcon";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import TabBarIcon from "@/components/TabBarIcon";

const Tablayout = () => {
	const logoutLoading = useSelector((state: RootState) => state.auth.loading);
	const tabWidth = rS(50 * 4 + 40);

	return (
		<>
			<Loader visible={logoutLoading} />
			<Tabs
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarHideOnKeyboard: true,
					tabBarStyle: {
						position: "absolute",
						height: isAndroid ? rS(70) : rS(80),
						elevation: 0,
						backgroundColor: COLORS.white,
						borderTopWidth: 0,
                        alignItems:"center"
					},
					tabBarItemStyle: {
						justifyContent: "flex-end",
						alignItems: "center",
						// borderWidth: 1,
						backgroundColor: COLORS.white,
						height: rS(70),
					},
					tabBarShowLabel: false,
					// tabBarButton:(props: BottomTabBarButtonProps) => {
					// 	const { children, onPress, accessibilityState } = props;
					// 	console.log(props?.accessibilityState);
					// 	const isSelected = accessibilityState?.selected;
					// 	let icon;
					// 	switch (route.name) {
					// 		case "index":
					// 			icon = isSelected ? <ActiveHomeIcon /> : <HomeIcon />;
					// 			break;
					// 		case "tasks":
					// 			icon = isSelected ? <ActiveTasksIcon /> : <TasksIcon />;
					// 			break;
					// 		case "calendar":
					// 			icon = isSelected ? <ActiveCalendarIcon /> : <CalendarIcon />;
					// 			break;
					// 		case "profile":
					// 			icon = isSelected ? <ActiveProfilesIcon /> : <ProfilesIcon />;
					// 			break;
					// 		case "createTask":
					// 			icon = (
					// 				<View
					// 					style={{
					// 						borderRadius: 999,
					// 						padding: rMS(SIZES.h7),
					// 						backgroundColor: COLORS.darkBlue,
					// 						justifyContent: "center",
					// 						alignItems: "center",
					// 					}}
					// 				>
					// 					<FontAwesome6
					// 						name="plus"
					// 						color={COLORS.white}
					// 						size={rMS(SIZES.h8)}
					// 					/>
					// 				</View>
					// 			);
					// 			break;
					// 		default:
					// 			break;
					// 	}
					// 	return (
					// 		<Pressable
					// 			{...props}
					// 			onPress={onPress}
					// 			style={[
					// 				{
					// 					borderRadius: 99,
					// 					justifyContent: "center",
					// 					alignItems: "center",

					// 					height: rS(50),
					// 					width: rS(50),
					// 				},
					// 			]}
					// 		>
					// 			<Animated.View
					// 				style={[
					// 					// animatedStyle,
					// 					{
					// 						borderRadius: 99,
					// 						justifyContent: "center",
					// 						alignItems: "center",

					// 						height: rS(50),
					// 						width: rS(50),
					// 					},
					// 				]}
					// 			>
					// 				<View
					// 					style={{
					// 						margin: "auto",
					// 					}}
					// 				>
					// 					{icon}
					// 				</View>
					// 			</Animated.View>
					// 		</Pressable>
					// 	);
					// },
				})}
			>
				<Tabs.Screen
					name="index"
					options={{
						tabBarIcon: ({ focused }) => (
							<TabBarIcon icon={focused ? <ActiveHomeIcon /> : <HomeIcon />} />
						),
					}}
				/>
				<Tabs.Screen
					name="calendar"
					options={{
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								icon={focused ? <ActiveCalendarIcon /> : <CalendarIcon />}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="createTask"
					options={{
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								icon={
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
								}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="tasks"
					options={{
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								icon={focused ? <ActiveTasksIcon /> : <TasksIcon />}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								icon={focused ? <ActiveProfilesIcon /> : <ProfilesIcon />}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
};
export default Tablayout;
