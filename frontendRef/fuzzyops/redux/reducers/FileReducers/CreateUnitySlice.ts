import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface CreateUnityState {
	fuzzyNumberUnity: number[]
}

const InitialFNState: CreateUnityState = {
	fuzzyNumberUnity: [],
};

export const CreateUnitySlice = createSlice({
	name: 'createUnity',
	initialState: InitialFNState,
	reducers: {
		setFuzzyNumberUnity: (state, action: PayloadAction<number[]>) => {
			state.fuzzyNumberUnity = action.payload;
		},


	}
});

export const { setFuzzyNumberUnity } = CreateUnitySlice.actions;


export default CreateUnitySlice.reducer;