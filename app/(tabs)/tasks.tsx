import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ViewContainer from "@/utils/ViewContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import SearchHeader from "@/components/SearchHeader";
import { getDateStatus, universalStyles } from "@/utils";
import { COLORS } from "@/constants/COLORS";
import { agendaItems, DayWithTasks, Task } from "@/assets/data/agendaItems";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import { useTasks } from "@/context/TasksContext";
import Loader from "@/components/Loader";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import MultiTaskItem from "@/components/MultiTaskItem";
import { Dropdown } from "react-native-element-dropdown";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import FilterPriorityModal from "@/components/FilterPriorityModal";

const Tasks = () => {
	const { taskData, loading } = useTasks();
	const [activeTimeline, setActiveTimeline] = useState("today");
	const [state, setState] = useState<"active" | "done">("active");
	const [search, setSearch] = useState("");
	const [filteredData, setFilteredData] = useState<DayWithTasks[]>(taskData);

	const [showPriorityFilter, setShowPriorityFilter] = useState(false);
	const [selectedPriority, setSelectedPriority] = useState("");
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);

	const filterData = [
		{ label: "low", value: "low" },
		{ label: "medium", value: "medium" },
		{ label: "high", value: "high" },
	];
	const filteredTasks = useMemo(() => {
		if (!taskData) return [];

		return taskData
			.map((item: DayWithTasks) => {
				// Filter nested tasks by selected priority
				const isTimeline =
					activeTimeline === "past" ||
					activeTimeline === "present" ||
					activeTimeline === "upcoming";

				const filteredData = selectedPriority
					? item.data.filter((task) => task.priority === selectedPriority)
					: item.data;
				console.log(filteredData, "PRIORITY");
				return {
					...item,
					data: isTimeline ? item.data : filteredData,
				};
			})
			.filter((item: DayWithTasks) => {
				const isTimeline =
					activeTimeline === "past" ||
					activeTimeline === "present" ||
					activeTimeline === "upcoming";
				return isTimeline ? activeTimeline === getDateStatus(item.title) : item;
			})
			.filter((item: DayWithTasks) => item.data.length > 0);
		// .map((item: Task[]) =>
		// 	item.data.filter((item: Task) => item.priority === selectedPriority)
		// );
	}, [taskData, activeTimeline, selectedPriority]);
	useEffect(() => {
		console.log(selectedPriority, "FILTER!!!");
		if (!filteredTasks) return;

		if (search.trim() === "") {
			setFilteredData(filteredTasks); // reset
			return;
		}

		const lowerSearch = search.toLowerCase();

		const filtered = filteredTasks
			.map((day: DayWithTasks) => {
				const matchedTasks = day.data.filter(
					(task) =>
						task.title.toLowerCase().includes(lowerSearch) ||
						task.description.toLowerCase().includes(lowerSearch)
				);

				if (matchedTasks.length > 0) {
					return { ...day, data: matchedTasks };
				}

				return null;
			})

			.filter(Boolean) as DayWithTasks[];

		setFilteredData(filtered);
	}, [search, filteredTasks, activeTimeline, state, selectedPriority]);

	return (
		<ViewContainer
			style={{
				paddingTop: useSafeAreaInsets().top,
			}}
		>
			<View
				style={{
					paddingHorizontal: rMS(SIZES.h9),
					// paddingTop: rMS(SIZES.h3),
					paddingBottom: rMS(SIZES.h6),
				}}
			>
				<SearchHeader
					screenTitle="Tasks"
					setSearch={setSearch}
					search={search}
				/>

				<View
					style={{
						flexDirection: "column",
						justifyContent: "flex-start",
						// gap: 4,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							gap: rMS(SIZES.h10),
						}}
					>
						<Pressable
							style={{
								padding: rMS(SIZES.h11),
								backgroundColor:
									activeTimeline === "past"
										? COLORS.darkBlue
										: COLORS.paleWhite,
								borderRadius: 8,
							}}
							onPress={() => setActiveTimeline("past")}
						>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											activeTimeline === "past"
												? COLORS.white
												: COLORS.darkBlue,
										fontSize: rMS(12),
									},
								]}
							>
								Past
							</Text>
						</Pressable>
						<Pressable
							style={{
								padding: rMS(SIZES.h11),
								backgroundColor:
									activeTimeline === "today"
										? COLORS.darkBlue
										: COLORS.paleWhite,
								borderRadius: 8,
							}}
							onPress={() => setActiveTimeline("today")}
						>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											activeTimeline === "today"
												? COLORS.white
												: COLORS.darkBlue,
										fontSize: rMS(12),
									},
								]}
							>
								Today
							</Text>
						</Pressable>
						<Pressable
							style={{
								padding: rMS(SIZES.h11),
								backgroundColor:
									activeTimeline === "upcoming"
										? COLORS.darkBlue
										: COLORS.paleWhite,
								borderRadius: 8,
							}}
							onPress={() => setActiveTimeline("upcoming")}
						>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											activeTimeline === "upcoming"
												? COLORS.white
												: COLORS.darkBlue,
										fontSize: rMS(12),
									},
								]}
							>
								Upcoming
							</Text>
						</Pressable>
						{/* filter by priority */}
						<Pressable
							style={{
								padding: rMS(SIZES.h11),
								backgroundColor:
									activeTimeline === "priority"
										? COLORS.darkBlue
										: COLORS.paleWhite,
								borderRadius: 8,
							}}
							onPress={() => {
								setActiveTimeline("priority");
								setShowPriorityFilter((prev) => !prev);
							}}
						>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											activeTimeline === "priority"
												? COLORS.white
												: COLORS.darkBlue,
										fontSize: rMS(12),
									},
								]}
							>
								Priority
							</Text>
						</Pressable>
					</View>
					<View
						style={{
							width: "100%",
							height: 1,
							backgroundColor: COLORS.paleWhite,
							marginVertical: rMS(SIZES.h9),
						}}
					/>
					<View
						style={{
							flexDirection: "row",
							gap: rMS(SIZES.h10),
						}}
					>
						<Pressable
							style={{
								padding: rMS(SIZES.h11),
								backgroundColor:
									state === "active" ? COLORS.darkBlue : COLORS.paleWhite,
								borderRadius: 8,
							}}
							onPress={() => setState("active")}
						>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											state === "active" ? COLORS.paleWhite : COLORS.darkBlue,
										fontSize: rMS(12),
									},
								]}
							>
								Active
							</Text>
						</Pressable>
						<Pressable
							style={{
								padding: rMS(SIZES.h11),
								backgroundColor:
									state === "done" ? COLORS.darkBlue : COLORS.paleWhite,
								borderRadius: 8,
							}}
							onPress={() => setState("done")}
						>
							<Text
								style={[
									universalStyles.textSm,
									{
										color:
											state === "done" ? COLORS.paleWhite : COLORS.darkBlue,
										fontSize: rMS(12),
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
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: rMS(100),
						}}
						data={filteredData}
						renderItem={({ item }) => (
							<MultiTaskItem
								showDateTitle
								dayItem={item}
								checkBoxVisible
								state={state}
							/>
						)}
						ListEmptyComponent={
							<ListEmptyComponent
								title="No Tasks"
								description="You don’t have any task scheduled for today"
							/>
						}
					/>
				)}
				<FilterPriorityModal
					selectedPriority={selectedPriority}
					showFilter={showPriorityFilter}
					handleBackdropPress={() => setShowPriorityFilter(false)}
					setSelectedPriority={setSelectedPriority}
					setShowPriorityFilter={setShowPriorityFilter}
				/>
			</SafeAreaContainer>
		</ViewContainer>
	);
};

export default Tasks;
