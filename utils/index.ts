import { Platform, StyleSheet } from "react-native";
import { rMS, rS, rV } from "./responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";

export default {
	rS,
	rV,
	rMS,
};

export const isAndroid = Platform.OS === "android";

export const getMonthName = (date: Date) => {
	return date.toLocaleString("en-US", { month: "long" });
};
export const formatDate = (date: Date) => {
	return date.toISOString().split("T")[0];
};

export const universalStyles = StyleSheet.create({
	headerText: {
		fontSize: rMS(SIZES.h1),
		fontWeight: "700",
		color: COLORS.darkBlue,
	},
	baseText: {
		fontSize: rMS(SIZES.h7),
		fontWeight: "500",
		color: COLORS.darkBlue,
	},
	textSm: {
		fontSize: rMS(SIZES.h8),
		fontWeight: "500",
		color: COLORS.darkBlue,
	},
	textL: {
		fontSize: rMS(SIZES.h4),
		fontWeight: "500",
		color: COLORS.darkBlue,
	},
});
