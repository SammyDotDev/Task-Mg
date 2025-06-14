import { View, Text } from "react-native";
import React from "react";
import { universalStyles } from "@/utils";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";

const ListEmptyComponent = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<View
			style={{
				width: "100%",
				gap: rMS(SIZES.h5),
				alignItems: "center",
				paddingVertical: rMS(60),
			}}
		>
			<Text style={universalStyles.baseText}>{title}</Text>
			<Text
				style={[
					universalStyles.baseText,
					{
						textAlign: "center",
						fontWeight: "400",
						opacity: 0.5,
					},
				]}
			>
				{description}
			</Text>
		</View>
	);
};

export default ListEmptyComponent;
