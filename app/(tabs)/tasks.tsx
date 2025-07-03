import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ViewContainer from "@/utils/ViewContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import SearchHeader from "@/components/SearchHeader";
import { getDateStatus, universalStyles } from "@/utils";
import { COLORS } from "@/constants/COLORS";
import { agendaItems, DayWithTasks } from "@/assets/data/agendaItems";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import { useTasks } from "@/context/TasksContext";
import Loader from "@/components/Loader";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import MultiTaskItem from "@/components/MultiTaskItem";
import SearchBar from "@/components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tasks = () => {
	const { taskData, loading } = useTasks();
	const [activeTimeline, setActiveTimeline] = useState("today");
	const [state, setState] = useState<"active" | "done">("active");
	const [search, setSearch] = useState("");
    const [showSearchBar, setShowSearchBar] = useState<boolean>(true);
	const [filteredData, setFilteredData] = useState<DayWithTasks[]>(taskData);
    const filteredTasks = useMemo(() => {
        if (!taskData) return [];

        return taskData
            .filter((item) => activeTimeline === getDateStatus(item.title))
            .filter((item) => item.data.length > 0);
    }, [taskData, activeTimeline]);
	useEffect(() => {
		if (!filteredTasks) return;

		if (search.trim() === "") {
			setFilteredData(filteredTasks); // reset
			return;
		}

		const lowerSearch = search.toLowerCase();

		const filtered = filteredTasks
			.map((day) => {
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
	}, [search, filteredTasks, activeTimeline, state]);

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
					paddingBottom: rMS(SIZES.h3),
				}}
			>
				<SearchHeader
					screenTitle="Tasks"
					setSearch={setSearch}
					search={search}
                    showSearchBar={showSearchBar}
                    setShowSearchBar={setShowSearchBar}
				/>

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
			</SafeAreaContainer>
		</ViewContainer>
	);
};

export default Tasks;
