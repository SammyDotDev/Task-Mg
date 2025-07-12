import { View, Text, FlatList, Pressable } from "react-native";
import React, {
	Fragment,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import ViewContainer from "@/utils/ViewContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import { SIZES } from "@/constants/SIZES";
import { rMS } from "@/utils/responsive_size";
import Header from "@/components/Header";
import SearchHeader from "@/components/SearchHeader";
import { COLORS } from "@/constants/COLORS";
import { Calendar, CalendarUtils } from "react-native-calendars";
import testIDs from "@/assets/data/testIDs";
import { formatDate, getMonthName, universalStyles } from "@/utils";
import { agendaItems, DayWithTasks } from "@/assets/data/agendaItems";
import TaskItem from "@/components/TaskItem";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { useTasks } from "@/context/TasksContext";
import Loader from "@/components/Loader";
import MultiTaskItem from "@/components/MultiTaskItem";
import CalendarMultiTaskItem from "@/components/CalendarMultiTaskItem";

const Calender = () => {
	const INITIAL_DATE = new Date();

	const { taskData, loading } = useTasks();
    
	const [selected, setSelected] = useState(formatDate(INITIAL_DATE));
	const [currentMonth, setCurrentMonth] = useState(formatDate(INITIAL_DATE));
	const [showSearchBar, setShowSearchBar] = useState<boolean>(true);
	const [search, setSearch] = useState("");
	const [filteredData, setFilteredData] = useState<DayWithTasks[]>(taskData);

	// filter tasks based on current day

	const getDate = (count: number) => {
		const date = new Date(formatDate(INITIAL_DATE));
		const newDate = date.setDate(date.getDate() + count);
		return CalendarUtils.getCalendarDateString(newDate);
	};

	const onDayPress = useCallback((day) => {
		setSelected(day.dateString);

	}, []);
	useEffect(() => {
		if (!taskData) return;

		if (search.trim() === "") {
			setFilteredData(
				taskData.filter((item: DayWithTasks) => item.title === selected)
			); // reset
			return;
		}

		const lowerSearch = search.toLowerCase();

		const filtered = taskData
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

		setFilteredData(
			filtered.filter((item: DayWithTasks) => item.title === selected)
		);
	}, [search]);

	const marked = useMemo(() => {
		return {
			[selected]: {
				selected: true,
				disableTouchEvent: true,
				selectedColor: "#717D96",
				selectedTextColor: "white",
			},
			[getDate(0)]: {
				selected: true,
				selectedColor: "#717D96",
				selectedTextColor: "white",
			},
		};
	}, [selected]);
	useEffect(() => {
		console.log(selected, "SELECTED DATE", taskData);
	}, []);
	return (
		<ViewContainer>
			<SafeAreaScrollView>
				<SearchHeader
					search={search}
					setSearch={setSearch}
					screenTitle="Calendar"
				/>
				<View>
					<Text
						style={{
							fontSize: rMS(SIZES.h1),
							fontWeight: "700",
							color: COLORS.darkBlue,
						}}
					>
						{getMonthName(INITIAL_DATE)}
					</Text>
					<Fragment>
						<Calendar
							testID={testIDs.calendars.FIRST}
							enableSwipeMonths
							current={formatDate(INITIAL_DATE)}
							// style={styles.calendar}
							onDayPress={onDayPress}
							markedDates={marked}
							firstDay={1}
							customHeaderTitle={<View />}
							hideArrows
							hideExtraDays
							dayComponent={({ date, state, onPress }) => {
								const isSelected = date?.dateString === selected;
								const isToday =
									date?.dateString ===
									CalendarUtils.getCalendarDateString(new Date());

								return (
									<Pressable
										onPress={() => onPress && onPress(date)}
										style={{
											width: 36,
											height: 36,
											borderRadius: 18,
											backgroundColor: isToday
												? COLORS.darkBlue
												: isSelected
												? "#717D96"
												: "#F1F3F6", // light bluish for all unselected
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Text
											style={{
												color: isToday
													? COLORS.white
													: isSelected
													? COLORS.white
													: COLORS.darkBlue,
												fontWeight: "700",
											}}
										>
											{date?.day}
										</Text>
									</Pressable>
								);
							}}
						/>
					</Fragment>
				</View>
				<View
					style={{
						paddingVertical: rMS(SIZES.h3),
					}}
				>
					<Text
						style={{
							fontSize: rMS(SIZES.h5),
							color: COLORS.darkBlue,
						}}
					>
						Tasks
					</Text>
					{loading ? (
						<Loader visible={loading} />
					) : (
						<FlatList
							scrollEnabled={false}
							data={filteredData}
							renderItem={({ item }) => (
								<CalendarMultiTaskItem dayItem={item} />
							)}
							ListEmptyComponent={
								<ListEmptyComponent
									title="No Tasks"
									description="You don’t have any task scheduled for today"
								/>
							}
						/>
					)}
				</View>
			</SafeAreaScrollView>
		</ViewContainer>
	);
};

export default Calender;
