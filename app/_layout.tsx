import Loader from "@/components/Loader";
import { COLORS } from "@/constants/COLORS";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { store } from "@/store/store";
import BottomSheet, {
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { StatusBar, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function RootLayout() {
	const { loading } = useAuthRedirect();

	return (
		<>
			<Loader visible={loading} />
			<GestureHandlerRootView
				style={{
					backgroundColor: COLORS.white,
					flex: 1,
				}}
			>
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
				<StatusBar barStyle={"dark-content"} />
			</GestureHandlerRootView>
		</>
	);
}
