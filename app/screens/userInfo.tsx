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
	console.log(profile);
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
										{profile?.username && profile?.username.charAt(0)}
									</Text>
								</View>
							</View>
						</View>
						<Text style={universalStyles.textL}>{profile.username}</Text>
						<Text
							style={{
								fontSize: rMS(SIZES.h7),
								fontWeight: "300",
								color: COLORS.darkBlue,
							}}
						>
							{/* {session?.user.email} */}
                            devsammy@gmail.com
						</Text>
					</View>
					<View
						style={{ paddingHorizontal: rMS(SIZES.h5), gap: rMS(SIZES.h10) }}
					>
						<View
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
									fontSize: rMS(SIZES.h8),
									fontWeight: "500",
									color: COLORS.lightGray,
								}}
							>
								{profile?.username}
							</Text>
						</View>
						<View
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
									fontSize: rMS(SIZES.h8),
									fontWeight: "500",
									color: COLORS.lightGray,
								}}
							>
								{/* {session?.user.email} */}
								devsammy@gmail.com
							</Text>
						</View>
					</View>
				</SafeAreaScrollView>
			</SafeAreaContainer>
		</KeyboardAvoidingView>
	);
};

export default userInfo;
