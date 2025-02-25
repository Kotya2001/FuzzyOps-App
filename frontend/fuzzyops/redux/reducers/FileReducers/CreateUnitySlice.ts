import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface fNum {
	data: number[];          // Массив чисел
	defuzz_type: string;     // Тип строка для defuzz_type
	use_gpu: boolean;        // Изменяем тип с string на boolean (по сути ожидалось логическое значение)
	method: string;          // Тип строка для method
}



export interface CreateUnityState {
	fuzzyNumberUnity: fNum
}

const InitialFNState: CreateUnityState = {
	fuzzyNumberUnity: {
		data: [],
		defuzz_type: "",
		use_gpu: false,
		method: ""
	},
};

export const CreateUnitySlice = createSlice({
	name: 'createUnity',
	initialState: InitialFNState,
	reducers: {
		setFuzzyNumberUnity: (state, action: PayloadAction<fNum>) => {
			state.fuzzyNumberUnity = action.payload;
		},


	}
});

export const { setFuzzyNumberUnity } = CreateUnitySlice.actions;


export default CreateUnitySlice.reducer;