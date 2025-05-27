import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import ViewContainer from "@/utils/ViewContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import SearchHeader from "@/components/SearchHeader";
import { universalStyles } from "@/utils";
import { COLORS } from "@/constants/COLORS";

const Tasks = () => {
	const [activeTimeline, setActiveTimeline] = useState("today");
	const [state, setState] = useState("active");
	return (
		<ViewContainer>
			<SafeAreaScrollView>
				<SearchHeader screenTitle="Tasks" handleSearch={() => {}} />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							gap: rMS(SIZES.h5),
						}}
					>
						<Pressable onPress={() => setActiveTimeline("past")}>
							<Text
								style={[
									universalStyles.baseText,
									{
										color:
											activeTimeline === "past"
												? COLORS.darkBlue
												: COLORS.fadedBlue,
									},
								]}
							>
								Past
							</Text>
						</Pressable>
						<Pressable onPress={() => setActiveTimeline("today")}>
							<Text
								style={[
									universalStyles.baseText,
									{
										color:
											activeTimeline === "today"
												? COLORS.darkBlue
												: COLORS.fadedBlue,
									},
								]}
							>
								Today
							</Text>
						</Pressable>
						<Pressable onPress={() => setActiveTimeline("tomorrow")}>
							<Text
								style={[
									universalStyles.baseText,
									{
										color:
											activeTimeline === "tomorrow"
												? COLORS.darkBlue
												: COLORS.fadedBlue,
									},
								]}
							>
								Tomorrow
							</Text>
						</Pressable>
					</View>
					<View
						style={{
							height: "100%",
							backgroundColor: COLORS.fadedBlue,
							width: 2,
						}}
					/>
					<View
						style={{
							flexDirection: "row",
							gap: rMS(SIZES.h5),
						}}
					>
						<Pressable onPress={() => setState("active")}>
							<Text
								style={[
									universalStyles.baseText,
									{
										color:
											state === "active" ? COLORS.darkBlue : COLORS.fadedBlue,
									},
								]}
							>
								Active
							</Text>
						</Pressable>
						<Pressable onPress={() => setState("done")}>
							<Text
								style={[
									universalStyles.baseText,
									{
										color:
											state === "done" ? COLORS.darkBlue : COLORS.fadedBlue,
									},
								]}
							>
								Done
							</Text>
						</Pressable>
					</View>
				</View>
			</SafeAreaScrollView>
		</ViewContainer>
	);
};

export default Tasks;
