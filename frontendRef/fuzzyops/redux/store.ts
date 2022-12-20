import { configureStore } from '@reduxjs/toolkit';
import methodsReducer from './reducers/MethodsSlice';
import createKindReducer from './reducers/FileReducers/CreateKindSlice';
import createUnityReducer from './reducers/FileReducers/CreateUnitySlice';
import sliderReducer from './reducers/SliderSlice';
import CreateFuzzyNumberReducer from './reducers/FileReducers/CreateFuzzyNumberSlice';
import FuzzyNumberResultReducer from './reducers/ResultReducers/FuzzyNumberResultSlice';

export const store = configureStore({
	reducer: {
		methodsReducer,
		createKindReducer,
		createUnityReducer,
		sliderReducer,
		CreateFuzzyNumberReducer,
		FuzzyNumberResultReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;