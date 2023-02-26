import styles from './Input.module.css';
import { InputProps } from './Input.props';
import { Button } from '../Button/Button';
import { useState } from 'react';
import { store } from '../../redux/store';
import { setKeyFuzz, setNumbersFuzz } from '../../redux/reducers/FileReducers/CreateKindSlice';
import { setKind, setLingVar, setName, setIsName, setIsLingVar } from '../../redux/reducers/MethodsSlice';
import { setValue } from '../../redux/reducers/OpsReducers/OpsSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppSelector } from '../../redux/hooks';


export const Input = ({ keyValue }: InputProps): JSX.Element => {



	const dispatch = store.dispatch;
	const { isLingVar, isName } = useAppSelector(state => state.methodsReducer);
	const key = keyValue[0];
	const value = keyValue[1];

	const [data, setData] = useState("");

	const set = (data: string, setter: ActionCreatorWithPayload<string>, msg?: string) => {
		dispatch(setter(data));
		setData("");
		dispatch(setKind(""));
		msg && alert(msg);
	};

	const Create = () => {
		if (key === 'ling') {
			if (/^[А-яёA-z\s]*$/.test(data)) {
				key === 'ling' && set(data, setLingVar, 'Квантификатор добавлен');
				dispatch(setIsLingVar(!isLingVar));
			}
		
		} else if (key === 'name') {
			if (/^[А-яёA-z\s]*$/.test(data)) {
				key === 'name' && set(data, setName, 'Имя добавлено');
				dispatch(setIsName(!isName));
			}
		} else if (key === 'number') {
			if (/^[0-9\s]*$/.test(data)) {
				console.log(key);
				key === 'number' && set(data, setValue);
				setData("");
			}
		}
		else {
			if (/^[0-9\s]*$/.test(data)) {
				dispatch(setKeyFuzz(key));
				dispatch(setNumbersFuzz(data));
				setData("");
				dispatch(setKind(""));
				alert("Вид числа добавлен");
			}

		}
	};

	const dataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (key === 'ling' || key === 'name') {
			const re = /^[А-яёA-z\s]*$/;
			if (re.test(e.target.value)) {
				setData(e.target.value);
			}
		} else {
			const re = /^[0-9\s]*$/;
			if (re.test(e.target.value)) {
				setData(e.target.value);
			}
		}
	};



	return (
		<form onSubmit={e => e.preventDefault()} className={styles.formStyle}>
				<input value={data} maxLength={10000000000} placeholder={value} name={key} onChange={e => dataHandler(e)}
					className={styles.inputStyle}/>
			<Button appearance='primary' onClick={Create}>Создать</Button>
		</form>
	);
};