import { FileLoaderMetaProps } from './FileLoaderMeta.props'; 
import styles from './FileLoaderMeta.module.css';
import { store } from '../../redux/store';
import { defaultFuzzyMetaOptName } from '../../blocks/FuzzyEntityComponents/consts';
import { useState } from 'react';
import { setParams } from '../../redux/reducers/ResultReducers/FuzzyNumberResultSlice';

export const FileLoaderMeta = ({ name, i, f, n }: FileLoaderMetaProps) => {

	const dispatch = store.dispatch;

	const [fileStatus, setFileStatus] = useState(false);



	const changeName = (status: boolean, n: string, name: string) => {
		switch (name) {
			case defaultFuzzyMetaOptName:
				if (status) {
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
				try {
					const arr = JSON.parse(res);
					console.log(arr);
					dispatch(setParams(arr));
				} catch(e) {
					alert("Ошибка парсинга json");
				}
				

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
