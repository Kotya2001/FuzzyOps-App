import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface FanState {
	isFan: boolean,
	fanGraph: object,
}

const InitialData: FanState = {
	isFan: false,
	fanGraph: {}
};

export const FanSlice = createSlice({
	name: 'Fan',
	initialState: InitialData,
	reducers: {
		setFanData: (state, action: PayloadAction<object>) => {
			state.fanGraph = action.payload;
		},
		setIsFan: (state, action: PayloadAction<boolean>) => {
			state.isFan = action.payload;
		},


	}
});

export const { setFanData, setIsFan } = FanSlice.actions;


export default FanSlice.reducer;