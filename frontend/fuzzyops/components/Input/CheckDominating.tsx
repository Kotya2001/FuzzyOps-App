import { useState } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import { store } from '../../redux/store';
import { setSet } from '../../redux/reducers/ResultReducers/FuzzyGraphAlgsSlice';
import { Button } from '../Button/Button';

export const CheckDominating = ({ keyValue }: InputProps): JSX.Element => {
	const dispatch = store.dispatch;

	const key = keyValue[0];
	const value = keyValue[1];

	const [data, setData] = useState("");

	const Create = () => {
		const trimmedData = data.trim();

		// Проверка, что введенное значение содержит только числа, разделенные пробелами
		const numbers = trimmedData.split(/\s+/);
		const allValidNumbers = numbers.every(num => !isNaN(Number(num)));

		if (trimmedData !== "" && allValidNumbers) {
			console.log(trimmedData);
			dispatch(setSet(trimmedData)); // Отправляем данные в Redux

		} else {
			setData("");
			alert("Введите корректные данные: числа, разделенные пробелами.");
		}
	};

	const dataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		// Проверяем ввод на допустимые символы (цифры и пробелы)
		if (/^[\d\s]*$/.test(inputValue)) { // Разрешаем только цифры и пробелы
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