import { Platform } from "react-native";
import { rMS, rS, rV } from "./responsive_size";

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
