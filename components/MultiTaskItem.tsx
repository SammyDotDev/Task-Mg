import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import Checkbox from "expo-checkbox";
import { formatFullDate, formatTimeTo12Hour, universalStyles } from "@/utils";
import { DayWithTasks } from "@/assets/data/agendaItems";
import LoneTaskItemComponent from "./LoneTaskItemComponent";

const MultiTaskItem = ({
	item,
	checkBoxVisible = false,
	showDateTitle = false,
}: {
	item: DayWithTasks;
	checkBoxVisible?: boolean;
	showDateTitle?: boolean;
}) => {
	const [isDone, setIsDone] = useState(false);

	return (
		<View
			style={{
				flexDirection: "column",
				gap: rMS(SIZES.h5),
			}}
		>
			{showDateTitle && (
				<Text style={universalStyles.baseText}>
					{formatFullDate(new Date(item.title))}
				</Text>
			)}
			<FlatList
				data={item.data}
				renderItem={({ item }) => (
					<LoneTaskItemComponent
						item={item}
						checkBoxVisible={checkBoxVisible}
					/>
				)}
			/>
		</View>
	);
};

export default MultiTaskItem;
