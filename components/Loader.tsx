import { Modal, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { rMS } from "@/utils/responsive_size";
import { StatusBar } from "expo-status-bar";

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
				backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
				justifyContent: "center",
				alignItems: "center",
				zIndex: 999999999,
			}}
		>
			<View
				style={{
					flex: 1,
					backgroundColor: "rgba(0,0,0,0.5)", // dim background
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View
					style={{
						width: 80,
						height: 80,
						backgroundColor: "#fff",
						borderRadius: 10,
						justifyContent: "center",
						alignItems: "center",
						margin: "auto",
					}}
				>
					<LottieView
						source={require("../assets/json/loader.json")}
						style={{ width: rMS(90), height: rMS(90) }}
						autoPlay
						loop
					/>
					<StatusBar />
				</View>
			</View>
			<StatusBar backgroundColor="rgba(0,0,0,0.5)" />
		</Modal>
	);
};

export default Loader;
