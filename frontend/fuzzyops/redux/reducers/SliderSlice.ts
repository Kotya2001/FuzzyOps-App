import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface SliderState {
	start: string;
	step: string;
	end: string;
}

const InitialSliderState: SliderState = {
	start: '',
	step: '',
	end: ''
};

export const SliderSlice = createSlice({
	name: 'methods',
	initialState: InitialSliderState,
	reducers: {
		setStart: (state, action: PayloadAction<string>) => {
			state.start = action.payload;
		},

		setStep: (state, action: PayloadAction<string>) => {
			state.step = action.payload;
		},

		setEnd: (state, action: PayloadAction<string>) => {
			state.end = action.payload;
		}
	}
});

export const { setStart, setStep, setEnd } = SliderSlice.actions;


export default SliderSlice.reducer;
