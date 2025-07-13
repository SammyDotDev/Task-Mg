import { View, Text } from "react-native";
import React, { useState } from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import Checkbox from "expo-checkbox";
import { formatTimeTo12Hour } from "@/utils";
import { DayWithTasks } from "@/assets/data/agendaItems";

const TaskItem = ({
	item,
	checkBoxVisible = false,
}: {
	item: DayWithTasks;
	checkBoxVisible?: boolean;
}) => {
	const itemData = item.data[0];
	const [isDone, setIsDone] = useState(false);
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
						{formatTimeTo12Hour(itemData.time)}
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
							{itemData.title}
						</Text>
					</View>
					<Text
						style={{
							fontSize: rMS(SIZES.h7),
							fontWeight: "400",
							color: COLORS.fadedBlue,
						}}
					>
						{itemData.description}
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
				{checkBoxVisible && (
					<Checkbox
						style={{
							borderRadius: 6,
							width: rMS(SIZES.h4),
							height: rMS(SIZES.h4),
						}}
						value={isDone}
						onValueChange={setIsDone}
						color={COLORS.darkBlue}
					/>
				)}
				<View style={{ flex: 1 }} />
				<View
					style={{
						padding: rMS(SIZES.h12),
						borderRadius: 99,
						minWidth: rMS(80),
						paddingHorizontal: rMS(SIZES.h10),
						backgroundColor:
							itemData.priority === "low"
								? "#FFEEA9"
								: itemData.priority === "medium"
								? "#AEEA94"
								: itemData.priority === "high"
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
								itemData.priority === "low"
									? COLORS.dark
									: itemData.priority === "medium"
									? COLORS.dark
									: itemData.priority === "high"
									? COLORS.white
									: "",
							fontWeight: "600",
						}}
					>
						{itemData.priority}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default TaskItem;
