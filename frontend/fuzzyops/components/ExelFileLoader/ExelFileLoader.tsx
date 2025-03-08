import { ExelFileLoaderProps } from './ExelFileLoader.props';
import styles from './ExelFileLoader.module.css';
import { store } from '../../redux/store';
import { setIsLoadCsv, setX } from '../../redux/reducers/OptimizationReducers/MetaOptSlice';
import { useState } from 'react';
import { defaultFuzzyLinearOptName, defaultFuzzyMetaOptNameCSV, defaultFuzzyClusterCsv, defaultFuzzyClusterCsvTest, defaultFuzzyNN1Csv } from '../../blocks/FuzzyEntityComponents/consts';
import { setTrainData, setTestData } from '../../redux/reducers/FileReducers/FuzzyClusterSlice';
import { setIsLoadTrain, setTrain } from '../../redux/reducers/FileReducers/FuzzyNN1Slice';


export const ExelFileLoader = ({ name, i, f, n }: ExelFileLoaderProps) => {

	const dispatch = store.dispatch;
	const [fileStatus, setFileStatus] = useState(false);



	const changeName = (status: boolean, n: string, name: string) => {

		switch (name) {
			case defaultFuzzyLinearOptName:
				if (status) {
					return 'Загружено';
				}
				return n;
			case defaultFuzzyMetaOptNameCSV:
				if (status) {
					return 'Загружено';
				}
				return n;
			case defaultFuzzyClusterCsv:
				if (status) {
					return 'Загружено';
				}
				return n;
			case defaultFuzzyClusterCsvTest:
				if (status) {
					return 'Загружено';
				}
				return n;
			case defaultFuzzyNN1Csv:
				if (status) {
					return 'Загружено';
				}
				return n;
		}
	};

	const handleChange = async (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		const file: File = (target.files as FileList)[0];
		if (file.name.split('.')[1] !== 'csv') {
			alert('Неверное расширение файл, допустимый csv');
			return;
		}
		setFileStatus(true);
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function () {
			const res = reader.result;
			if (typeof res === 'string') {
				if (name == defaultFuzzyMetaOptNameCSV) {
					dispatch(setX(res));
					dispatch(setIsLoadCsv(true));
				} else if (name == defaultFuzzyClusterCsv) {
					dispatch(setTrainData(res));
				} else if (name == defaultFuzzyClusterCsvTest) {
					dispatch(setTestData(res));
				} else if (name == defaultFuzzyNN1Csv) {
					console.log(res);
					dispatch(setTrain(res));
					dispatch(setIsLoadTrain(true));
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
