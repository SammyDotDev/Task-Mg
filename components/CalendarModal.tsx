import {
	View,
	Text,
	StatusBar,
	Dimensions,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import { formatDate, formatFullDate, universalStyles } from "@/utils";
import { COLORS } from "@/constants/COLORS";
import { MaterialIcons } from "@expo/vector-icons";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";

const INITIAL_DATE = new Date();

const CalendarModal = ({
	showCalendar,
	handleBackdropPress,
}: {
	showCalendar: boolean;
	handleBackdropPress: () => void;
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
						// setSelected(day.dateString);
					}}
					hideExtraDays
					customHeaderTitle={
						<Text style={universalStyles.textL}>
							{formatFullDate(new Date())}
						</Text>
					}
					renderArrow={(direction) => {
						console.log(direction);
						return (
							<MaterialIcons
								name={`arrow-${
									direction === "left" ? "back-ios-new" : "forward-ios"
								}`}
								size={rMS(SIZES.h5)}
								color="black"
							/>
						);
					}}
					markedDates={{
						[selected]: {
							selected: true,
							disableTouchEvent: true,
							selectedColor: COLORS.darkBlue,
							selectedTextColor: "white",
						},
					}}
				/>
			</SafeAreaView>
		</Modal>
	);
};

export default CalendarModal;
