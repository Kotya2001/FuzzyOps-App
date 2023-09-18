import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface AssignmentResSlice {
	assignments: string[],
	costs: number[]


}

const InitialResState: AssignmentResSlice = {
	assignments: [],
	costs: []
};

export const AssignmentResSlice = createSlice({
	name: 'AssignmentResSlice',
	initialState: InitialResState,
	reducers: {
		setAssResult: (state, action: PayloadAction<string[]>) => {
			state.assignments = action.payload;
		},
		setCostResult: (state, action: PayloadAction<number[]>) => {
			state.costs = action.payload;

		}


	}
});

export const { setAssResult, setCostResult } = AssignmentResSlice.actions;

export default AssignmentResSlice.reducer;