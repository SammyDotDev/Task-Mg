import { ActivityIndicator, Modal, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { rMS } from "@/utils/responsive_size";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "@/constants/COLORS";
import { SIZES } from "@/constants/SIZES";

const Loader = ({ visible }: { visible: boolean }) => {
	return (
		<Modal
			transparent
			visible={visible}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgb(255, 255, 255)", // Semi-transparent background
				justifyContent: "center",
				alignItems: "center",
				zIndex: 999999999,
			}}
			statusBarTranslucent
		>
			<View
				style={{
					flex: 1,
					backgroundColor: "rgb(255, 255, 255)", // dim background
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View
					style={{
						width: 50,
						height: 50,
						backgroundColor: "#fff",
						borderRadius: 10,
						justifyContent: "center",
						alignItems: "center",
						margin: "auto",
					}}
				>
					<ActivityIndicator color={COLORS.darkBlue} size={rMS(SIZES.h1)} />
					<StatusBar />
				</View>
			</View>
			<StatusBar backgroundColor="rgba(0,0,0,0.5)" />
		</Modal>
	);
};

export default Loader;
