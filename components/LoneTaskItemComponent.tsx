import {
	View,
	Text,
	Pressable,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import Checkbox from "expo-checkbox";
import { formatFullDate, formatTimeTo12Hour, universalStyles } from "@/utils";
import { Task } from "@/assets/data/agendaItems";
import { supabase } from "@/lib/supabase";
import { useTasks } from "@/context/TasksContext";
import { FontAwesome6 } from "@expo/vector-icons";
import Popover, { PopoverMode } from "react-native-popover-view";
import { router } from "expo-router";
import { toast } from "sonner-native";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
import { Share } from "react-native";

const LoneTaskItemComponent = ({
	item,
	checkBoxVisible,
	dayId,
}: {
	dayId: string;
	item: Task;
	checkBoxVisible?: boolean;
}) => {
	// today's date
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	const [isDone, setIsDone] = useState(item.is_completed);
	const [showPopover, setShowPopover] = useState(false);
	const { refetchTasks, loading } = useTasks();

	const [imageUri, setImageUri] = useState("");
	const getSharingStatus = async () => {
		const res = await Sharing.isAvailableAsync();
		console.log(res);
	};

	const shareTask = async () => {
		try {
			// await Sharing.shareAsync(imageUri);
			await Share.share({
				message: `Task title: ${item.title.toUpperCase()} \nTask Description: ${
					item.description
				}\nDate: ${formatFullDate(
					new Date(item.days.day_date)
				)}\nTime: ${formatTimeTo12Hour(
					item.time
				)}\nPriority: ${item.priority.toUpperCase()}`,
			});
		} catch (err) {
			console.log(err, "Unable to share image");
		}
	};
	useEffect(() => {
		const loadAsset = async () => {
			const asset = Asset.fromModule(
				require("@/assets/images/partial-react-logo.png")
			);
			await asset.downloadAsync();
			setImageUri(asset.localUri ?? "");
		};
		loadAsset();
	}, []);

	// console.log(taskData[0].data);
	const setTaskDone = async (taskId: string) => {
		const { data, error: err } = await supabase
			.from("tasks")
			.select("is_completed")
			.eq("id", item.id)
			.single();
		const taskIsDone = await supabase
			.from("tasks")
			.update({ is_completed: !data?.is_completed })
			.eq("id", item.id)
			.select()
			.single();
		if (taskId === item.id) {
			setIsDone(taskIsDone.data.is_completed);
			toast.success(
				taskIsDone.data.is_completed
					? "Task completed successfully"
					: "Task re-opened"
			);
		}
		refetchTasks();
	};

	const editTask = (taskId: string) => {
		router.push({
			pathname: "/screens/editTask",
			params: { taskId, dayId },
		});
	};

	// delete task item
	const deleteTask = async (taskId: string) => {
		try {
			const { error } = await supabase.from("tasks").delete().eq("id", taskId);
			if (error) {
				console.error("Error deleting task:", error);
			}
			const { data, error: err } = await supabase
				.from("days")
				.select(
					`
        id,
        day_date,
        tasks (
        id,
          title,
          description,
          priority,
          time,
          created_at,
          is_active,
          is_completed,
          expired
        )
      `
				)
				.eq("id", dayId);

			console.log(data, "DATA AFTER DELETION FROM DAYS");
			refetchTasks();
		} catch (error) {
			Alert.alert(error as string);
		}
	};

	const taskDate = new Date(item.days.day_date); // or use your task's day/time
	const expired = taskDate < today;

	// if (loading)
	// 	return <ActivityIndicator size="large" color={COLORS.darkBlue} />;
	return (
		<View
			style={{
				borderLeftWidth: 2.5,
				borderLeftColor: COLORS.fadedBlue,
				backgroundColor: COLORS.paleWhite,
				padding: rMS(SIZES.h6),
				paddingVertical: rMS(SIZES.h5),
				flexDirection: "row",
				alignItems: "flex-start",
				justifyContent: "space-between",
				marginVertical: rMS(SIZES.h12),
			}}
		>
			{loading ? (
				<View
					style={{
						borderRadius: 8,
						padding: rMS(SIZES.h9),
					}}
				>
					<ActivityIndicator size="large" color={COLORS.darkBlue} />
				</View>
			) : (
				<>
					<View
						style={{
							flexDirection: "column",
							// alignItems: "flex-start",
							width: "100%",
						}}
					>
						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}
						>
							<View
								style={{
									padding: rMS(SIZES.h12),
									borderRadius: 99,
									paddingHorizontal: rMS(SIZES.h10),
									backgroundColor: "#CBD2E0",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Text
									style={{
										fontSize: rMS(SIZES.h9),
										color: COLORS.darkBlue,
										fontWeight: "600",
									}}
								>
									{formatTimeTo12Hour(item.time)}
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "flex-start",
									gap: rMS(SIZES.h7),
								}}
							>
								{/* Ellipsis toggle for editing and deleting tasks */}
								{
									<>
										<Popover
											onRequestClose={() => setShowPopover(false)}
											mode={PopoverMode.RN_MODAL}
											backgroundStyle={{
												backgroundColor: "rgba(0, 0, 0, 0.35)",
											}}
											popoverStyle={{
												width: "auto",
												borderRadius: 10,
												padding: rMS(SIZES.h11),
												gap: rMS(SIZES.h10),
											}}
											from={
												<Pressable>
													<FontAwesome6
														name="ellipsis"
														size={24}
														color="black"
													/>
												</Pressable>
											}
										>
											{!expired && (
												<TouchableOpacity
													style={{
														backgroundColor: COLORS.offWhite,
														borderRadius: 8,
														padding: rMS(SIZES.h12),
														alignItems: "center",
													}}
													onPress={() => {
														setShowPopover(false);
														// Navigate to edit task screen
														editTask(item.id);
													}}
												>
													<Text style={universalStyles.textSm}>Edit</Text>
												</TouchableOpacity>
											)}
											<TouchableOpacity
												style={{
													backgroundColor: COLORS.offWhite,
													borderRadius: 8,
													padding: rMS(SIZES.h12),
													alignItems: "center",
												}}
												onPress={() => deleteTask(item.id)}
											>
												<Text
													style={[
														universalStyles.textSm,
														{
															color: COLORS.red,
														},
													]}
												>
													Delete
												</Text>
											</TouchableOpacity>
											<TouchableOpacity
												style={{
													backgroundColor: COLORS.offWhite,
													borderRadius: 8,
													padding: rMS(SIZES.h12),
													alignItems: "center",
												}}
												onPress={shareTask}
											>
												<Text
													style={[
														universalStyles.textSm,
														{
															color: COLORS.dark,
														},
													]}
												>
													Share
												</Text>
											</TouchableOpacity>
										</Popover>
									</>
								}
								{/* Checkbox */}
								{checkBoxVisible && (
									<Checkbox
										style={{
											borderRadius: 6,
											width: rMS(SIZES.h4),
											height: rMS(SIZES.h4),
										}}
										value={isDone}
										onValueChange={() => setTaskDone(item.id)}
										color={COLORS.darkBlue}
										disabled={item.is_completed && expired}
									/>
								)}
							</View>
						</View>
						<View
							style={{
								justifyContent: "center",
								alignItems: "flex-start",
								gap: rMS(SIZES.h13),
								marginVertical: rMS(SIZES.h7),
							}}
						>
							<View
								style={{
									width: "90%",
								}}
							>
								<Text
									style={{
										fontSize: rMS(SIZES.h6),
										fontWeight: "500",
										color: COLORS.darkBlue,
									}}
								>
									{item.title}
								</Text>
							</View>
							<Text
								style={{
									fontSize: rMS(SIZES.h7),
									fontWeight: "400",
									color: COLORS.fadedBlue,
								}}
							>
								{item.description}
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								gap: rMS(SIZES.h7),
								// borderWidth: 1,
								marginLeft: "auto",
							}}
						>
							{item.expired && (
								<View
									style={{
										padding: rMS(SIZES.h12),
										borderRadius: 99,
										minWidth: rMS(80),
										paddingHorizontal: rMS(SIZES.h10),
										backgroundColor: `${COLORS.red}38`,
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Text
										style={{
											fontSize: rMS(SIZES.h8),
											color: COLORS.red,
											fontWeight: "600",
										}}
									>
										expired
									</Text>
								</View>
							)}
							<View
								style={{
									padding: rMS(SIZES.h12),
									borderRadius: 99,
									minWidth: rMS(80),
									paddingHorizontal: rMS(SIZES.h10),
									backgroundColor:
										item.priority === "low"
											? "#FFEEA9"
											: item.priority === "medium"
											? "#AEEA94"
											: item.priority === "high"
											? "#D84040"
											: "",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Text
									style={{
										fontSize: rMS(SIZES.h8),
										color:
											item.priority === "low"
												? COLORS.dark
												: item.priority === "medium"
												? COLORS.dark
												: item.priority === "high"
												? COLORS.white
												: "",
										fontWeight: "600",
									}}
								>
									{item.priority}
								</Text>
							</View>
						</View>
					</View>
					{/* CheckBox */}
					<View
						style={{
							flexDirection: "column",
							justifyContent: "space-between",
							alignItems: "flex-end",
						}}
					></View>
				</>
			)}
			{/* <View style={{ flex: 1 }} /> */}
		</View>
	);
};

export default LoneTaskItemComponent;
