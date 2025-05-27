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
import { setLoading } from "@/store/slices/authSlice";
import {
	AgendaList,
	CalendarProvider,
	WeekCalendar,
} from "react-native-calendars";
import { agendaItems, getMarkedDates } from "../../assets/data/agendaItems";
import { getTheme, themeColor } from "../../assets/data/theme";
import AgendaItem from "@/components/AgendaItem";
import testIDs from "@/assets/data/testIDs";
import dayjs from "dayjs";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { formatDate } from "@/utils";

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

const Home = () => {
	const dispatch = useDispatch();
	const [taskInfo, setTaskInfo] = useState<TaskInfo>({
		taskName: "",
		description: "",
		date: "",
		time: "",
		priority: "",
	});
	const [bottomSheetButtonDisabled, setButtonSheetButtonDisabled] = useState<
		boolean | undefined
	>(false);

	const [selectedPriority, setSelectedPriority] = useState("");
	const [showCalendar, setShowCalendar] = useState<boolean>(false);

	const postLoadingTasks = useSelector(
		(state: RootState) => state.tasks.postLoadingTasks
	);

	const isLowPriority = selectedPriority === "low";
	const isMediumPriority = selectedPriority === "medium";
	const isHighPriority = selectedPriority === "high";

	// add new task, expand bottomsheet
	const handleAddTask = () => {
		// console.log(bottomSheetModalRef.current);
		// bottomSheetModalRef.current?.snapToIndex(1);
	};

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleLogout = async () => {
		dispatch(setLoading(true));
		try {
			const { error } = await supabase.auth.signOut();
		} catch (error) {
			if (error) {
				alert("Error signing out");
			}
		} finally {
			dispatch(setLoading(false));
		}
		// router.push("/(auth)");
	};

	useEffect(() => {
		if (
			taskInfo.taskName.length === 0 ||
			taskInfo.description.length === 0 ||
			taskInfo.time.length === 0 ||
			taskInfo.date.length === 0 ||
			taskInfo.priority.length === 0
		) {
			setButtonSheetButtonDisabled(true);
		} else {
			setButtonSheetButtonDisabled(false);
		}
	}, [taskInfo]);

	const createTask = async (
		title: string,
		description: string,
		priority: string,
		time: string,
		date: string
	) => {
		const res = await supabase
			.from("tasks")
			.insert([
				{
					tasktitle: title,
					description: description,
					priority: priority,
					time: new Date().toTimeString().split(" ")[0],
					date: new Date().toISOString().split("T")[0],
				},
			])
			.select();
		console.log(res);
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// const { weekView } = props;
	const marked = useRef(getMarkedDates());
	const theme = useRef(getTheme());
	const todayBtnTheme = useRef({
		todayButtonTextColor: themeColor,
	});

	const renderItem = useCallback(({ item }: any) => {
		const isLongItem = item.itemCustomHeightType === "LongEvent";
		return (
			// <View style={{ paddingTop: isLongItem ? 40 : 0 }}>
			<AgendaItem item={item} />
		);
	}, []);
	const [selected, setSelected] = useState(dayjs().format("YYYY-MM-DD"));
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
					paddingTop: rMS(SIZES.h1 * 1.5),
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
					<Header handleNotification={() => {}} handleAddTask={handleAddTask} />
				</ViewContainer>
				<CalendarProvider
					date={ITEMS[1]?.title}
					style={{
						backgroundColor: "##f7f9fc",
					}}
				>
					<WeekCalendar
						// theme={{
						// 	dotColor: COLORS.darkBlue,
						// 	selectedDayBackgroundColor: COLORS.darkBlue,
						// 	dayTextColor: COLORS.lightGray,
						// 	todayTextColor: COLORS.dark,
						// 	todayDotColor: COLORS.dark,
						// 	stylesheet: {
						// 		day: {
						// 			basic: {
						// 				width: 32,
						// 				height: 32,
						// 				alignItems: "center",
						// 				justifyContent: "center",
						// 				borderRadius: 6, // 👈 less rounded
						// 				padding: 2, // 👈 inner breathing room
						// 			},
						// 		},
						// 		calendar: {
						// 			header: {
						// 				main: {
						// 					elevation: 0,
						// 					borderRadius: 90,
						// 				},
						// 				week: {
						// 					borderRadius: 90,
						// 				},
						// 			},
						// 		},
						// 	},
						// }}
						calendarHeight={rMS(70)}
						calendarStyle={{
							elevation: 0,
							borderRadius: 10,
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
						// headerStyle={{
						// 	elevation: 0,
						// 	shadowColor: "transparent",
						// 	shadowOpacity: 0,
						// }}
						// style={{
						// 	elevation: 0,
						// }}
						// contentContainerStyle={{
						// 	elevation: 0,
						// 	shadowOffset: {
						// 		width: 0,
						// 		height: 0,
						// 	},
						// 	shadowColor: "transparent",
						// 	shadowOpacity: 0,
						// 	boxShadow: undefined,
						// 	backgroundColor: COLORS.dark,
						// }}
						markedDates={marked.current}
						markingType="custom"
						dayComponent={({ date, onPress, marking }) => {
							const today = date?.dateString === formatDate(INITIAL_DATE);
							const isSelected = date?.dateString === selected;
							console.log(marking);
							return (
								<Pressable
									onPress={() => onPress && onPress()}
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
											backgroundColor: today ? COLORS.darkBlue : "transparent",
											borderRadius: 99,
										}}
									/>
									<Pressable
										onPress={() => {
											console.log("s");
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
						sections={ITEMS}
						style={{
							backgroundColor: COLORS.dimWhite,
						}}
						contentContainerStyle={{
							backgroundColor: COLORS.dimWhite,
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
			</SafeAreaContainer>
		</ViewContainer>
	);
};

export default Home;
