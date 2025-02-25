import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface ClusterParams {
	nCluster: number,
	m: number,
	error: number,
	maxiter: number,
}

export interface FuzzyCluster {
	params: ClusterParams
	train_data: string,
	test_data: string
}

const InitialFuzzyClusterState: FuzzyCluster = {
	params: { nCluster: 0, m: 0, error: 0, maxiter: 0 },
	train_data: "",
	test_data: ""
};


export const FuzzyClusterSlice = createSlice({
	name: 'FuzzyCluster',
	initialState: InitialFuzzyClusterState,
	reducers: {

		setClusterParams: (state, action: PayloadAction<ClusterParams>) => {
			state.params = action.payload;
		},
		setTrainData: (state, action: PayloadAction<string>) => {
			state.train_data = action.payload;
		},
		setTestData: (state, action: PayloadAction<string>) => {
			state.test_data = action.payload;
		}
	}
});

export const { setClusterParams, setTrainData, setTestData } = FuzzyClusterSlice.actions;


export default FuzzyClusterSlice.reducer;