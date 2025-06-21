import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import Checkbox from "expo-checkbox";
import { formatFullDate, formatTimeTo12Hour, universalStyles } from "@/utils";
import { DayWithTasks } from "@/assets/data/agendaItems";

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
				renderItem={({ item }) => {
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
				}}
			/>
		</View>
	);
};

export default MultiTaskItem;
