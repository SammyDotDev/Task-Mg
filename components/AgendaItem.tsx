import isEmpty from "lodash/isEmpty";
import React, { useCallback } from "react";
import {
	StyleSheet,
	Alert,
	View,
	Text,
	TouchableOpacity,
	Button,
} from "react-native";
import testIDs from "../assets/data/testIDs";
import { COLORS } from "@/constants/COLORS";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { universalStyles } from "@/utils";

interface ItemProps {
	item: any;
}

const AgendaItem = (props: ItemProps) => {
	const { item } = props;

	const buttonPressed = useCallback(() => {
		Alert.alert("Show me more");
	}, []);

	const itemPressed = useCallback(() => {
		Alert.alert(item.title);
	}, [item]);

	if (isEmpty(item)) {
		return (
			<View style={styles.emptyItem}>
				<Text style={styles.emptyItemText}>No Events Planned Today</Text>
			</View>
		);
	}

	return (
		<TouchableOpacity
			onPress={itemPressed}
			style={styles.item}
			testID={testIDs.agenda.ITEM}
		>
			<View
				style={{
					paddingVertical: rMS(SIZES.h7),
					paddingHorizontal: rMS(SIZES.h10),
					width: "15%",
					backgroundColor: COLORS.dimWhite,
					alignItems: "center",
				}}
			>
				<Text
					style={[
						universalStyles.textSm,
						{
							color: "#A0ABC0",
						},
					]}
				>
					{item.hour}
				</Text>
				<Text style={styles.itemDurationText}>{item.duration}</Text>
			</View>
			<View
				style={{
					borderLeftWidth: 2.5,
					borderColor: COLORS.darkBlue,
					padding: rMS(SIZES.h8),
					backgroundColor: "#EDF0F7",
					width: "85%",
					justifyContent: "center",
				}}
			>
				<Text
					style={{
						fontSize: rMS(SIZES.h8),
						fontWeight: "500",
						color: COLORS.darkBlue,
					}}
				>
					{item.title}
				</Text>
			</View>
			{/* <View style={styles.itemButtonContainer}>
				<Button color={"grey"} title={"Info"} onPress={buttonPressed} />
			</View> */}
		</TouchableOpacity>
	);
};

// export default React.memo(AgendaItem);
export default AgendaItem;

const styles = StyleSheet.create({
	item: {
		// padding: 20,
		// backgroundColor: "#000",
		flexDirection: "row",
		// flexWrap:"wrap",
		width: "100%",
	},
	itemHourText: {
		color: "#A0ABC0",
		fontWeight: "500",
	},
	itemDurationText: {
		color: "grey",
		fontSize: 12,
		marginTop: 4,
		marginLeft: 4,
	},
	itemTitleText: {
		color: "black",
		marginLeft: 16,
		fontWeight: "bold",
		fontSize: 16,
	},
	itemButtonContainer: {
		flex: 1,
		alignItems: "flex-end",
	},
	emptyItem: {
		paddingLeft: 20,
		height: 52,
		justifyContent: "center",
		borderBottomWidth: 1,
		borderBottomColor: "lightgrey",
	},
	emptyItemText: {
		color: "lightgrey",
		fontSize: 14,
	},
});
