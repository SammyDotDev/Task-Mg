import React, { useCallback, useEffect, useRef, useState } from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import Header from "@/components/Header";
import { COLORS } from "@/constants/COLORS";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import ViewContainer from "@/utils/ViewContainer";

import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import * as Notifications from "expo-notifications";
import {
	AgendaList,
	CalendarProvider,
	WeekCalendar,
} from "react-native-calendars";
import { agendaItems } from "../../assets/data/agendaItems";
import { getTheme, themeColor } from "../../assets/data/theme";
import AgendaItem from "@/components/AgendaItem";
import testIDs from "@/assets/data/testIDs";
import dayjs from "dayjs";
import { Button, Pressable, Text } from "react-native";
import { View } from "react-native";
import { formatDate } from "@/utils";
import { useAuth } from "@/context/AuthContext";
import { useTasks } from "@/context/TasksContext";
import { MarkedDates } from "react-native-calendars/src/types";
import { isEmpty } from "lodash";

interface TaskInfo {
	taskName: string;
	description: string;
	date: string;
	time: string;
	priority: string;
}

const ITEMS: any[] = agendaItems;

interface Props {
	weekView?: boolean;
}
const INITIAL_DATE = new Date();

// First, set the handler that will cause the notification
// to show the alert
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowBanner: true,
		shouldShowList: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

const Home = () => {
	// auth
	const { session, profile } = useAuth();
	const { taskData, loading } = useTasks();

	// dispatch
	const dispatch = useDispatch();

	// useState
	const [selected, setSelected] = useState(dayjs().format("YYYY-MM-DD"));

	// useSelector
	const postLoadingTasks = useSelector(
		(state: RootState) => state.tasks.postLoadingTasks
	);

	// useEffect
	// useEffect(() => {
	// 	console.log(taskData, loading);
	// }, []);

	// calendar config

	function getMarkedDates() {
		const marked: MarkedDates = {};

		taskData?.forEach((item) => {
			// NOTE: only mark dates with data
			if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
				marked[item.title] = {
					marked: true,
					selectedColor: "#717D96",
					selectedTextColor: "white",
				};
			} else {
				marked[item.title] = { disabled: true };
			}
		});
		return marked;
	}
	const marked = useRef(getMarkedDates());
	const theme = useRef(getTheme());
	const todayBtnTheme = useRef({
		todayButtonTextColor: themeColor,
	});

	// render agenda items
	const renderItem = useCallback(({ item }: any) => {
		return <AgendaItem item={item} />;
	}, []);
	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Look at that notification",
				body: "I'm so proud of myself!",
			},
			trigger: null,
		});
	}
	useEffect(() => {
		// Second, call scheduleNotificationAsync()
		schedulePushNotification();
	}, []);
	return (
		<ViewContainer
			style={{
				paddingHorizontal: 0,
			}}
		>
			<SafeAreaContainer
				// scrollEnabled={false}
				style={{
					paddingHorizontal: 0,
					// paddingTop: rMS(SIZES.h1 * 1.5),
					backgroundColor: COLORS.white,
					paddingBottom: rMS(100),
				}}
			>
				<Loader visible={postLoadingTasks} />
				<ViewContainer
					style={{
						flex: undefined,
						paddingVertical: rMS(SIZES.h6),
						paddingHorizontal: rMS(SIZES.h9),
					}}
				>
					<Header handleNotification={() => {}} username={profile?.username} />
					{/* <Button
						title="Press to schedule a notification"
						onPress={async () => {
							await schedulePushNotification();
						}}
					/> */}
				</ViewContainer>
				{loading ? (
					<Loader visible={loading} />
				) : (
					<CalendarProvider
						date={ITEMS[1]?.title}
						style={{
							// backgroundColor: "##f7f9fc",
						}}
					>
						<WeekCalendar
							calendarHeight={rMS(100)}
                            calendarStyle={{
                                elevation:0
                            }}
							testID={testIDs.weekCalendar.CONTAINER}
							firstDay={1}
							style={{
								elevation: 0,
								shadowOffset: {
									width: 0,
									height: 0,
								},
								shadowColor: "transparent",
								shadowOpacity: 0,
							}}
							markedDates={marked.current}
							markingType="custom"
							dayComponent={({ date, onPress, marking }) => {
								const today = date?.dateString === formatDate(INITIAL_DATE);
								const isSelected = date?.dateString === selected;
								return (
									<Pressable
										onPress={() => date?.dateString && onPress && onPress()}
										style={{
											alignItems: "center",
											gap: rMS(SIZES.h13),
											width: rMS(50),
										}}
									>
										<View
											style={{
												width: 10,
												height: 10,
												backgroundColor: today
													? COLORS.darkBlue
													: "transparent",
												borderRadius: 99,
											}}
										/>
										<Pressable
											onPress={() => {
												setSelected(date?.dateString ?? "");
												onPress?.(date);
											}}
											style={{
												backgroundColor: isSelected
													? COLORS.darkBlue
													: COLORS.white,
												borderRadius: isSelected ? SIZES.h10 : 0,
												padding: rMS(SIZES.h11),
											}}
										>
											<Text
												style={{
													fontSize: rMS(SIZES.h6),
													color: isSelected ? COLORS.white : COLORS.darkBlue,
													fontWeight: "600",
												}}
											>
												{date?.day}
											</Text>
											<View
												style={{
													width: 10,
													height: 10,
													backgroundColor:
														marking?.marked && isSelected
															? COLORS.white
															: marking?.marked
															? COLORS.darkBlue
															: "transparent",
													borderRadius: 99,
													marginHorizontal: "auto",
												}}
											/>
										</Pressable>
									</Pressable>
								);
							}}
						/>

						<AgendaList
							sections={taskData}
							style={{
								backgroundColor: COLORS.dimWhite,
							}}
							contentContainerStyle={{
								backgroundColor: COLORS.dimWhite,
								paddingBottom: rMS(100),
							}}
							renderItem={renderItem}
							infiniteListProps={
								{
									// itemHeight: 0,
									// titleHeight: 50,
									// itemHeightByType: {
									// 	LongEvent: 120,
									// },
								}
							}
						/>
					</CalendarProvider>
				)}
			</SafeAreaContainer>
		</ViewContainer>
	);
};

export default Home;
