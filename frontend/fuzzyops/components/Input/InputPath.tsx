import { useState } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import { store } from '../../redux/store';
import { setPath } from '../../redux/reducers/ResultReducers/FuzzyGraphAlgsSlice';
import { Button } from '../Button/Button';



export const InputPath = ({ keyValue }: InputProps): JSX.Element => {

	const dispatch = store.dispatch;

	const key = keyValue[0];
	const value = keyValue[1];

	const [data, setData] = useState("");

	const Create = () => {
		const numbers = data.trim().split(/\s+/);
		if (numbers.length === 2 && numbers.every(num => !isNaN(Number(num)))) {
			dispatch(setPath(data));
		} else {
			setData("");
			alert("Введите корректные данные: два числа, разделенных пробелами.");
		}


	};

	const dataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		const re = /^(\d+(\s+\d+)*\s*)?$/;

		if (re.test(inputValue)) {
			setData(inputValue);
		}

	};

	return (
		<form onSubmit={e => e.preventDefault()} className={styles.formStyle}>
			<input value={data} maxLength={100} placeholder={value} name={key} onChange={dataHandler}
				className={styles.inputStyle} />
			<Button appearance='primary' onClick={Create}>Создать</Button>
		</form>
	);
};