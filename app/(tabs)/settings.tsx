import { View, Text } from "react-native";
import React from "react";
import ViewContainer from "@/utils/ViewContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import { SIZES } from "@/constants/SIZES";
import { rMS } from "@/utils/responsive_size";

const Settings = () => {
	return (
		<ViewContainer>
			<SafeAreaScrollView>
				<Text
					style={{
						fontSize: rMS(SIZES.h5),
						marginHorizontal: rMS(SIZES.h6),
						paddingVertical: rMS(SIZES.h9),
					}}
				>
					Settings
				</Text>
			</SafeAreaScrollView>
		</ViewContainer>
	);
};

export default Settings;
