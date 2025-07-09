import { View, Text, TextInput } from "react-native";
import React from "react";
import { COLORS } from "@/constants/COLORS";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { universalStyles } from "@/utils";

const SearchBar = ({
	placeholder = "Search...",
	onChangeText,
	value,
	style,
    onBlur,
	...props
}: {
	placeholder?: string;
	onChangeText?: (text: string) => void;
	value?: string;
    onBlur?: () => void;
	[key: string]: any; // For additional props
}) => {
	return (
		<View style={[style]}>
			<TextInput
				onChangeText={onChangeText}
				value={value}
				placeholder={placeholder}
                onBlur={() => {}}
                placeholderTextColor={COLORS.fadedBlue}
				style={[
					{
						width: "100%",
						height: rMS(40),
						backgroundColor: COLORS.paleWhite,
						paddingHorizontal: rMS(SIZES.h8),
						borderRadius: 99,
						fontWeight: "300",
					},
					universalStyles.textSm,
				]}
			/>
		</View>
	);
};

export default SearchBar;
