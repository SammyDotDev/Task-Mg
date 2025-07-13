import { StatusBar, SafeAreaView } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "@/constants/COLORS";

const FilterPriorityModal = ({
	showFilter,
	handleBackdropPress,
	setSelectedPriority,
	selectedPriority,
	setShowPriorityFilter,
}: {
	showFilter: boolean;
	handleBackdropPress: () => void;
	setSelectedPriority: (text: string) => void;
	selectedPriority: string;
	setShowPriorityFilter: (bool: boolean) => void;
}) => {
	return (
		<Modal
			onBackdropPress={handleBackdropPress}
			isVisible={showFilter}
			// backdropOpacity={0.1}
			animationIn="slideInDown"
			animationOut="slideOutUp"
			hideModalContentWhileAnimating={true}
			backdropTransitionInTiming={0}
			backdropTransitionOutTiming={1}
			// deviceHeight={deviceHeight}
			// deviceWidth={deviceWidth}
			// style={{ margin: 0 }}
			statusBarTranslucent
			// style={{ margin: 0 }}
		>
			{/* <StatusBar
				backgroundColor={showFilter ? "rgba(0, 0, 0, 0.1)" : undefined}
				barStyle="dark-content"
			/> */}
			{/* <StatusBar /> */}
			<SafeAreaView
				style={{
					backgroundColor: "white",
					borderRadius: 10,
					// ...StyleSheet.absoluteFillObject,
					// justifyContent: "center",
					// alignItems: "center",
				}}
			>
				<Picker
					selectedValue={selectedPriority}
					onValueChange={(itemValue, itemIndex) => {
						setSelectedPriority(itemValue);
						setShowPriorityFilter(false);
					}}
					itemStyle={{
						// backgroundColor: "black",
						// width: 100,
						color: "black",
						borderRadius: 20,
						backgroundColor: COLORS.paleWhite,
						fontSize: 18,
						fontWeight: "400",
					}}
				>
					<Picker.Item label="low" value="low" />
					<Picker.Item label="medium" value="medium" />
					<Picker.Item label="high" value="high" />
				</Picker>
			</SafeAreaView>
		</Modal>
	);
};

export default FilterPriorityModal;
