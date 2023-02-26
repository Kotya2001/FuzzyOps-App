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
	name: string
	ling: string
	defuz_value: number
}

const InitialFNState: FuzzyNumberResultSlice = {
	result: [{x: 0, y: 0}],
	all_pages: 0,
	params: { m: 0, mi: 0 },
	file_hash: '',
	name: '',
	ling: '',
	defuz_value: 0
	
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
		},

		setLing: (state, action: PayloadAction<FuzzyNumberResultSlice>) => {
			state.ling = action.payload.ling;
		},

		setName: (state, action: PayloadAction<FuzzyNumberResultSlice>) => {
			state.name = action.payload.name;
		},

		setDefuzValue: (state, action: PayloadAction<FuzzyNumberResultSlice>) => {
			state.defuz_value = action.payload.defuz_value;
		},


	}
});

export const { setFuzzyNumberResult, setAllPages, setParams, setFileHash, setLing, setName, setDefuzValue } = FuzzyNumberResultSlice.actions;


export default FuzzyNumberResultSlice.reducer;