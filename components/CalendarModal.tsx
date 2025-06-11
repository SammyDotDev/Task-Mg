import {
	View,
	Text,
	StatusBar,
	Dimensions,
	StyleSheet,
	SafeAreaView,
	Pressable,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { formatDate, formatFullDate, universalStyles } from "@/utils";
import { COLORS } from "@/constants/COLORS";
import { MaterialIcons } from "@expo/vector-icons";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";

const INITIAL_DATE = new Date();

const CalendarModal = ({
	showCalendar,
	handleBackdropPress,
	setDateString,
}: {
	showCalendar: boolean;
	handleBackdropPress: () => void;
	setDateString: (text: string) => void;
}) => {
	const [selected, setSelected] = useState(formatDate(INITIAL_DATE));
	return (
		<Modal
			onBackdropPress={handleBackdropPress}
			isVisible={showCalendar}
			// backdropOpacity={0.1}
			animationIn="slideInDown"
			animationOut="slideOutUp"
			hideModalContentWhileAnimating={true}
			backdropTransitionInTiming={0}
			backdropTransitionOutTiming={0}
			// deviceHeight={deviceHeight}
			// deviceWidth={deviceWidth}
			// style={{ margin: 0 }}
			statusBarTranslucent
			// style={{ margin: 0 }}
		>
			<StatusBar
				backgroundColor={showCalendar ? "rgba(0, 0, 0, 0.1)" : undefined}
				barStyle="dark-content"
			/>
			{/* <StatusBar /> */}
			<SafeAreaView
				style={
					{
						// ...StyleSheet.absoluteFillObject,
						// justifyContent: "center",
						// alignItems: "center",
					}
				}
			>
				<Calendar
					style={{
						// Position: "absolute",
						borderRadius: 25,
						overflow: "hidden",
					}}
					theme={{
						backgroundColor: "#ffffff",
						calendarBackground: "#ffffff",
						textSectionTitleColor: "#b6c1cd",
						selectedDayBackgroundColor: "#00adf5",
						selectedDayTextColor: "#ffffff",
						todayTextColor: "#00adf5",
						dayTextColor: "#2d4150",
						textDisabledColor: "#dd99ee",
					}}
					onDayPress={(day: any) => {
						// console.log(day);
						setDateString(day.dateString);
						// setSelected(day.dateString);
					}}
					hideExtraDays
					renderArrow={(direction) => (
						<MaterialIcons
							name={`arrow-${
								direction === "left" ? "back-ios-new" : "forward-ios"
							}`}
							size={rMS(SIZES.h5)}
							color="black"
						/>
					)}
					markedDates={{
						[selected]: {
							selected: true,
							disableTouchEvent: true,
							selectedColor: COLORS.darkBlue,
							selectedTextColor: "white",
						},
					}}
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
			</SafeAreaView>
		</Modal>
	);
};

export default CalendarModal;
