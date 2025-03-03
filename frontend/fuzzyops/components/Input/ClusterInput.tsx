import { useState } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import { store } from '../../redux/store';
import { setNclusters } from '../../redux/reducers/ResultReducers/FuzzyGraphAlgsSlice';
import { Button } from '../Button/Button';

export const ClusterInput = ({ keyValue }: InputProps): JSX.Element => {
	const dispatch = store.dispatch;

	const key = keyValue[0];
	const value = keyValue[1];

	const [data, setData] = useState("");

	const Create = () => {
		const trimmedData = data.trim();

		// Проверка, что введенное значение является числом
		if (trimmedData !== "" && !isNaN(Number(trimmedData))) {
			dispatch(setNclusters(trimmedData));
		} else {
			setData("");
			alert("Введите только одно число");
		}
	};

	const dataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		// Обновляем состояние только если вводимое значение может быть числом
		if (/^\d*$/.test(inputValue)) { // Регулярное выражение для проверки, что введена только цифра
			setData(inputValue);
		}
	};

	return (
		<form onSubmit={e => e.preventDefault()} className={styles.formStyle}>
			<input
				value={data}
				maxLength={100}
				placeholder={value}
				name={key}
				onChange={dataHandler}
				className={styles.inputStyle}
			/>
			<Button appearance='primary' onClick={Create}>Создать</Button>
		</form>
	);
};