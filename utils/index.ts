import { Platform, StyleSheet } from "react-native";
import { rMS, rS, rV } from "./responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import { supabase } from "@/lib/supabase";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("myNotificationChannel", {
			name: "A channel is needed for the permissions prompt to appear",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		// if (finalStatus !== "granted") {
		// 	alert("Failed to get push token for push notification!");
		// 	return;
		// }
		// Learn more about projectId:
		// https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
		// EAS projectId is used here.
		try {
			const projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ??
				Constants?.easConfig?.projectId;
			if (!projectId) {
				throw new Error("Project ID not found");
			}
			token = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data;
			console.log(token);
		} catch (e) {
			token = `${e}`;
		}
	}

	return token;
}

// timeUntilTaskInMs is the number of milliseconds from now until the task
export async function scheduleTaskNotification({
	title,
	body,
	millisecondsFromNow,
}: {
	title: string;
	body: string;
	millisecondsFromNow: number;
}) {
	if (millisecondsFromNow <= 0) return; // prevent past scheduling

	await Notifications.scheduleNotificationAsync({
		content: {
			title,
			body,
			sound: "default",
		},
		trigger: {
			type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
			seconds: 2,
		},
	});
}

export default {
	rS,
	rV,
	rMS,
};

export const isAndroid = Platform.OS === "android";

export const getMonthName = (date: Date) => {
	return date.toLocaleString("en-US", { month: "long" });
};
export const formatDate = (date: Date) => {
	return date.toISOString().split("T")[0];
};
export function formatToISOString(date: string, time: string): string {
	return `${date}T${time}`;
}

export const formatFullDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		month: "long",
		day: "numeric",
		year: "numeric",
	};

	// e.g., "May 10, 2025"
	const formatted = date.toLocaleDateString("en-US", options);

	// Convert to "May, 10 2025"
	const [monthDay, year] = formatted.split(", ");
	const [month, day] = monthDay.split(" ");
	return `${month}, ${day} ${year}`;
};

export const formatToSupabaseTime = (date: string): string => {
	const isoString = new Date(date);
	console.log(date);
	const timeString = isoString
		.toISOString()
		.split("T")[1]
		.split("Z")[0]
		.split(".")[0];
	console.log(timeString);
	// "15:17:18"
	return timeString;
};

export const fetchGroupedTasksByDate = async (user_id: string) => {
	const { data, error } = await supabase
		.from("tasks")
		.select("*")
		.eq("user_id", user_id)
		.order("date", { ascending: true })
		.order("time", { ascending: true });
	console.log(data);

	if (error) {
		console.error("Error fetching tasks:", error);
		return [];
	}

	// Group by date
	const grouped = data.reduce((acc, task) => {
		const dateKey = new Date(task.date).toISOString().split("T")[0]; // e.g., "2025-06-08"
		if (!acc[dateKey]) acc[dateKey] = [];
		acc[dateKey].push(task);
		return acc;
	}, {});

	// Transform into desired array format
	const result = Object.entries(grouped).map(([date, tasks]) => ({
		title: date, // or format this using moment.js or date-fns
		data: tasks,
	}));

	return result;
};

export function formatTimeTo12Hour(timeString: string): string {
	const [hourStr, minuteStr] = timeString.split(":");
	let hour = parseInt(hourStr, 10);
	const minute = parseInt(minuteStr, 10);

	const period = hour >= 12 ? "pm" : "am";
	hour = hour % 12 || 12; // convert 0 -> 12

	return `${hour.toString().padStart(2, "0")}:${minute
		.toString()
		.padStart(2, "0")}${period}`;
}

export function getDateStatus(
	inputDateStr: string
): "past" | "today" | "upcoming" | "future" {
	const inputDate = new Date(inputDateStr);
	const now = new Date();

	// Strip time from both dates
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const input = new Date(
		inputDate.getFullYear(),
		inputDate.getMonth(),
		inputDate.getDate()
	);

	const diffInDays = Math.floor(
		(input.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	);
	console.log(diffInDays);

	if (diffInDays === 0) return "today";
	if (diffInDays > 0) return "upcoming";
	if (diffInDays < 0) return "past";

	// Optional: Add future if needed
	return "future";
}

export const universalStyles = StyleSheet.create({
	headerText: {
		fontSize: rMS(SIZES.h1),
		fontWeight: "700",
		color: COLORS.darkBlue,
	},
	baseText: {
		fontSize: rMS(SIZES.h7),
		fontWeight: "500",
		color: COLORS.darkBlue,
	},
	textSm: {
		fontSize: rMS(SIZES.h8),
		fontWeight: "500",
		color: COLORS.darkBlue,
	},
	textL: {
		fontSize: rMS(SIZES.h4),
		fontWeight: "500",
		color: COLORS.darkBlue,
	},
});
