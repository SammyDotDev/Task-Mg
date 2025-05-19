import { View, Text, ScrollView, Pressable, StatusBar } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SIZES } from "@/constants/SIZES";
import { rMS } from "@/utils/responsive_size";
import CancelIcon from "@/assets/svg/CancelIcon";
import { COLORS } from "@/constants/COLORS";
import TaskInput from "@/components/TaskInput";
import { supabase } from "@/lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Calendar } from "react-native-calendars";
import CalenderIcon from "@/assets/svg/CalenderIcon";
import TimeIcon from "@/assets/svg/TimeIcon";
import PriorityButton from "@/components/PriorityButton";
import CustomButton from "@/components/CustomButton";
import { setPostLoadingTasks } from "@/store/slices/taskSlice";
import Modal from "react-native-modal";
import CalendarModal from "@/components/CalendarModal";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";

interface TaskInfo {
	taskName: string;
	description: string;
	date: string;
	time: string;
	priority: string;
}

const createTask = () => {
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
		// bottomSheetModalRef.current?.present();
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
	return (
		// <SafeAreaContainer>
		<>
			<SafeAreaScrollView
				style={{
					flexGrow: 1,
					backgroundColor: COLORS.white,
				}}
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
						// marginTop: rMS(SIZES.h1),
					}}
				>
					<Pressable
						// onPress={() => bottomSheetModalRef.current?.close()}
						style={{
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
							// bottomSheetModalRef.current?.close();
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
					task
					extendedStyles={{
						marginTop: "auto",
						// marginBottom: rMS(SIZES.h4),
					}}
				/>
			</SafeAreaScrollView>
			<CalendarModal
				showCalendar={showCalendar}
				handleBackdropPress={() => setShowCalendar(false)}
			/>
		</>
	);
};

export default createTask;
