import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface FuzzyNNState {
	csvTrain: string
	config: object,
	isLoadConfig: boolean,
	isLoadTrain: boolean,
	file_hash: string,
	input_data: object,
	isInput: boolean
}

const InitialData: FuzzyNNState = {
	csvTrain: "",
	config: {},
	isLoadConfig: false,
	isLoadTrain: false,
	file_hash: "",
	input_data: {},
	isInput: false
};

export const FuzzyNN1Slice = createSlice({
	name: 'FuzzyNN1',
	initialState: InitialData,
	reducers: {
		setTrain: (state, action: PayloadAction<string>) => {
			state.csvTrain = action.payload;
		},
		setConfig: (state, action: PayloadAction<object>) => {
			state.config = action.payload;
		},
		setIsLoadCfg: (state, action: PayloadAction<boolean>) => {
			state.isLoadConfig = action.payload;
		},
		setIsLoadTrain: (state, action: PayloadAction<boolean>) => {
			state.isLoadTrain = action.payload;
		},
		setFileHash: (state, action: PayloadAction<string>) => {
			state.file_hash = action.payload;
		},
		setInputData: (state, action: PayloadAction<object>) => {
			state.input_data = action.payload;
		},
		setIsInput: (state, action: PayloadAction<boolean>) => {
			state.isInput = action.payload;
		},


	}
});

export const { setTrain, setConfig, setIsLoadCfg,
	setIsLoadTrain, setFileHash, setInputData, setIsInput } = FuzzyNN1Slice.actions;


export default FuzzyNN1Slice.reducer;