import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type Root = Root2[];

interface Root2 {
	x: number
	y: number
}

interface Root3 {
	m: number
	mi: number
}


export interface FuzzyNumberResultSlice {
	result: Root
	all_pages: number
	params: Root3
}

const InitialFNState: FuzzyNumberResultSlice = {
	result: [{x: 0, y: 0}],
	all_pages: 0,
	params: { m: 0, mi: 0 }
	
};

export const FuzzyNumberResultSlice = createSlice({
	name: 'FuzzyNumberResult',
	initialState: InitialFNState,
	reducers: {
		setFuzzyNumberResult: (state, action: PayloadAction<FuzzyNumberResultSlice>) => {
			state.result = action.payload.result;
			
		},
		setAllPages: (state, action: PayloadAction<FuzzyNumberResultSlice>) => {
			state.all_pages = action.payload.all_pages;
		},

		setParams: (state, action: PayloadAction<FuzzyNumberResultSlice>) => {
			state.params = action.payload.params;
		}


	}
});

export const { setFuzzyNumberResult, setAllPages, setParams } = FuzzyNumberResultSlice.actions;


export default FuzzyNumberResultSlice.reducer;