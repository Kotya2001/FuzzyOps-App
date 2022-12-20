import styles from './Input.module.css';
import { InputProps } from './Input.props';
import { Button } from '../Button/Button';
import { useState } from 'react';
import { store } from '../../redux/store';
import { setKeyFuzz, setNumbersFuzz } from '../../redux/reducers/FileReducers/CreateKindSlice';
import { setKind } from '../../redux/reducers/MethodsSlice';


export const Input = ({ selected }: InputProps): JSX.Element => {
	const dispatch = store.dispatch;
	const prompt = selected === 'Треугольный вид' ? 'a <= b <= c' : 'a <= b <= c <= d';
	const [nums, setNums] = useState("");


	const Create = () => {
		if (nums === "") {
			alert("Введите границы для числа!");
		} else {
			const k = selected === 'Треугольный вид' ? 'triangle' : 'trap';
			dispatch(setKeyFuzz(k));
			dispatch(setNumbersFuzz(nums));
			setNums("");
			dispatch(setKind(""));
			alert("Вид числа добавлен");
		}
	};


	return (

		<form onSubmit={e => e.preventDefault()} className={styles.formStyle}>
			<input value={nums} maxLength={10000000000} placeholder={prompt} onChange={e => setNums(e.target.value)}
				className={styles.inputStyle}
			/>
			<Button appearance='primary' onClick={Create}>Создать</Button>
		</form>
	);
};