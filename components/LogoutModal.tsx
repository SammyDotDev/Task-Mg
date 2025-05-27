import { View, Text, StatusBar } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import CustomButton from "./CustomButton";

const LogoutModal = ({
	isVisible,
	handleBackdropPress,
    handleLogoutPress
}: {
	isVisible: boolean;
	handleBackdropPress: () => void;
    handleLogoutPress: () => void;

}) => {
	return (
		<Modal
			onBackdropPress={handleBackdropPress}
			animationIn={"slideInDown"}
			animationOut={"slideOutDown"}
			isVisible={isVisible}
			statusBarTranslucent
			hideModalContentWhileAnimating={true}
			backdropTransitionInTiming={0}
			backdropTransitionOutTiming={0}
		>
			<StatusBar barStyle={"dark-content"} />
			<View
				style={{
					backgroundColor: COLORS.white,
					borderRadius: rMS(SIZES.h5),
					padding: rMS(SIZES.h3),
					alignItems: "center",
				}}
			>
				<View
					style={{
						width: rMS(60),
						height: rMS(60),
						justifyContent: "center",
						alignItems: "center",
						padding: rMS(SIZES.h8),
						backgroundColor: COLORS.fadedRed,
						borderRadius: 99,
					}}
				>
					<Feather name="log-out" size={rMS(SIZES.h6)} color={COLORS.red} />
				</View>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						gap: rMS(SIZES.h13),
						marginVertical: rMS(SIZES.h7),
					}}
				>
					<Text
						style={{
							fontSize: rMS(SIZES.h4),
							fontWeight: "500",
							color: COLORS.darkBlue,
						}}
					>
						Are you sure?
					</Text>
					<Text
						style={{
							fontSize: rMS(SIZES.h7),
							fontWeight: "400",
							color: COLORS.darkBlue,
							textAlign: "center",
						}}
					>
						Are you sure you want to logout of your account?
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						width: "90%",
					}}
				>
					<CustomButton
						title={"No"}
						extendedStyles={{
							borderColor: COLORS.red,
							backgroundColor: COLORS.red,
							padding: rMS(SIZES.h9),
							width: "85%",
						}}
						onPress={handleBackdropPress}
					/>
					<CustomButton
						title={"Logout"}
						extendedStyles={{
							backgroundColor: "transparent",
							padding: rMS(SIZES.h9),
							width: "85%",
						}}
						titleStyles={{
							color: COLORS.darkBlue,
						}}
						onPress={handleLogoutPress}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default LogoutModal;
