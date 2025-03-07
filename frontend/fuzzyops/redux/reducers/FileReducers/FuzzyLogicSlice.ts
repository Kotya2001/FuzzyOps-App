import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Rules {
	data: object,
	isLoadRules: boolean
}

const InitialFlogicSlice: Rules = {
	data: {},
	isLoadRules: false
};

export const FuzzyLogicSlice = createSlice({
	name: 'FuzzyLogicSlice',
	initialState: InitialFlogicSlice,
	reducers: {
		setData: (state, action: PayloadAction<object>) => {
			state.data = action.payload;
		},
		setIsLoadRules: (state, action: PayloadAction<boolean>) => {
			state.isLoadRules = action.payload;
		},


	}
});

export const { setData, setIsLoadRules } = FuzzyLogicSlice.actions;


export default FuzzyLogicSlice.reducer;