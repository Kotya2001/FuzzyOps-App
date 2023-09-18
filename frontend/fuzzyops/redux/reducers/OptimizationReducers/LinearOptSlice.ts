import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface LinearOptState {
	csvData: string
}

const InitialData: LinearOptState = {
	csvData: "",
};

export const LinearOptSlice = createSlice({
	name: 'csvDataForLinearOpt',
	initialState: InitialData,
	reducers: {
		setCsvData: (state, action: PayloadAction<string>) => {
			state.csvData = action.payload;
		},


	}
});

export const { setCsvData } = LinearOptSlice.actions;


export default LinearOptSlice.reducer;