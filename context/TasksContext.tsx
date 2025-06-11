import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useAuth } from "./AuthContext";

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

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const { data: daysWithTasks, error } = await supabase
				.from("days")
				.select(
					`
            id,
            day_date,
            tasks (
              title,
              description,
              priority,
              time,
              created_at
            )
          `
				)
				.eq("user_id", session?.user.id)
				.order("day_date", { ascending: true });

			const result = (daysWithTasks || []).map((item) => ({
				title: item.day_date, // or format this using moment.js or date-fns
				data: item.tasks,
			}));
			// console.log(daysWithTasks && daysWithTasks[0], "DAYS WITH TASKS");
			console.log(result[0].data, "FORMATTED RESULT");
			setTaskData(result);
			setLoading(false);
		};
		if (session?.user?.id) {
			fetchData();
		}
	}, [session]);
	console.log(taskData);

	return (
		<TaskContext.Provider
			value={{
				taskData,
				loading,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export const useTasks = () => useContext(TaskContext);
