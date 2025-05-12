import { View, Text, ScrollView } from "react-native";
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
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { TouchableWithoutFeedback } from "react-native";
import { setPostLoadingTasks } from "@/store/slices/taskSlice";

interface TaskInfo {
	taskName: string;
	description: string;
	date: string;
	time: string;
	priority: string;
}

const Home = () => {
	const dispatch = useDispatch();
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
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
		bottomSheetModalRef.current?.present();
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

	const renderAddTaskBottomsheet = () => (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			onChange={handleSheetChanges}
			snapPoints={["85%"]}
			enablePanDownToClose={false}
			index={1}
			backgroundStyle={{
				backgroundColor: COLORS.lightPaleYellow,
				borderRadius: 50,
				borderWidth: 1,
				borderColor: COLORS.offWhite,
			}}
			style={{
				padding: rMS(SIZES.h7),
			}}
			handleIndicatorStyle={{
				display: "none",
			}}
		>
			<Pressable
				style={{
					flex: 1,
				}}
				onPress={(event) => {}}
			>
				<BottomSheetScrollView
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
							marginTop: rMS(SIZES.h8),
						}}
					>
						<Pressable
							onPress={() => bottomSheetModalRef.current?.close()}
							style={{
								backgroundColor: COLORS.lightPaleYellow,
								width: rMS(50),
								height: rMS(50),
								borderRadius: 99,
								justifyContent: "center",
								alignItems: "center",
								position: "absolute",
								left: rMS(SIZES.h9),
							}}
						>
							<CancelIcon color={COLORS.deepDark} />
						</Pressable>
						<Text
							style={{
								fontSize: rMS(SIZES.h5),
								fontWeight: "400",
								marginHorizontal: "auto",
							}}
						>
							Create a new task
						</Text>
					</View>
					<View
						style={{
							marginTop: rMS(SIZES.h1),
							gap: rMS(SIZES.h8),
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<TaskInput
							label="Task Name"
							onChangeText={(text) => {
								console.log(text);
								setTaskInfo((prev) => ({ ...prev, taskName: text }));
							}}
							value={taskInfo.taskName}
						/>
						<TaskInput
							label="Description"
							onChangeText={(text) => {
								console.log(text);
								setTaskInfo((prev) => ({ ...prev, description: text }));
							}}
							isDescription
							value={taskInfo.description}
						/>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: rMS(SIZES.h12 - 1),
							}}
						>
							<View
								style={{
									width: "45%",
								}}
							>
								<TaskInput
									label="Choose date"
									onChangeText={(text) => {
										console.log(text);
										setTaskInfo((prev) => ({ ...prev, date: text }));
									}}
									value={taskInfo.date}
									hasIcon
									onIconPress={() => setShowCalendar((prev) => !prev)}
									hasContainer
									icon={<CalenderIcon />}
								/>
								{showCalendar && (
									<View
										style={{
											position: "absolute",
											zIndex: 99999,
										}}
									>
										<Calendar
											style={{
												Position: "absolute",
												borderRadius: 25,
											}}
											onDayPress={(day: any) => {
												// setSelected(day.dateString);
											}}
											// markedDates={{
											// 	[selected]: {
											// 		selected: true,
											// 		disableTouchEvent: true,
											// 		selectedDotColor: "orange",
											// 	},
											// }}
										/>
									</View>
								)}
							</View>
							<TaskInput
								label="Choose time"
								onChangeText={(text) => {
									console.log(text);
									setTaskInfo((prev) => ({ ...prev, time: text }));
								}}
								value={taskInfo.time}
								hasIcon
								icon={<TimeIcon />}
							/>
						</View>
					</View>
					<View
						style={{
							width: "90%",
							marginHorizontal: "auto",
							gap: rMS(SIZES.h11),
							marginTop: rMS(SIZES.h11),
						}}
					>
						<Text
							style={{
								fontSize: rMS(SIZES.h8),
								fontWeight: "500",
								color: COLORS.dark,
							}}
						>
							Priority
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<PriorityButton
								onPress={() => {
									setSelectedPriority("low");
									setTaskInfo((prev) => ({ ...prev, priority: "low" }));
								}}
								priorityText="Low"
								isSelectedPriority={isLowPriority}
							/>
							<PriorityButton
								onPress={() => {
									setSelectedPriority("medium");
									setTaskInfo((prev) => ({ ...prev, priority: "medium" }));
								}}
								priorityText="Medium"
								isSelectedPriority={isMediumPriority}
							/>
							<PriorityButton
								onPress={() => {
									setSelectedPriority("high");
									setTaskInfo((prev) => ({ ...prev, priority: "high" }));
								}}
								priorityText="High"
								isSelectedPriority={isHighPriority}
							/>
						</View>
					</View>
					<CustomButton
						disabled={bottomSheetButtonDisabled}
						onPress={async () => {
							dispatch(setPostLoadingTasks(true));
							try {
								await createTask(
									taskInfo.taskName,
									taskInfo.description,
									taskInfo.priority,
									taskInfo.date,
									taskInfo.time
								);
							} catch (error) {
								console.log(error);
							} finally {
								dispatch(setPostLoadingTasks(false));
								bottomSheetModalRef.current?.close();
								setTaskInfo({
									taskName: "",
									description: "",
									date: "",
									time: "",
									priority: "",
								});
							}
						}}
						title={"Create task"}
						extendedStyles={{
							marginTop: rMS(SIZES.h1),
							marginBottom: rMS(SIZES.h4),
						}}
					/>
				</BottomSheetScrollView>
			</Pressable>
		</BottomSheetModal>
	);
	useEffect(() => {
		console.log(showCalendar);
	}, [showCalendar]);
	return (
		<Pressable
			style={{
				flex: 1,
			}}
			onPress={() => setShowCalendar(false)}
		>
			<Loader visible={postLoadingTasks} />
			<ViewContainer>
				<SafeAreaScrollView>
					<Header handleNotification={() => {}} handleAddTask={handleAddTask} />
					<Text
						style={{
							fontSize: rMS(SIZES.h5),
							marginHorizontal: rMS(SIZES.h6),
							paddingVertical: rMS(SIZES.h9),
						}}
					>
						Manage your task
					</Text>

					<CustomButton
						title={"Log out"}
						onPress={handleLogout}
					/>
				</SafeAreaScrollView>
				{renderAddTaskBottomsheet()}
			</ViewContainer>
		</Pressable>
	);
};

export default Home;
