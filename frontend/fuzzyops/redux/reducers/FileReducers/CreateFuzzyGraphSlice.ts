import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Root = graphData[];

interface graphData {
	start: number,
	end: number,
	values: number[]
}

export interface CreateFuzzyGraphSlice {
	graphSettings: {
		edgeType: string
		edgeNumberType: string
		edgeNumberMathType: string
		edgeNumberEqType: string,
},
	isEdgeType: boolean,
	isEdgeNumberMathType: boolean,
	isEdgeNumberEqType: boolean,
	graph_data: Root
	fileHash: string
}

const InitialFGState: CreateFuzzyGraphSlice = {
	graphSettings : {
		edgeType: "",
		edgeNumberType: "triangle",
		edgeNumberMathType: "",
		edgeNumberEqType: ""
	},
	isEdgeType: false,
	isEdgeNumberMathType: false,
	isEdgeNumberEqType: false,
	graph_data: [],
	fileHash: ""
};

export const CreateFuzzyGraphSlice = createSlice({
	name: 'CreateFuzzyGraph',
	initialState: InitialFGState,
	reducers: {
		setEdgeType: (state, action: PayloadAction<string>) => {
			state.graphSettings.edgeType = action.payload;
		},
		setEdgeNumberMathType: (state, action: PayloadAction<string>) => {
			state.graphSettings.edgeNumberMathType = action.payload;
		},
		setEdgeNumberEqType: (state, action: PayloadAction<string>) => {
			state.graphSettings.edgeNumberEqType = action.payload;
		},

		setIsEdgeType: (state, action: PayloadAction<boolean>) => {
			state.isEdgeType = action.payload;
		},
		setIsEdgeNumberMathType: (state, action: PayloadAction<boolean>) => {
			state.isEdgeNumberMathType = action.payload;
		},
		setIsEdgeNumberEqType: (state, action: PayloadAction<boolean>) => {
			state.isEdgeNumberEqType = action.payload;
		},
		setGraphData: (state, action: PayloadAction<Root>) => {
			state.graph_data = action.payload;
		},
		setFileHash: (state, action: PayloadAction<string>) => {
			state.fileHash = action.payload;
		}


	}
});

export const { setEdgeType, setEdgeNumberMathType, setEdgeNumberEqType,
	setIsEdgeType, setIsEdgeNumberMathType, setIsEdgeNumberEqType, setGraphData, setFileHash } = CreateFuzzyGraphSlice.actions;


export default CreateFuzzyGraphSlice.reducer;