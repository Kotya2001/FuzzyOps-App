import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface CreateKindState {
	numbersFuzz: string;
	keyFuzz: string;
}

const InitialFNState: CreateKindState = {
	numbersFuzz: "",
	keyFuzz: "",
};

export const CreateFuzzyNumberSlice = createSlice({
	name: 'createKind',
	initialState: InitialFNState,
	reducers: {
		setNumbersFuzz: (state, action: PayloadAction<string>) => {
			state.numbersFuzz = action.payload;
		},

		setKeyFuzz: (state, action: PayloadAction<string>) => {
			state.keyFuzz = action.payload;
		}
	}
});

export const { setNumbersFuzz, setKeyFuzz } = CreateFuzzyNumberSlice.actions;


export default CreateFuzzyNumberSlice.reducer;
