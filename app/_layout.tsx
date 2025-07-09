import Loader from "@/components/Loader";
import { COLORS } from "@/constants/COLORS";
import { AuthProvider } from "@/context/AuthContext";
import { TaskProvider } from "@/context/TasksContext";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { store } from "@/store/store";
import BottomSheet, {
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform, StatusBar, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/utils";
import { Toaster } from "sonner-native";

export default function RootLayout() {
	const { loading } = useAuthRedirect();

	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldPlaySound: false,
			shouldSetBadge: false,
			shouldShowBanner: true,
			shouldShowList: true,
		}),
	});

	const [expoPushToken, setExpoPushToken] = useState("");
	const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
		[]
	);
	const [notification, setNotification] = useState<
		Notifications.Notification | undefined
	>(undefined);

	useEffect(() => {
		registerForPushNotificationsAsync().then(
			(token) => token && setExpoPushToken(token)
		);

		if (Platform.OS === "android") {
			Notifications.getNotificationChannelsAsync().then((value) =>
				setChannels(value ?? [])
			);
		}
		const notificationListener = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification);
			}
		);

		const responseListener =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			notificationListener.remove();
			responseListener.remove();
		};
	}, []);
	// if (loading) return <Loader visible={loading} />;
	return (
		<>
			<Loader visible={loading} />
			<GestureHandlerRootView
				style={{
					backgroundColor: COLORS.white,
					flex: 1,
				}}
			>
				<AuthProvider>
					<TaskProvider>
						<Provider store={store}>
							<Stack
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen name="(auth)" options={{ headerShown: false }} />
								<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
							</Stack>
						</Provider>
					</TaskProvider>
					<Toaster
						style={{
							backgroundColor: COLORS.white,
						}}
						styles={{
							title: {
								color: COLORS.dark,
							},
						}}
					/>
				</AuthProvider>
				<StatusBar barStyle={"dark-content"} />
			</GestureHandlerRootView>
		</>
	);
}
