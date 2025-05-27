import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isAndroid } from "@/utils";

const ScreenHeader = ({ screenTitle }: { screenTitle: string }) => {
	const marginTop = isAndroid ? useSafeAreaInsets().top : null;
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				position: "relative",
				paddingHorizontal: rMS(SIZES.h9),
                paddingBottom:rMS(SIZES.h9),
				marginTop,
			}}
		>
			{/* Back Button */}
			<TouchableOpacity
				onPress={() => router.back()}
				style={{ position: "absolute", left: rMS(SIZES.h9) }}
			>
				<MaterialIcons
					name="keyboard-backspace"
					size={rMS(SIZES.h4)}
					color={COLORS.darkBlue}
				/>
			</TouchableOpacity>
			{/* Screen Header */}

			<Text
				style={{
					fontSize: rMS(SIZES.h7),
					fontWeight: "500",
					color: COLORS.darkBlue,
					marginHorizontal: "auto",
				}}
			>
				{screenTitle}
			</Text>
		</View>
	);
};

export default ScreenHeader;
