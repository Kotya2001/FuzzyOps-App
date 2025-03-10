import { configureStore } from '@reduxjs/toolkit';
import methodsReducer from './reducers/MethodsSlice';
import createKindReducer from './reducers/FileReducers/CreateKindSlice';
import createUnityReducer from './reducers/FileReducers/CreateUnitySlice';
import sliderReducer from './reducers/SliderSlice';
import CreateFuzzyNumberReducer from './reducers/FileReducers/CreateFuzzyNumberSlice';
import FuzzyNumberResultReducer from './reducers/ResultReducers/FuzzyNumberResultSlice';
import FuzzyOpsReducer from './reducers/OpsReducers/OpsSlice';
import CreateFuzzyGraphReducer from './reducers/FileReducers/CreateFuzzyGraphSlice';
import FuzzyGraphAlgsReducer from './reducers/ResultReducers/FuzzyGraphAlgsSlice';
import LinearOptReducer from './reducers/OptimizationReducers/LinearOptSlice';
import LinOptResultReducer from './reducers/ResultReducers/FuzzuLinOptResult';
import MetaOptReducer from './reducers/OptimizationReducers/MetaOptSlice';
import MetaOptResultReducer from './reducers/ResultReducers/FuzzuMetaOptResultSlice';
import AddAssignmentsReducer from './reducers/FileReducers/AddAssignmentsSlice';
import AssignmenstReducer from './reducers/ResultReducers/AssignmenstSlice';
import CreateMSAReducer from './reducers/FileReducers/CreateMSASlice';
import FuzzyClusterReducer from './reducers/FileReducers/FuzzyClusterSlice';
import FuzzyLogicReducer from './reducers/FileReducers/FuzzyLogicSlice';
import FuzzyNN1Reducer from './reducers/FileReducers/FuzzyNN1Slice';
import FuzzyNN2Reducer from './reducers/FileReducers/FuzzyNN2Slice';
import FuzzyPredReducer from './reducers/FileReducers/FuzzyPredSlice';
import FanReducer from './reducers/FileReducers/FanSlice';

export const store = configureStore({
	reducer: {
		methodsReducer,
		createKindReducer,
		createUnityReducer,
		sliderReducer,
		CreateFuzzyNumberReducer,
		FuzzyNumberResultReducer,
		FuzzyOpsReducer,
		CreateFuzzyGraphReducer,
		FuzzyGraphAlgsReducer,
		LinearOptReducer,
		LinOptResultReducer,
		MetaOptReducer,
		MetaOptResultReducer,
		AddAssignmentsReducer,
		AssignmenstReducer,
		CreateMSAReducer,
		FuzzyClusterReducer,
		FuzzyLogicReducer,
		FuzzyNN1Reducer,
		FuzzyNN2Reducer,
		FuzzyPredReducer,
		FanReducer

	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;