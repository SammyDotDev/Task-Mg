import Loader from "@/components/Loader";
import { COLORS } from "@/constants/COLORS";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import BottomSheet, {
	BottomSheetModalProvider,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
	}, []);

	if (loading) <Loader />;
	return (
		<GestureHandlerRootView
			style={{
				backgroundColor: COLORS.white,
				flex: 1,
			}}
		>
			<BottomSheetModalProvider>
				<Stack>
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
