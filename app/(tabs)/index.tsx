import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import Header from "@/components/Header";
import { COLORS } from "@/constants/COLORS";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import ViewContainer from "@/utils/ViewContainer";
import {
	GestureHandlerRootView,
	Pressable,
} from "react-native-gesture-handler";
import BottomSheet, {
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import CancelIcon from "@/assets/svg/CancelIcon";
import TaskInput from "@/components/TaskInput";
import CalenderIcon from "@/assets/svg/CalenderIcon";
import TimeIcon from "@/assets/svg/TimeIcon";
import PriorityButton from "@/components/PriorityButton";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setLoading } from "@/store/slices/authSlice";
import {
	Calendar,
	CalendarList,
	Agenda,
	AgendaList,
	ExpandableCalendar,
	CalendarProvider,
	WeekCalendar,
	DateData,
} from "react-native-calendars";
import { TouchableWithoutFeedback } from "react-native";
import { setPostLoadingTasks } from "@/store/slices/taskSlice";
import { agendaItems, getMarkedDates } from "../../assets/data/agendaItems";
import { getTheme, lightThemeColor, themeColor } from "../../assets/data/theme";
import AgendaItem from "@/components/AgendaItem";
import testIDs from "@/assets/data/testIDs";
import dayjs from "dayjs";

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
						paddingVertical: rMS(SIZES.h1),
					}}
				>
					<Header handleNotification={() => {}} handleAddTask={handleAddTask} />
				</ViewContainer>
				<CalendarProvider
					date={ITEMS[1]?.title}
					showTodayButton
					theme={todayBtnTheme.current}
					style={{
						backgroundColor: "##f7f9fc",
					}}
				>
					<WeekCalendar
						theme={{
							dotColor: COLORS.darkBlue,
							selectedDayBackgroundColor: COLORS.darkBlue,
							dayTextColor: COLORS.lightGray,
							todayTextColor: COLORS.dark,
							todayDotColor: COLORS.dark,
							stylesheet: {
								calendar: {
									header: {
										main: {
											elevation: 0,
											borderRadius: 90,
										},
										week: {
											borderRadius: 90,
										},
									},
								},
							},
						}}
						calendarHeight={rMS(70)}
						calendarStyle={{
							elevation: 0,
							borderRadius: 10,
						}}
						testID={testIDs.weekCalendar.CONTAINER}
						firstDay={1}
						headerStyle={{
							elevation: 0,
							shadowColor: "transparent",
							shadowOpacity: 0,
						}}
						style={{
							elevation: 0,
						}}
						contentContainerStyle={{
							elevation: 0,
							shadowOffset: {
								width: 0,
								height: 0,
							},
							shadowColor: "transparent",
							shadowOpacity: 0,
							boxShadow: undefined,
							backgroundColor: COLORS.dark,
						}}
						markedDates={marked.current}
						markingType="custom"
						dayComponent={({ date, onPress, ...props }) => {
							// console.log(typeof selected, typeof date?.dateString);
							const isSelected = date?.dateString === selected;
							console.log(selected, isSelected);
							return (
								<View
									style={{
										alignItems: "center",
										gap: rMS(SIZES.h13),
									}}
								>
									<View
										style={{
											width: 10,
											height: 10,
											backgroundColor: isSelected
												? COLORS.darkBlue
												: "transparent",
											borderRadius: 99,
										}}
									/>
									<TouchableOpacity
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
										{/* <Text></Text> */}
									</TouchableOpacity>
								</View>
							);
						}}
					/>
					{/*
					<ExpandableCalendar
						testID={testIDs.expandableCalendar.CONTAINER}
						theme={theme.current}
						firstDay={1}
						markedDates={marked.current}
						//   leftArrowImageSource={leftArrowIcon}
						//   rightArrowImageSource={rightArrowIcon}
					/> */}
					<AgendaList
						sections={ITEMS}
						style={{
							backgroundColor: "#f7f9fc",
						}}
						contentContainerStyle={{
							backgroundColor: "#f7f9fc",
						}}
						renderItem={renderItem}
						infiniteListProps={{
							itemHeight: 80,
							// titleHeight: 50,
							itemHeightByType: {
								LongEvent: 120,
							},
						}}
					/>
				</CalendarProvider>
				{/* <Text
					style={{
						fontSize: rMS(SIZES.h5),
						paddingVertical: rMS(SIZES.h9),
					}}
				>
					Manage your task
				</Text>

				<CustomButton title={"Log out"} onPress={handleLogout} /> */}
			</SafeAreaContainer>
		</ViewContainer>
	);
};

export default Home;
