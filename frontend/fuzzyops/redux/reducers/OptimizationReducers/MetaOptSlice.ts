import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Ranges {
	start: number,
	step: number,
	end: number,
	x: string[]
}

interface MetaParams {
	k: number,
	q: number,
	epsilon: number,
	n_iter: number,
	r: number[],
	R: number,
	n_ant: number,
	ranges: Ranges[]
}

export interface MetaOptState {
	csvX: string
	params: MetaParams
}

const InitialData: MetaOptState = {
	csvX: "",
	params: {k: 0, q: 0, epsilon: 0, n_iter: 0, r: [], R: 0, n_ant: 0, ranges: []}
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


	}
});

export const { setX, setParams } = MetaOptSlice.actions;


export default MetaOptSlice.reducer;