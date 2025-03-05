import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Cost {
	task: string,
	worker: string,
	bounds: number[]
}

export interface Assignment {
	tasks: string[],
	workers: string[],
	fuzzyCosts: Cost[]
}

const InitialAssignment: Assignment = {
	tasks: [],
	workers: [],
	fuzzyCosts: []
};

export const AddAssignmentsSlice = createSlice({
	name: 'AddAssignmentsSlice',
	initialState: InitialAssignment,
	reducers: {
		setTasks: (state, action: PayloadAction<string[]>) => {
			state.tasks = action.payload;
		},
		setWorkers: (state, action: PayloadAction<string[]>) => {
			state.workers = action.payload;
		},
		setFuzzyCosts: (state, action: PayloadAction<Cost[]>) => {
			state.fuzzyCosts = action.payload;
		}


	}
});

export const { setTasks, setWorkers, setFuzzyCosts } = AddAssignmentsSlice.actions;


export default AddAssignmentsSlice.reducer;