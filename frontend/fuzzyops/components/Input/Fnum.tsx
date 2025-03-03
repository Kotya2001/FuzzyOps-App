import { useState } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import { store } from '../../redux/store';
import { setDominatingSet } from '../../redux/reducers/ResultReducers/FuzzyGraphAlgsSlice';
import { Button } from '../Button/Button';

export const Fnum = ({ keyValue }: InputProps): JSX.Element => {
	const dispatch = store.dispatch;

	const key = keyValue[0];
	const value = keyValue[1];

	const [data, setData] = useState("");

	const Create = () => {
		const trimmedData = data.trim();

		// Проверка, что введенное значение содержит ровно три числа
		const numbers = trimmedData.split(/\s+/);
		if (numbers.length === 3 && numbers.every(num => !isNaN(Number(num)))) {
			dispatch(setDominatingSet(trimmedData)); // Отправка данных в Redux
		} else {
			setData("");
			alert("Введите ровно три числа, разделенные пробелами.");
		}
	};

	const dataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		// Проверяем ввод на допустимые символы (цифры и пробелы)
		if (/^[\d\s]*$/.test(inputValue)) {
			// Если ввод допустимый, обрабатываем количество вводимых чисел
			const numbers = inputValue.trim().split(/\s+/);
			// Условие, чтобы не допускать более трех чисел
			if (numbers.length <= 3) {
				setData(inputValue);
			} else {
				// Если уже 3 числа, оставляем ввод без изменений
				setData(numbers.slice(0, 3).join(' '));
			}
		}
	};

	return (
		<form onSubmit={e => e.preventDefault()} className={styles.formStyle}>
			<input
				value={data}
				maxLength={100} // Лимит ввода
				placeholder={value}
				name={key}
				onChange={dataHandler}
				className={styles.inputStyle}
			/>
			<Button appearance='primary' onClick={Create}>Создать</Button>
		</form>
	);
};