import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface FuzzyPredState {
	isLoadX: boolean,
	predData: object,
}

const InitialData: FuzzyPredState = {
	isLoadX: false,
	predData: {}
};

export const FuzzyPredSlice = createSlice({
	name: 'FuzzyPred',
	initialState: InitialData,
	reducers: {
		setPredData: (state, action: PayloadAction<object>) => {
			state.predData = action.payload;
		},
		setIsLoadX: (state, action: PayloadAction<boolean>) => {
			state.isLoadX = action.payload;
		},


	}
});

export const { setIsLoadX, setPredData } = FuzzyPredSlice.actions;


export default FuzzyPredSlice.reducer;