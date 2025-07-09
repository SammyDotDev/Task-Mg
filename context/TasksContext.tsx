import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useAuth } from "./AuthContext";
import { formatToISOString, scheduleTaskNotification } from "@/utils";
import * as Notifications from "expo-notifications";


const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
	// const [session, setSession] = useState<Session | null>(null);
	type Task = {
		title: any;
		description: any;
		priority: any;
		time: any;
		created_at: any;
	};

	type DayWithTasks = {
		title: any;
		data: Task[];
	};

	const [taskData, setTaskData] = useState<DayWithTasks[] | null>(null);
	const [loading, setLoading] = useState(true);
	const { session } = useAuth();

	const expireOldTasks = async () => {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

		const { data: outdatedTasks, error } = await supabase
			.from("tasks")
			.select(
				`
                  id,
    title,
    is_completed,
    is_active,
                days
                (
      day_date
    )`
			)
			.eq("is_completed", false);

		if (error) {
			console.error("Error fetching tasks:", error);
			return;
		}

		const expired = (outdatedTasks || []).filter((task) => {
			const taskDate = new Date(task.days.day_date); // or use your task's day/time
			return taskDate < today;
		});
		console.log(expired, "EXPIRED TASKS");

		// Batch update expired tasks
		const updates = expired.map((task) =>
			supabase
				.from("tasks")
				.update({ is_active: false, expired: true })
				.eq("id", task.id)
		);

		await Promise.all(updates);
	};

	const fetchTasks = async () => {
		setLoading(true);
		const { data: daysWithTasks, error } = await supabase
			.from("days")
			.select(
				`
        id,
        day_date,
        tasks (
        id,
          title,
          description,
          priority,
          time,
          created_at,
          is_active,
          is_completed,
          expired,
          days
                (
      day_date
    )
        )
      `
			)
			.eq("user_id", session?.user.id)
			.order("day_date", { ascending: true });

		const result = (daysWithTasks || []).map((item) => {
			return {
				id: item.id,
				title: item.day_date, // or format this using moment.js or date-fns
				data: item.tasks,
			};
		});


		const scheduleNotifications = result.map((item: DayWithTasks) => {
			item.data.forEach(async (task: Task) => {
				const taskTime = new Date(formatToISOString(item.title, task.time)); // actual task time
				const now = new Date();

				const timeUntilTask = taskTime.getTime() - now.getTime();
				const tenMinutesBefore = timeUntilTask - 10 * 60 * 1000;

				// Schedule 10 mins before
				await scheduleTaskNotification({
					title: task.title,
					body: "Your task starts in 10 minutes!",
					millisecondsFromNow: tenMinutesBefore,
				});

				// Schedule at the exact time
				await scheduleTaskNotification({
					title: `"🚨 ${task.title}"`,
					body: "It's time to start your task!",
					millisecondsFromNow: timeUntilTask,
				});
			});
		});
		setTaskData(result);
		setLoading(false);
	};
	useEffect(() => {
		if (session?.user?.id) {
			expireOldTasks();
			fetchTasks();
		}
	}, [session]);

	return (
		<TaskContext.Provider
			value={{
				taskData,
				loading,
				refetchTasks: fetchTasks,
				expireOldTasks,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export const useTasks = () => useContext(TaskContext);
