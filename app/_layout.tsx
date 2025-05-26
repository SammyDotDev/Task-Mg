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
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function RootLayout() {
	const { loading } = useAuthRedirect();

	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	useEffect(() => {
		bottomSheetRef.current?.expand();
		console.log(loading);
	}, [loading]);

	if (loading) return <Loader />;
	return (
		<GestureHandlerRootView
			style={{
				backgroundColor: COLORS.white,
				flex: 1,
			}}
		>
				<Provider store={store}>
					<BottomSheetModalProvider>
						<Stack screenOptions={{
                            headerShown: false,
                        }}>
							<Stack.Screen name="(auth)" options={{ headerShown: false }} />
							<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						</Stack>
					</BottomSheetModalProvider>
				</Provider>
		</GestureHandlerRootView>
	);
}
