import { createSlice } from "@reduxjs/toolkit";

type Task = {
    id?: string;
    taskName: string;
    description: string;
    date: string;
    time: string;
    priority: string;
}

type TaskState = {
    tasks: Task[];
    postLoadingTasks: boolean;
    getLoadingTasks: boolean;
}


const initialState = {
    tasks: [],
    postLoadingTasks:false,
    getLoadingTasks:false
}

const taskSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setPostLoadingTasks: (state, action) => {
            state.postLoadingTasks = action.payload;
        },
        setGetLoadingTasks: (state, action) => {
            state.getLoadingTasks = action.payload;
        },
    }
})


export const {setTasks, setPostLoadingTasks, setGetLoadingTasks} = taskSlice.actions;

export default taskSlice.reducer
