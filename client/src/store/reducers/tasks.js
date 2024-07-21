import { createSlice } from '@reduxjs/toolkit';
import {
    createTaskAction,
    deleteTaskAction,
    getAllTasksAction,
    updateTaskAction,
} from '../actions/taskActions';

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

const tasks = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.tasks.map((task) => {
                if (
                    task.status === action.payload ||
                    action.payload === 'all'
                ) {
                    task.show = true;
                } else {
                    task.show = false;
                }
            });
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createTaskAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTaskAction.fulfilled, (state, action) => {
                state.tasks.push({ ...action.payload, show: true });
                state.loading = false;
            })
            .addCase(createTaskAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getAllTasksAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTasksAction.fulfilled, (state, action) => {
                state.tasks = action.payload.map((task) => {
                    return {
                        ...task,
                        show: true,
                    };
                });
                state.loading = false;
            })
            .addCase(getAllTasksAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTaskAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaskAction.fulfilled, (state, action) => {
                state.tasks = state.tasks.map((task) => {
                    console.log(action.payload);

                    if (task.id === action.payload.id) {
                        return { ...action.payload, show: true };
                    }
                    return task;
                });
                state.loading = false;
            })
            .addCase(updateTaskAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTaskAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTaskAction.fulfilled, (state, action) => {
                console.log(action.meta.arg);

                state.tasks = state.tasks.filter(
                    (task) => task.id !== action.meta.arg
                );
                state.loading = false;
            })
            .addCase(deleteTaskAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setFilter } = tasks.actions;

export default tasks.reducer;
