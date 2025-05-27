import { View, Text } from "react-native";
import React, { useState } from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import Checkbox from "expo-checkbox";

const TaskItem = ({ item, checkBoxVisible = false }: any) => {
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
			<View style={{ flexDirection: "column", alignItems: "flex-start" }}>
				<View
					style={{
						padding: rMS(SIZES.h12),
						borderRadius: 99,
						paddingHorizontal: rMS(SIZES.h10),
						backgroundColor: "#CBD2E0",
						width: rMS(80),
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text>{item.data[0].hour}</Text>
				</View>
				<View
					style={{
						justifyContent: "center",
						alignItems: "flex-start",
						gap: rMS(SIZES.h13),
						marginVertical: rMS(SIZES.h7),
					}}
				>
					<Text
						style={{
							fontSize: rMS(SIZES.h4),
							fontWeight: "500",
							color: COLORS.darkBlue,
						}}
					>
						{item.data[0].title}
					</Text>
					<Text
						style={{
							fontSize: rMS(SIZES.h7),
							fontWeight: "400",
							color: COLORS.fadedBlue,
							textAlign: "center",
						}}
					>
						{item.data[0].title}
					</Text>
				</View>
			</View>
			{/* CheckBox */}
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
		</View>
	);
};

export default TaskItem;
