import { View, Text } from "react-native";
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
import { formatDate, getMonthName } from "@/utils";

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
							theme={{
								arrowColor: COLORS.darkBlue,
								selectedDayBackgroundColor: "#717D96",
								textDayFontWeight: "600",
								textDayStyle: {
									// backgroundColor: COLORS.paleWhite,
									// padding: rMS(SIZES.h10),
									borderRadius: 99,
									color: COLORS.darkBlue,
									fontWeight: "600",
								},
								dayTextColor: COLORS.darkBlue,
							}}
							dayComponent={({ date, state }) => {
								const isSelected = date?.dateString === selected;
								const isToday =
									date?.dateString ===
									CalendarUtils.getCalendarDateString(new Date());

								return (
									<View
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
												fontWeight: "600",
											}}
										>
											{date?.day}
										</Text>
									</View>
								);
							}}
						/>
					</Fragment>
				</View>
			</SafeAreaScrollView>
		</ViewContainer>
	);
};

export default Calender;
