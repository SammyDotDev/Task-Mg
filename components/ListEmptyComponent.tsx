import { View, Text } from "react-native";
import React from "react";
import { universalStyles } from "@/utils";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";

const ListEmptyComponent = () => {
	return (
		<View
			style={{
				width: "100%",
				gap: rMS(SIZES.h5),
			}}
		>
			<Text style={universalStyles.textL}>Are you sure?</Text>
			<Text
				style={[
					universalStyles.baseText,
					{
						textAlign: "center",
						fontWeight: "400",
					},
				]}
			>
				Are you sure you want to logout of your account?
			</Text>
		</View>
	);
};

export default ListEmptyComponent;
