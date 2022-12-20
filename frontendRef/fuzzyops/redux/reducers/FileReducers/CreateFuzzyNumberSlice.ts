import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface CreateFuzzyNumberSlice {
	fuzzyNumber: object
}

const InitialFNState: CreateFuzzyNumberSlice = {
	fuzzyNumber: {},
};

export const CreateFuzzyNumberSlice = createSlice({
	name: 'CreateFuzzyNumber',
	initialState: InitialFNState,
	reducers: {
		setFuzzyNumber: (state, action: PayloadAction<object>) => {
			state.fuzzyNumber = action.payload;
		},


	}
});

export const { setFuzzyNumber } = CreateFuzzyNumberSlice.actions;


export default CreateFuzzyNumberSlice.reducer;