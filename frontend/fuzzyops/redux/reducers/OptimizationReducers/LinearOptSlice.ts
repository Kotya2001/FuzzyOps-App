import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface LinearOptState {
	data: object,
	isLoadLinOpt: boolean
}

const InitialData: LinearOptState = {
	data: {},
	isLoadLinOpt: false
};

export const LinearOptSlice = createSlice({
	name: 'csvDataForLinearOpt',
	initialState: InitialData,
	reducers: {
		setLinOptData: (state, action: PayloadAction<object>) => {
			state.data = action.payload;
		},
		setLoadLinOpt: (state, action: PayloadAction<boolean>) => {
			state.isLoadLinOpt = action.payload;
		}


	}
});

export const { setLinOptData, setLoadLinOpt } = LinearOptSlice.actions;


export default LinearOptSlice.reducer;