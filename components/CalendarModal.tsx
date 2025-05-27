import {
	View,
	Text,
	StatusBar,
	Dimensions,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";

const CalendarModal = ({
	showCalendar,
	handleBackdropPress,
}: {
	showCalendar: boolean;
	handleBackdropPress: () => void;
}) => {
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
				style={{
					// ...StyleSheet.absoluteFillObject,
					// justifyContent: "center",
					// alignItems: "center",
				}}
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
					// markedDates={{
					// 	[selected]: {
					// 		selected: true,
					// 		disableTouchEvent: true,
					// 		selectedDotColor: "orange",
					// 	},
					// }}
				/>
			</SafeAreaView>
		</Modal>
	);
};

export default CalendarModal;
