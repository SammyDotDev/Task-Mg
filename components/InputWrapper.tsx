import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/constants/COLORS";

const InputWrapper = ({
	children,
	backgroundColor,
}: {
	children: React.ReactNode;
	backgroundColor: string;
}) => {
	return (
		<View
			style={{
				backgroundColor: backgroundColor + "39",
				borderRadius: 45,
				width: "90%",
				marginHorizontal: "auto",
			}}
		>
			{children}
		</View>
	);
};

export default InputWrapper;
