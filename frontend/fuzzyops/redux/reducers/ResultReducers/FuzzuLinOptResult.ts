import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface Interactions {
	cooperation: number[],
	conflict: number[],
	independancy: number[]
}

export interface LinOptResult {
	interaction_coefs: number[],
	interactions: Interactions
	alphas: number[]
	status: boolean


}

const InitialLinOptState: LinOptResult = {
	interaction_coefs: [],
	interactions: {
		cooperation: [],
		conflict: [],
		independancy: []
	},
	alphas: [],
	status: false
};

export const LinOptResultSlice = createSlice({
	name: 'LinOptResult',
	initialState: InitialLinOptState,
	reducers: {
		setInteractionCoefs: (state, action: PayloadAction<number[]>) => {
			state.interaction_coefs = action.payload;
		},
		setInteractions: (state, action: PayloadAction<Interactions>) => {
			state.interactions = action.payload;
		},
		setAlphas: (state, action: PayloadAction<number[]>) => {
			state.alphas = action.payload;
		},
		setStatus: (state, action: PayloadAction<boolean>) => {
			state.status = action.payload;
		},

	}
});

export const { setInteractionCoefs, setInteractions, setAlphas, setStatus } = LinOptResultSlice.actions;

export default LinOptResultSlice.reducer;