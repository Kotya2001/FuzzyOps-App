import { FileLoaderProps } from './FileLoader.props';
import styles from './FileLoader.module.css';
import { store } from '../../redux/store';
import { setFuzzyNumberUnity } from '../../redux/reducers/FileReducers/CreateUnitySlice';
import { setFuzzyNumber } from '../../redux/reducers/FileReducers/CreateFuzzyNumberSlice';
import { defaultFuzzyLoaderNumberName, defaultFuzzyNumber } from '../LoaderBox/consts';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

export const FileLoader = ({ name, i, f, n }: FileLoaderProps) => {

	const dispatch = store.dispatch;
	const {fuzzyNumberUnity} = useAppSelector(state => state.createUnityReducer);
	const {fuzzyNumber} = useAppSelector(state => state.CreateFuzzyNumberReducer);
	const [fileStatus, setFileStatus] = useState(false);

	const sateToStore = (data: number[]) => {
		const values = Object.values(data);
		switch (name) {
			case defaultFuzzyLoaderNumberName:
				if (JSON.stringify(data) === JSON.stringify(values)) {
					dispatch(setFuzzyNumberUnity(data));
					return;
				} else {
					alert('Неверный формат файла, необходимо загрузить массив чисел в файле');
					return;
				}

			case defaultFuzzyNumber:
				dispatch(setFuzzyNumber(data));
				return;

		}
	};

	const changeName = (status: boolean, n: string, name: string) => {
		switch (name) {
			case defaultFuzzyLoaderNumberName:
				if (status && fuzzyNumberUnity.length !== 0) {
					return 'Загружено';
				}
				return n;

			
			case defaultFuzzyNumber:
				if (status && Object.keys(fuzzyNumber).length !== 0) {
					return 'Загружено';
				}
				return n;
		}
	};

	const handleChange = async (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		const file: File = (target.files as FileList)[0];
		if (file.name.split('.')[1] !== 'json') {
			alert('Неверное расширение файл, допустимый json');
			return;
		}
		setFileStatus(true);
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function () {
			const res = reader.result;
			if (typeof res === 'string') {
				const arr = JSON.parse(res);
				sateToStore(arr);
				
			} else {
				alert('Файл пуст');
			}
		};
		

	};

	return (
		<div className={styles.fileUpload}>
			<input type="file" onChange={handleChange}
				name={name}
				className={styles.inputFile}
				id={i}
			/>
			<label htmlFor={f}><span>{changeName(fileStatus, n, name)}</span></label>
		</div>
	);
};
