import { View, Text, ScrollView } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import Header from "@/components/Header";
import { COLORS } from "@/constants/COLORS";
import SafeAreaContainer from "@/utils/SafeAreaContainer";
import SafeAreaScrollView from "@/utils/SafeAreaScrollView";
import ViewContainer from "@/utils/ViewContainer";
import {
	GestureHandlerRootView,
	Pressable,
} from "react-native-gesture-handler";
import BottomSheet, {
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import CancelIcon from "@/assets/svg/CancelIcon";
import TaskInput from "@/components/TaskInput";
import CalenderIcon from "@/assets/svg/CalenderIcon";
import TimeIcon from "@/assets/svg/TimeIcon";
import PriorityButton from "@/components/PriorityButton";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setLoading } from "@/store/slices/authSlice";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { TouchableWithoutFeedback } from "react-native";
import { setPostLoadingTasks } from "@/store/slices/taskSlice";

interface TaskInfo {
	taskName: string;
	description: string;
	date: string;
	time: string;
	priority: string;
}

const Home = () => {
	const dispatch = useDispatch();
	const [taskInfo, setTaskInfo] = useState<TaskInfo>({
		taskName: "",
		description: "",
		date: "",
		time: "",
		priority: "",
	});
	const [bottomSheetButtonDisabled, setButtonSheetButtonDisabled] = useState<
		boolean | undefined
	>(false);

	const [selectedPriority, setSelectedPriority] = useState("");
	const [showCalendar, setShowCalendar] = useState<boolean>(false);

	const postLoadingTasks = useSelector(
		(state: RootState) => state.tasks.postLoadingTasks
	);

	const isLowPriority = selectedPriority === "low";
	const isMediumPriority = selectedPriority === "medium";
	const isHighPriority = selectedPriority === "high";

	// add new task, expand bottomsheet
	const handleAddTask = () => {
		// console.log(bottomSheetModalRef.current);
		// bottomSheetModalRef.current?.snapToIndex(1);
	};

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleLogout = async () => {
		dispatch(setLoading(true));
		try {
			const { error } = await supabase.auth.signOut();
		} catch (error) {
			if (error) {
				alert("Error signing out");
			}
		} finally {
			dispatch(setLoading(false));
		}
		// router.push("/(auth)");
	};

	useEffect(() => {
		if (
			taskInfo.taskName.length === 0 ||
			taskInfo.description.length === 0 ||
			taskInfo.time.length === 0 ||
			taskInfo.date.length === 0 ||
			taskInfo.priority.length === 0
		) {
			setButtonSheetButtonDisabled(true);
		} else {
			setButtonSheetButtonDisabled(false);
		}
	}, [taskInfo]);

	const createTask = async (
		title: string,
		description: string,
		priority: string,
		time: string,
		date: string
	) => {
		const res = await supabase
			.from("tasks")
			.insert([
				{
					tasktitle: title,
					description: description,
					priority: priority,
					time: new Date().toTimeString().split(" ")[0],
					date: new Date().toISOString().split("T")[0],
				},
			])
			.select();
		console.log(res);
	};


	return (
		<Pressable
			style={{
				flex: 1,
			}}
			onPress={() => setShowCalendar(false)}
		>
			<Loader visible={postLoadingTasks} />
			<ViewContainer>
				<SafeAreaScrollView>
					<Header handleNotification={() => {}} handleAddTask={handleAddTask} />
					<Text
						style={{
							fontSize: rMS(SIZES.h5),
							marginHorizontal: rMS(SIZES.h6),
							paddingVertical: rMS(SIZES.h9),
						}}
					>
						Manage your task
					</Text>

					<CustomButton
						title={"Log out"}
						onPress={handleLogout}
					/>
				</SafeAreaScrollView>
			</ViewContainer>
		</Pressable>
	);
};

export default Home;
