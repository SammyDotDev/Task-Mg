import { View, Text } from "react-native";
import React from "react";
import ViewContainer from "@/utils/ViewContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import { SIZES } from "@/constants/SIZES";
import { rMS } from "@/utils/responsive_size";
import Header from "@/components/Header";

const Calender = () => {
	return (
		<ViewContainer>
			<SafeAreaScrollView>
				<Header handleNotification={() => {}} addIsVisible={false} />
				<Text
					style={{
						fontSize: rMS(SIZES.h5),
						marginHorizontal: rMS(SIZES.h6),
						paddingVertical: rMS(SIZES.h9),
					}}
				>
					Task Schedule
				</Text>
			</SafeAreaScrollView>
		</ViewContainer>
	);
};

export default Calender;
