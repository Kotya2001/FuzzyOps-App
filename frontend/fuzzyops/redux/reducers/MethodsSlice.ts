import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface MethodsState {
	kind: string,
	by: string,
	kindOfNumber: boolean,
	lingVar: string,
	isLingVar: boolean
	byInput: string,
	isName: boolean,
	name: string
}

const InitialMethodsState: MethodsState = {
	kind: '',
	by: '',
	kindOfNumber: false,
	lingVar: 'Нет квантификатора',
	isLingVar: false,
	byInput: '',
	isName: false,
	name: ''

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

		setByInput: (state, action: PayloadAction<string>) => {
			state.byInput = action.payload;
		},

		setLingVar: (state, action: PayloadAction<string>) => {
			state.lingVar = action.payload;
		},

		setIsLingVar: (state, action: PayloadAction<boolean>) => {
			state.isLingVar = action.payload;
		},

		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},

		setIsName: (state, action: PayloadAction<boolean>) => {
			state.isName = action.payload;
		}
	}
});

export const { setKind, setBy, setKindOfNumber, setByInput, setLingVar, setIsLingVar, setName, setIsName } = methodsSlice.actions;


export default methodsSlice.reducer;
