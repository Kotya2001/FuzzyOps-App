import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface MethodsState {
	kind: string,
	by: string,
	kindOfNumber: boolean,

	// kindInput: string,
	byInput: string,
	// kindOfNumberInput: boolean, 
}

const InitialMethodsState: MethodsState = {
	kind: '',
	by: '',
	kindOfNumber: false,

	// kindInput: '',
	byInput: '',
	// kindOfNumberInput: false, 

};

export const methodsSlice = createSlice({
	name: 'methods',
	initialState: InitialMethodsState,
	reducers: {
		setKind: (state, action: PayloadAction<string>) => {
			state.kind = action.payload;
		},

		setBy: (state, action: PayloadAction<string>) => {
			state.by = action.payload;
		},

		setKindOfNumber: (state, action: PayloadAction<boolean>) => {
			state.kindOfNumber = action.payload;
		},

		// setKindInput: (state, action: PayloadAction<string>) => {
		// 	state.kindInput = action.payload;
		// },

		setByInput: (state, action: PayloadAction<string>) => {
			state.byInput = action.payload;
		},

		// setKindOfNumbeInput: (state, action: PayloadAction<boolean>) => {
		// 	state.kindOfNumberInput = action.payload;
		// }
	}
});

export const { setKind, setBy, setKindOfNumber, setByInput  } = methodsSlice.actions;


export default methodsSlice.reducer;
