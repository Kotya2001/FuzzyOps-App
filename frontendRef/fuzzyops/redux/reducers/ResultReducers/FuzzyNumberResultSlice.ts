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
	file_hash: string
}

const InitialFNState: FuzzyNumberResultSlice = {
	result: [{x: 0, y: 0}],
	all_pages: 0,
	params: { m: 0, mi: 0 },
	file_hash: ''
	
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
		},

		setFileHash: (state, action: PayloadAction<FuzzyNumberResultSlice>) => {
			state.file_hash = action.payload.file_hash;
		}


	}
});

export const { setFuzzyNumberResult, setAllPages, setParams, setFileHash } = FuzzyNumberResultSlice.actions;


export default FuzzyNumberResultSlice.reducer;