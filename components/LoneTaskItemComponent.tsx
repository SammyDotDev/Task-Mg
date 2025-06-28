import { View, Text } from "react-native";
import React, { useState } from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import Checkbox from "expo-checkbox";
import { formatTimeTo12Hour } from "@/utils";
import { DayWithTasks, Task } from "@/assets/data/agendaItems";
import { supabase } from "@/lib/supabase";
import { useTasks } from "@/context/TasksContext";

const LoneTaskItemComponent = ({
	item,
	checkBoxVisible,
}: {
	item: Task;
	checkBoxVisible?: boolean;
}) => {
	const [isDone, setIsDone] = useState(item.is_completed);
	// const [isActive, setIsActive] = useState(item.is_active);

	// console.log(taskData[0].data);
	const setTaskDone = async (taskId: string) => {
		const taskIsDone = await supabase
			.from("tasks")
			.update({ is_completed: true })
			.eq("id", item.id)
			.select()
			.single();
		console.log(taskId, item.id, taskIsDone.data, "TASK IS DONE");
		if (taskId === item.id) {
			setIsDone(taskIsDone.data.is_completed);
		}
	};
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
			<View
				style={{
					flexDirection: "column",
					alignItems: "flex-start",
					width: "70%",
				}}
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
						{" "}
						{formatTimeTo12Hour(item.time)}
					</Text>
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
			</View>
			{/* CheckBox */}
			<View
				style={{
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<View>
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
						/>
					)}
				</View>
				<View style={{ flex: 1 }} />
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
	);
};

export default LoneTaskItemComponent;
