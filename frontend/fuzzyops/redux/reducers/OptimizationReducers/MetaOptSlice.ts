import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Ranges {
	start?: number,
	step?: number,
	end?: number,
	name: string
}

interface MetaParams {
	k: number,
	q: number,
	epsilon: number,
	n_iter: number,
	n_ant: number,
	ranges: Ranges[],
	target: string
}

export interface MetaOptState {
	csvX: string
	params: MetaParams,
	isLoadParams: boolean,
	isLoadCsv: boolean
}

const InitialData: MetaOptState = {
	csvX: "",
	params: { k: 0, q: 0, epsilon: 0, n_iter: 0, n_ant: 0, ranges: [], target: "" },
	isLoadParams: false,
	isLoadCsv: false
};

export const MetaOptSlice = createSlice({
	name: 'csvXForMetaOpt',
	initialState: InitialData,
	reducers: {
		setX: (state, action: PayloadAction<string>) => {
			state.csvX = action.payload;
		},
		setParams: (state, action: PayloadAction<MetaParams>) => {
			state.params = action.payload;
		},
		setIsLoadParams: (state, action: PayloadAction<boolean>) => {
			state.isLoadParams = action.payload;
		},
		setIsLoadCsv: (state, action: PayloadAction<boolean>) => {
			state.isLoadCsv = action.payload;
		},


	}
});

export const { setX, setParams, setIsLoadCsv, setIsLoadParams } = MetaOptSlice.actions;


export default MetaOptSlice.reducer;