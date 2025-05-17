import { Platform } from "react-native";
import { rMS, rS, rV } from "./responsive_size";

export default {
	rS,
	rV,
	rMS,
};

export const isAndroid = Platform.OS === "android";
