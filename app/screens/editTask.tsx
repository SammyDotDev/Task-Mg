import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES } from "@/constants/SIZES";
import { rMS } from "@/utils/responsive_size";
import { COLORS } from "@/constants/COLORS";
import TaskInput from "@/components/TaskInput";
import { supabase } from "@/lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CalenderIcon from "@/assets/svg/CalenderIcon";
import TimeIcon from "@/assets/svg/TimeIcon";
import PriorityButton from "@/components/PriorityButton";
import CustomButton from "@/components/CustomButton";
import { setPostLoadingTasks } from "@/store/slices/taskSlice";
import CalendarModal from "@/components/CalendarModal";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate, formatFullDate, isAndroid } from "@/utils";
import { useAuth } from "@/context/AuthContext";
import { useTasks } from "@/context/TasksContext";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { toast } from "sonner-native";

interface TaskInfo {
	taskName: string;
	description: string;
	date: Date;
	time: Date;
	priority: string;
}

const editTask = () => {
	const dispatch = useDispatch();
	const { session } = useAuth();
	const { refetchTasks, expireOldTasks } = useTasks();
	const { taskId } = useLocalSearchParams();
	const [taskInfo, setTaskInfo] = useState<TaskInfo>({
		taskName: "",
		description: "",
		date: new Date(),
		time: new Date(),
		priority: "",
	});


	const fetchTaskFromId = async (taskId: string) => {
		try {
			const { data, error } = await supabase
				.from("tasks")
				.select(
					`           id,
          title,
          description,
          priority,
          time,
          created_at,
          is_active,
          is_completed,
          expired,
                days
                (
      day_date)`
				)
				.eq("id", taskId)
				.single();
			console.log(data, "FETCHED TASK DATA");
			setTaskInfo((prev) => ({
				...prev,
				taskName: data?.title,
				description: data?.description,
				date: new Date(data?.days.day_date),
				time: new Date(`1970-01-01T${data?.time}`),
				priority: data?.priority,
			}));
			setSelectedPriority(data?.priority || "");
			// return data;
		} catch (err) {
			console.error("Error fetching task:", err);
			return null;
		}
	};
	useEffect(() => {
		fetchTaskFromId(taskId as string);
	}, []);

	const [selectedPriority, setSelectedPriority] = useState("");
	const [showCalendar, setShowCalendar] = useState<boolean>(false);

	const postLoadingTasks = useSelector(
		(state: RootState) => state.tasks.postLoadingTasks
	);

	const [buttonDisabled, setButtonDisabled] = useState<boolean | undefined>(
		false
	);

	const isLowPriority = selectedPriority === "low";
	const isMediumPriority = selectedPriority === "medium";
	const isHighPriority = selectedPriority === "high";

	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);

	const [androidDate, setAndroidDate] = useState(formatDate(new Date()));

	// const showMode = (currentMode) => {
	// 	setShow(true);
	// 	setMode(currentMode);
	// };

	// add new task, expand bottomsheet
	const handleAddTask = () => {
		// console.log(bottomSheetModalRef.current);
		// bottomSheetModalRef.current?.snapToIndex(1);
		// bottomSheetModalRef.current?.present();
	};

	useEffect(() => {
		if (
			taskInfo.taskName.length === 0 ||
			taskInfo.description.length === 0 ||
			!taskInfo.time ||
			!taskInfo.date ||
			taskInfo.priority.length === 0
		) {
			setButtonDisabled(true);
		} else {
			console.log(taskInfo);
			setButtonDisabled(false);
		}
		console.log(androidDate, "DATE");
	}, [taskInfo, androidDate]);

	const updateTaskToDb = async (
		title: string,
		description: string,
		priority: string,
		taskDate: Date,
		time: Date
	) => {
		const dayDate = isAndroid ? taskDate : taskDate.toISOString().slice(0, 10); // → "2025-06-08"
		const dayTime = isAndroid ? time : time.toTimeString().split(" ")[0];
		console.log(dayDate, "Supabase Date");

		// 2️⃣ upsert the day
		const { data, error: dayErr } = await supabase
			.from("days")
			.upsert(
				{ user_id: session?.user.id, day_date: dayDate },
				{ onConflict: "user_id,day_date" }
			)
			.select();
		const [day] = data ?? [];

		if (dayErr) throw dayErr + "DAY ERROR";

		// 3️⃣ insert the task
		const { data: task, error: taskErr } = await supabase
			.from("tasks")
			.update([
				{
					// user_id: session?.user.id,
					day_id: day.id,
					title: title,
					description: description,
					priority: priority,
					time: dayTime,
				},
			])
			.eq("id", taskId as string)
			.select(); // returns the inserted row

		if (taskErr) throw taskErr;

		// const res = await supabase
		// 	.from("tasks")
		// 	.insert([
		// 		{
		// 			tasktitle: title,
		// 			description: description,
		// 			priority: priority,
		// 			time: dayTime,
		// 			date: isAndroid
		// 				? new Date(androidDate).toISOString().slice(0, 10)
		// 				: dayDate,
		// 		},
		// 	])
		// 	.select();
		refetchTasks();
		expireOldTasks();
		toast.success("Task updated successfully");
	};

	return (
		// <SafeAreaContainer>
		<>
			<SafeAreaScrollView
				// style={{
				// 	flexGrow: 1,
				// 	backgroundColor: COLORS.white,
				// }}
				contentContainerStyle={{
					width: "100%",
					marginHorizontal: "auto",
					flexGrow: 1,
					paddingBottom: rMS(100),
				}}
				// onTouchStart={() => setShowCalendar(false)}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						position: "relative",
					}}
				>
					<Pressable onPress={() => router.back()}>
						<MaterialCommunityIcons
							name="close"
							size={rMS(SIZES.h4)}
							color={COLORS.darkBlue}
							// style={{
							// 	position: "absolute",
							// 	left: rMS(SIZES.h12),
							// }}
						/>
					</Pressable>
					<Text
						style={{
							fontSize: rMS(SIZES.h5),
							fontWeight: "400",
							marginHorizontal: "auto",
						}}
					>
						Edit task
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
							justifyContent: "space-between",
							// gap: rMS(SIZES.h12 - 1),
							width: "90%",
						}}
					>
						<View
							style={{
								width: isAndroid ? "45%" : null,
								gap: rMS(SIZES.h11),
							}}
						>
							{isAndroid ? (
								<TaskInput
									label="Choose date"
									// onChangeText={(text) => {
									// 	console.log(text);
									// 	setTaskInfo((prev) => ({
									// 		...prev,
									// 		date: new Date(androidDate),
									// 	}));
									// }}
									value={formatFullDate(taskInfo.date)}
									hasIcon
									onIconPress={() => setShowCalendar((prev) => !prev)}
									hasContainer
									icon={<CalenderIcon />}
								/>
							) : (
								<>
									<Text
										style={{
											fontSize: rMS(SIZES.h9),
											fontWeight: "400",
											color: COLORS.fadedBlue,
										}}
									>
										Choose date
									</Text>
									<View
										style={{
											paddingVertical: rMS(SIZES.h10),
											borderWidth: 1,
											borderColor: COLORS.lightGray,
											borderRadius: rMS(SIZES.h10),
											width: "100%",
											overflow: "hidden",
										}}
									>
										<DateTimePicker
											style={{
												marginRight: 10,
											}}
											themeVariant="light"
											textColor={COLORS.darkBlue}
											testID="dateTimePicker"
											value={taskInfo.date}
											mode={"date"}
											is24Hour={true}
											onChange={(_, selectedDate) => {
												if (selectedDate) {
													console.log(selectedDate, "datetime picker date");
													setTaskInfo((prev) => ({
														...prev,
														date: selectedDate,
													}));
												}
											}}
										/>
									</View>
								</>
							)}
						</View>
						<View
							style={{
								width: isAndroid ? "45%" : null,
								gap: rMS(SIZES.h11),
							}}
						>
							{isAndroid ? (
								<TaskInput
									label="Choose time"
									onChangeText={(text) => {
										// console.log(text);
										setTaskInfo((prev) => ({ ...prev, time: text }));
									}}
									value={taskInfo.time}
									hasIcon
									onIconPress={() => {}}
									hasContainer
									icon={<TimeIcon />}
								/>
							) : (
								<>
									<Text
										style={{
											fontSize: rMS(SIZES.h9),
											fontWeight: "400",
											color: COLORS.fadedBlue,
										}}
									>
										Choose time
									</Text>
									<View
										style={{
											paddingVertical: rMS(SIZES.h10) - 1,
											borderWidth: 1,
											borderColor: COLORS.lightGray,
											borderRadius: rMS(SIZES.h10),
											width: "100%",
											overflow: "hidden",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<DateTimePicker
											style={{
												marginRight: 10,
												padding: 0,
											}}
											themeVariant="light"
											textColor={COLORS.darkBlue}
											testID="dateTimePicker"
											value={taskInfo.time}
											mode={"time"}
											is24Hour={true}
											onChange={(_, selectedTime) => {
												if (selectedTime) {
													setTaskInfo((prev) => ({
														...prev,
														time: selectedTime,
													}));
												}
											}}
										/>
									</View>
								</>
							)}
						</View>
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
							fontSize: rMS(SIZES.h9),
							fontWeight: "400",
							color: COLORS.fadedBlue,
						}}
					>
						Priority
					</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							gap: rMS(SIZES.h12),
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
				<View style={{ flex: 1 }} />
				<CustomButton
					disabled={buttonDisabled}
					onPress={async () => {
						dispatch(setPostLoadingTasks(true));
						try {
							await updateTaskToDb(
								taskInfo.taskName,
								taskInfo.description,
								taskInfo.priority,
								taskInfo.date,
								taskInfo.time
							);
							router.back();
						} catch (error) {
							console.error("ERROR ", error);
						} finally {
							dispatch(setPostLoadingTasks(false));
							// bottomSheetModalRef.current?.close();
							// setTaskInfo({
							// 	taskName: "",
							// 	description: "",
							// 	date: new Date(),
							// 	time: new Date(),
							// 	priority: "",
							// });
						}
					}}
					title={"Save"}
					task
					extendedStyles={{
						marginTop: "auto",
					}}
				/>
			</SafeAreaScrollView>
			{isAndroid && (
				<CalendarModal
					showCalendar={showCalendar}
					handleBackdropPress={() => setShowCalendar(false)}
					setDateString={(text) => {
						console.log(text, "LLLL");
						setAndroidDate(text);
						setTaskInfo((prev) => ({
							...prev,
							date: new Date(text),
						}));
					}}
				/>
			)}
		</>
	);
};

export default editTask;
