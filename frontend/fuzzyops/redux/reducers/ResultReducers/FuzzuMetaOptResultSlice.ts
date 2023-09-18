import { createSlice, PayloadAction } from '@reduxjs/toolkit';




export interface MetaOptResult {
	theta: number[]
	status: boolean
}

const InitialMetaOptState: MetaOptResult = {
	theta: [],
	status: false
};

export const MetaOptResultSlice = createSlice({
	name: 'MetaOptResult',
	initialState: InitialMetaOptState,
	reducers: {
		setTheta: (state, action: PayloadAction<number[]>) => {
			state.theta = action.payload;
		},
		setStatus: (state, action: PayloadAction<boolean>) => {
			state.status = action.payload;
		},

	}
});

export const { setTheta, setStatus } = MetaOptResultSlice.actions;

export default MetaOptResultSlice.reducer;