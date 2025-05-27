import { View, Text, FlatList, Pressable } from "react-native";
import React, { Fragment, useCallback, useMemo, useState } from "react";
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
import { agendaItems } from "@/assets/data/agendaItems";
import TaskItem from "@/components/TaskItem";
import ListEmptyComponent from "@/components/ListEmptyComponent";

const Calender = () => {
	const INITIAL_DATE = new Date();

	const [selected, setSelected] = useState(formatDate(INITIAL_DATE));
	const [currentMonth, setCurrentMonth] = useState(formatDate(INITIAL_DATE));

	const getDate = (count: number) => {
		const date = new Date(formatDate(INITIAL_DATE));
		const newDate = date.setDate(date.getDate() + count);
		return CalendarUtils.getCalendarDateString(newDate);
	};

	const onDayPress = useCallback((day) => {
		setSelected(day.dateString);
	}, []);

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
	return (
		<ViewContainer>
			<SafeAreaScrollView>
				<SearchHeader screenTitle="Calendar" handleSearch={() => {}} />
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
											backgroundColor: isSelected ? "#717D96" : "#F1F3F6", // light bluish for all unselected
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Text
											style={{
												color: isSelected ? "white" : COLORS.darkBlue,
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
					<FlatList
						scrollEnabled={false}
						data={agendaItems}
						renderItem={({ item }) => <TaskItem item={item} />}
						ListEmptyComponent={<ListEmptyComponent />}
					/>
				</View>
			</SafeAreaScrollView>
		</ViewContainer>
	);
};

export default Calender;
