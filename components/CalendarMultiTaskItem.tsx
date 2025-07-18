import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import Checkbox from "expo-checkbox";
import { formatFullDate, formatTimeTo12Hour, universalStyles } from "@/utils";
import { DayWithTasks } from "@/assets/data/agendaItems";
import LoneTaskItemComponent from "./LoneTaskItemComponent";
import ListEmptyComponent from "./ListEmptyComponent";

const CalendarMultiTaskItem = ({
	dayItem,
	checkBoxVisible = false,
	showDateTitle = false,
	state,
}: {
	dayItem: DayWithTasks;
	checkBoxVisible?: boolean;
	showDateTitle?: boolean;
	state?: "active" | "done";
}) => {

	return (
		<View
			style={{
				flexDirection: "column",
				gap: rMS(SIZES.h5),
			}}
		>
			{showDateTitle && (
				<Text style={universalStyles.baseText}>
					{formatFullDate(new Date(dayItem.title))}
				</Text>
			)}
			<FlatList
				showsVerticalScrollIndicator={false}
				data={dayItem.data}
				renderItem={({ item }) => (
					<LoneTaskItemComponent
						dayId={dayItem.id}
						item={item}
						checkBoxVisible={checkBoxVisible}
					/>
				)}
				ListEmptyComponent={
					<ListEmptyComponent
						title="No Tasks"
						description={`You don’t have any ${
							state === "active" ? "active" : "completed"
						} tasks`}
					/>
				}
			/>
		</View>
	);
};

export default CalendarMultiTaskItem;
