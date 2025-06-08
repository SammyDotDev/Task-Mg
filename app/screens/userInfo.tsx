import {
	View,
	Text,
	KeyboardAvoidingView,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useState } from "react";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import { isAndroid, universalStyles } from "@/utils";
import { COLORS } from "@/constants/COLORS";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import TextField from "@/components/TextField";
import ScreenHeader from "@/components/ScreenHeader";
import ViewContainer from "@/utils/ViewContainer";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import UserInfoTextField from "@/components/UserInfoTextField";
import CustomButton from "@/components/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useAuth } from "@/context/AuthContext";

type UserData = {
	username: string;
	email: string;
};

const userInfo = () => {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [userData, setUserData] = useState<UserData>({
		username: "",
		email: "",
	});

        const { session, profile } = useAuth();

	const pickImage = async () => {
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
		<KeyboardAvoidingView
			behavior={isAndroid ? "padding" : undefined}
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
			}}
		>
			<SafeAreaContainer>
				<ScreenHeader screenTitle="User Info" />
				<SafeAreaScrollView
					contentContainerStyle={{
						paddingHorizontal: 0,
						flexGrow: 1,
					}}
				>
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
										}}
									></View>
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
					<View
						style={{ paddingHorizontal: rMS(SIZES.h5), gap: rMS(SIZES.h10) }}
					>
						<UserInfoTextField
							title="Username"
							value={userData.username}
							onChangeText={(text) =>
								setUserData((prev) => ({ ...prev, username: text }))
							}
							style={{
								width: "100%",
								padding: rMS(SIZES.h8),
							}}
						/>

						<UserInfoTextField
							title="Email"
							value={userData.email}
							onChangeText={(text) =>
								setUserData((prev) => ({ ...prev, email: text }))
							}
							keyboardType="email-address"
							style={{
								width: "100%",
								padding: rMS(SIZES.h8),
							}}
						/>
						{/* <View
							style={{
								padding: rMS(SIZES.h8),
								borderRadius: rMS(SIZES.h10),
								backgroundColor: COLORS.white,
								width: "100%",
								marginHorizontal: "auto",
								marginVertical: rMS(SIZES.h10),
								borderWidth: 1,
								borderColor: COLORS.lightGray,
								overflow: "hidden",
							}}
						>
							<Text
								style={{
									fontSize: rMS(SIZES.h7),
									fontWeight: "500",
									color: COLORS.lightPurple,
								}}
							>
								John Doe
							</Text>
						</View> */}
					</View>
					<View style={{ flex: 1 }} />
					<View
						style={{
							width: "90%",
							// gap: rMS(SIZES.h8),
							flexDirection: "row",
							alignItems: "center",
							marginHorizontal: "auto",
							justifyContent: "space-between",
						}}
					>
						<CustomButton
							title={"Edit"}
							onPress={() => {}}
							extendedStyles={{
								backgroundColor: COLORS.white,
								marginHorizontal: null,
								width: "80%",
							}}
							titleStyles={{
								color: COLORS.darkBlue,
							}}
						/>
						<CustomButton
							title={"Save"}
							onPress={() => {}}
							extendedStyles={{
								marginHorizontal: null,
								marginLeft: "auto",
								width: "80%",
							}}
						/>
					</View>
				</SafeAreaScrollView>
			</SafeAreaContainer>
		</KeyboardAvoidingView>
	);
};

export default userInfo;
