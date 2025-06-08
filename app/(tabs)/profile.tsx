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
import { supabase } from "@/lib/supabase";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useAuth } from "@/context/AuthContext";

const Settings = () => {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [logoutModalIsVisible, setLogoutModalIsVisible] =
		useState<boolean>(false);
    	const { session, profile } = useAuth();
        console.log(profile)

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

	const handleLogout = async () => {
		await supabase.auth
			.signOut()
			.then(() => {
				router.replace("/(auth)");
			})
			.catch((error) => console.log(error));
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
										<Text style={[universalStyles.headerText]}>
											{profile.username.charAt(0)}
										</Text>
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
						<Text style={universalStyles.textL}>
							{profile.username}
						</Text>
						<Text
							style={{
								fontSize: rMS(SIZES.h7),
								fontWeight: "300",
								color: COLORS.darkBlue,
							}}
						>
							{session?.user.email}
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
				handleLogoutPress={handleLogout} /* handle logout */
			/>
		</>
	);
};

export default Settings;
