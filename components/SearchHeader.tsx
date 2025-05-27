import { View, Text, Pressable } from "react-native";
import React from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import { MaterialIcons } from "@expo/vector-icons";

const SearchHeader = ({
	screenTitle,
	handleSearch,
}: {
	screenTitle: string;
	handleSearch: () => void;
}) => {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				paddingVertical: rMS(SIZES.h3),
			}}
		>
			<Text
				style={{
					fontSize: rMS(SIZES.h5),
					color: COLORS.darkBlue,
				}}
			>
				{screenTitle}
			</Text>
			<Pressable onPress={handleSearch}>
				<MaterialIcons
					name="search"
					size={rMS(SIZES.h4)}
					color={COLORS.darkBlue}
				/>
			</Pressable>
		</View>
	);
};

export default SearchHeader;
