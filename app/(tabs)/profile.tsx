import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useState } from "react";
import ViewContainer from "@/utils/ViewContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import { SIZES } from "@/constants/SIZES";
import { rMS } from "@/utils/responsive_size";
import ProfileItem from "@/components/ProfileItem";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/COLORS";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import LogoutModal from "@/components/LogoutModal";
import { universalStyles } from "@/utils";

const Settings = () => {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [logoutModalIsVisible, setLogoutModalIsVisible] =
		useState<boolean>(false);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images", "videos"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setProfileImage(result.assets[0].uri);
		}
	};

	return (
		<>
			<ViewContainer>
				<SafeAreaScrollView>
					<View style={{ alignItems: "center", marginBottom: rMS(SIZES.h10) }}>
						<View style={{ marginVertical: rMS(SIZES.h5) }}>
							<View style={{ position: "relative" }}>
								{profileImage ? (
									<Image
										source={{ uri: profileImage }}
										style={{
											width: rMS(100),
											height: rMS(100),
											borderRadius: 99,
											backgroundColor: COLORS.lightGray,
										}}
									/>
								) : (
									<View
										style={{
											width: rMS(100),
											height: rMS(100),
											borderRadius: 99,
											backgroundColor: COLORS.lightGray,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Text style={[universalStyles.headerText]}>S</Text>
									</View>
								)}
								<TouchableOpacity
									onPress={pickImage}
									activeOpacity={0.7}
									style={{
										width: rMS(30),
										height: rMS(30),
										borderRadius: 99,
										backgroundColor: COLORS.dimWhite,
										justifyContent: "center",
										alignItems: "center",
										position: "absolute",
										bottom: 0,
										right: 0,
									}}
								>
									<Feather
										name="camera"
										size={rMS(SIZES.h8)}
										color={COLORS.darkBlue}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<Text style={universalStyles.textL}>Jane Doe</Text>
						<Text
							style={{
								fontSize: rMS(SIZES.h7),
								fontWeight: "300",
								color: COLORS.darkBlue,
							}}
						>
							jane.doe@gmail.com
						</Text>
					</View>
					<View>
						<ProfileItem
							onPress={() => router.push("/screens/userInfo")}
							icon={
								<Feather
									name="edit"
									size={rMS(SIZES.h4)}
									color={COLORS.darkBlue}
								/>
							}
							title="User Info"
						/>
						<ProfileItem
							onPress={() => {}}
							icon={
								<Ionicons
									name="language"
									size={rMS(SIZES.h4)}
									color={COLORS.darkBlue}
								/>
							}
							title="Language"
							isLanguage
						/>
						<ProfileItem
							onPress={() => setLogoutModalIsVisible(true)}
							icon={
								<Feather
									name="log-out"
									size={rMS(SIZES.h4)}
									color={COLORS.red}
								/>
							}
							title="Logout"
							isLogout
						/>
					</View>
				</SafeAreaScrollView>
			</ViewContainer>
			<LogoutModal
				isVisible={logoutModalIsVisible}
				handleBackdropPress={() => setLogoutModalIsVisible(false)}
				handleLogoutPress={() => {}} /* handle logout */
			/>
		</>
	);
};

export default Settings;
