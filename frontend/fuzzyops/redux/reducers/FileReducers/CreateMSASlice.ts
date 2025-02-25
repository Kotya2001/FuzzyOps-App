import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
	range: number[],
	name: string
}

export interface MsaParams {
	domain: Record<string, any>,
	numType: string,
	data: Data[][] | {
		criteria_weights: Data[],
		alternatives_scores: Data[][]
	}

}


interface MsaTask {
	taskType: string,
	msa_data: MsaParams
	result: string,
	isChoosen: boolean
}

const InitialMSAState: MsaTask = {
	taskType: "",
	msa_data: { domain: {}, numType: "", data: []},
	result: "",
	isChoosen: false
};


export const CreateMSASlice = createSlice({
	name: 'CreateFuzzyGraph',
	initialState: InitialMSAState,
	reducers: {

		setTaskType: (state, action: PayloadAction<string>) => {
			state.taskType= action.payload;
		},
		setJsonData: (state, action: PayloadAction<MsaParams>) => {
			state.msa_data = action.payload;
		},
		setResult: (state, action: PayloadAction<string>) => {
			state.result = action.payload;
		},
		setIsChoosen: (state, action: PayloadAction<boolean>) => {
			state.isChoosen = action.payload
		}
	}
});

export const { setTaskType, setJsonData, setResult, setIsChoosen} = CreateMSASlice.actions;


export default CreateMSASlice.reducer;