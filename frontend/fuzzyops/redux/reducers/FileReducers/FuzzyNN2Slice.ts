import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface FuzzyNNState {
	isLoadXtrain: boolean,
	data: object,
}

const InitialData: FuzzyNNState = {
	isLoadXtrain: false,
	data: {}
};

export const FuzzyNN2Slice = createSlice({
	name: 'FuzzyNN2',
	initialState: InitialData,
	reducers: {
		setXTrain: (state, action: PayloadAction<object>) => {
			state.data = action.payload;
		},
		setIsLoadXtrain: (state, action: PayloadAction<boolean>) => {
			state.isLoadXtrain = action.payload;
		},


	}
});

export const { setXTrain, setIsLoadXtrain } = FuzzyNN2Slice.actions;


export default FuzzyNN2Slice.reducer;