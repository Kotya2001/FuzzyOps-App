import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OpsS {
	n: string
	operation: string
}

const InitialOpsState: OpsS = {
	n: '',
	operation: ''
};

export const FuzzyOpsSlice = createSlice({
	name: 'FuzzyOpsSlice',
	initialState: InitialOpsState,
	reducers: {
		setValue: (state, action: PayloadAction<string>) => {
			state.n = action.payload;

		},

		setOperation: (state, action: PayloadAction<string>) => {
			state.operation = action.payload;

		},
	}
});

export const { setValue, setOperation } = FuzzyOpsSlice.actions;


export default FuzzyOpsSlice.reducer;
