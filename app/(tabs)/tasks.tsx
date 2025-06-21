import { View, Text, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import ViewContainer from "@/utils/ViewContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import SearchHeader from "@/components/SearchHeader";
import { getDateStatus, universalStyles } from "@/utils";
import { COLORS } from "@/constants/COLORS";
import { agendaItems, DayWithTasks } from "@/assets/data/agendaItems";
import TaskItem from "@/components/TaskItem";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import { useTasks } from "@/context/TasksContext";
import Loader from "@/components/Loader";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import MultiTaskItem from "@/components/MultiTaskItem";

const Tasks = () => {
	const { taskData, loading } = useTasks();
	const [activeTimeline, setActiveTimeline] = useState("today");
	const [state, setState] = useState("active");
	console.log(taskData, "TASK DATA");
	return (
		<ViewContainer>
			<View
				style={{
					paddingHorizontal: rMS(SIZES.h9),
					paddingTop: rMS(SIZES.h3),
					paddingBottom: rMS(SIZES.h3),
				}}
			>
				<SearchHeader screenTitle="Tasks" handleSearch={() => {}} />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							gap: rMS(SIZES.h10),
						}}
					>
						<Pressable onPress={() => setActiveTimeline("past")}>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											activeTimeline === "past"
												? COLORS.darkBlue
												: COLORS.fadedBlue,
									},
								]}
							>
								Past
							</Text>
						</Pressable>
						<Pressable onPress={() => setActiveTimeline("today")}>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											activeTimeline === "today"
												? COLORS.darkBlue
												: COLORS.fadedBlue,
									},
								]}
							>
								Today
							</Text>
						</Pressable>
						<Pressable onPress={() => setActiveTimeline("tomorrow")}>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											activeTimeline === "tomorrow"
												? COLORS.darkBlue
												: COLORS.fadedBlue,
									},
								]}
							>
								Tomorrow
							</Text>
						</Pressable>
					</View>
					<View
						style={{
							height: "100%",
							backgroundColor: COLORS.fadedBlue,
							width: 2,
						}}
					/>
					<View
						style={{
							flexDirection: "row",
							gap: rMS(SIZES.h10),
						}}
					>
						<Pressable onPress={() => setState("active")}>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											state === "active" ? COLORS.darkBlue : COLORS.fadedBlue,
									},
								]}
							>
								Active
							</Text>
						</Pressable>
						<Pressable onPress={() => setState("done")}>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											state === "done" ? COLORS.darkBlue : COLORS.fadedBlue,
									},
								]}
							>
								Done
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
			<SafeAreaContainer>
				{loading ? (
					<Loader visible={loading} />
				) : (
					<FlatList
						contentContainerStyle={{
							paddingBottom: rMS(100),
						}}
						data={taskData.filter(
							(item: DayWithTasks) =>
								activeTimeline === getDateStatus(item.title)
						)}
						renderItem={({ item }) => (
							<MultiTaskItem showDateTitle item={item} checkBoxVisible />
						)}
						ListEmptyComponent={
							<ListEmptyComponent
								title="No Tasks"
								description="You don’t have any task scheduled for today"
							/>
						}
					/>
				)}
			</SafeAreaContainer>
		</ViewContainer>
	);
};

export default Tasks;
