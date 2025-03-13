import { DropdownProps } from './Dropdown.props';
import styles from './Dropdown.module.css';
import { store } from '../../redux/store';
import { setKind, setKindOfNumber } from '../../redux/reducers/MethodsSlice';
import { useAppSelector } from '../../redux/hooks';
import { setEdgeType, setEdgeNumberEqType, setEdgeNumberMathType } from '../../redux/reducers/FileReducers/CreateFuzzyGraphSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { setIsEdgeType, setIsEdgeNumberEqType, setIsEdgeNumberMathType } from '../../redux/reducers/FileReducers/CreateFuzzyGraphSlice';
import { setIsChoosen, setTaskType } from '../../redux/reducers/FileReducers/CreateMSASlice';


export const Dropdown = ({ elems, forWhat }: DropdownProps): JSX.Element => {

	const dispatch = store.dispatch;
	const { kindOfNumber } = useAppSelector(state => state.methodsReducer);

	const { isEdgeType, isEdgeNumberEqType, isEdgeNumberMathType } = useAppSelector(state => state.CreateFuzzyGraphReducer);
	const { isChoosen } = useAppSelector(state => state.CreateMSAReducer);

	const click = (flag: boolean, setter: ActionCreatorWithPayload<boolean>) => {
		dispatch(setter(!flag));
	};

	const func = (elem: string) => {

		switch (forWhat) {
			case 'kind':
				dispatch(setKindOfNumber(!kindOfNumber));
				dispatch(setKind(elem));
				return;
			case 'edgeType':
				dispatch(setEdgeType(elem));
				click(isEdgeType, setIsEdgeType);
				return;
			case 'edgeNumberType':
				dispatch(setEdgeNumberEqType(elem));
				click(isEdgeNumberEqType, setIsEdgeNumberEqType);
				return;
			case 'edgeMathType':
				dispatch(setEdgeNumberMathType(elem));
				click(isEdgeNumberMathType, setIsEdgeNumberMathType);
				return;
			case 'Msa':
				dispatch(setTaskType(elem));
				click(isChoosen, setIsChoosen);
				return;
			default:
				return;

		}
	};
	return (
		<div className={styles.dropdown}>
			<div className={styles.dropdownContent}>
				{elems.map(elem => (
					<div className={styles.dropdownItem}
						onClick={() => func(elem)}
					>{elem}</div>
				))}
			</div>
		</div>
	);
};