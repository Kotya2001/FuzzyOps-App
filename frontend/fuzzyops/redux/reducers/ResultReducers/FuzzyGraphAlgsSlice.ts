import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface GraphAlgsSlice {
	path: string,
	dominating: string,
	cluster: string,
	pathLoop: string,
	groups: object,
	dominatingRes: string,
	domitatingSet: string


}

const InitialAlgState: GraphAlgsSlice = {
	path: "",
	dominating: "",
	cluster: "",
	pathLoop: "",
	groups: {},
	dominatingRes: "",
	domitatingSet: ""
};

export const FuzzyGraphAlgSlice = createSlice({
	name: 'FuzzyGraphAlgs',
	initialState: InitialAlgState,
	reducers: {
		setPath: (state, action: PayloadAction<string>) => {
			state.path = action.payload;
		},
		setSet: (state, action: PayloadAction<string>) => {
			state.dominating = action.payload;
		},
		setNclusters: (state, action: PayloadAction<string>) => {
			state.cluster = action.payload;
		},
		setPathLoop: (state, action: PayloadAction<string>) => {
			state.pathLoop = action.payload;
		},
		setGroups: (state, action: PayloadAction<object>) => {
			state.groups = action.payload;
		},
		setDominatingRes: (state, action: PayloadAction<string>) => {
			state.dominatingRes = action.payload;
		},
		setDominatingSet: (state, action: PayloadAction<string>) => {
			state.domitatingSet = action.payload;
		},


	}
});

export const { setPath, setSet, setNclusters, setPathLoop,
	setGroups, setDominatingRes, setDominatingSet } = FuzzyGraphAlgSlice.actions;

export default FuzzyGraphAlgSlice.reducer;