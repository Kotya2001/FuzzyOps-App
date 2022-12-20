import { DropdownProps } from './Dropdown.props';
import styles from './Dropdown.module.css';
import { store } from '../../redux/store';
import { setKind, setKindOfNumber } from '../../redux/reducers/MethodsSlice';
import { useAppSelector } from '../../redux/hooks';

export const Dropdown = ({elems, forWhat}: DropdownProps): JSX.Element => {

	const dispatch = store.dispatch;
	const { kindOfNumber } = useAppSelector(state => state.methodsReducer);

	const func = (elem: string) => {
		
		switch (forWhat) {
			case 'kind':
				dispatch(setKindOfNumber(!kindOfNumber));
				dispatch(setKind(elem));
				return;
			// case 'kindInput':
			// 	dispatch(setKindOfNumbeInput(!kindOfNumberInput));
			// 	dispatch(setKindInput(elem));
			// 	return;
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