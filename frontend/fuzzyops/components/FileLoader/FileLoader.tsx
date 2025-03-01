import { FileLoaderProps } from './FileLoader.props';
import styles from './FileLoader.module.css';
import { store } from '../../redux/store';
import { fNum, setFuzzyNumberUnity } from '../../redux/reducers/FileReducers/CreateUnitySlice';
import { setFuzzyNumber } from '../../redux/reducers/FileReducers/CreateFuzzyNumberSlice';
import { setGraphData, Root } from '../../redux/reducers/FileReducers/CreateFuzzyGraphSlice';
import { setJsonData, MsaParams } from '../../redux/reducers/FileReducers/CreateMSASlice';
import { defaultFuzzyLoaderNumberName, defaultFuzzyNumber, defaultFuzzyGraphCreate, defaultFuzzyMSA, defaultFuzzyCluster } from '../../blocks/FuzzyEntityComponents/consts';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { ClusterParams, setClusterParams } from '../../redux/reducers/FileReducers/FuzzyClusterSlice';

export const FileLoader = ({ name, i, f, n }: FileLoaderProps) => {

	const dispatch = store.dispatch;
	const { fuzzyNumberUnity } = useAppSelector(state => state.createUnityReducer);
	const { fuzzyNumber } = useAppSelector(state => state.CreateFuzzyNumberReducer);
	const { graph_data } = useAppSelector(state => state.CreateFuzzyGraphReducer);
	const { msa_data } = useAppSelector(state => state.CreateMSAReducer);
	const { params } = useAppSelector(state => state.FuzzyClusterReducer);
	const [fileStatus, setFileStatus] = useState(false);

	const sateToStore = (data: number[] | object) => {
		// const values = Object.values(data);
		switch (name) {
			// case defaultFuzzyLoaderNumberName:
			// 	if (JSON.stringify(data) === JSON.stringify(values)) {
			// 		dispatch(setFuzzyNumberUnity(data));
			// 		return;
			// 	} else {
			// 		alert('Неверный формат файла, необходимо загрузить массив чисел в файле');
			// 		return;
			// 	}

			case defaultFuzzyNumber:
				dispatch(setFuzzyNumber(data));
				return;

		}
	};

	const saveFnumData = (data: fNum) => {
		switch (name) {
			case defaultFuzzyLoaderNumberName:
				if ('data' in data && data.data.length !== 0
					&& 'defuzz_type' in data && data.defuzz_type &&
					'use_gpu' in data &&
					'method' in data && data.method) {
					dispatch(setFuzzyNumberUnity(data));
				} else {
					alert('Неверный формат файла, проверьте наличие всех ключей и данных в файле');
					return;
				}
		}
	};

	const saveGraphData = (data: Root) => {
		dispatch(setGraphData(data));
	};

	const saveMsaData = (data: MsaParams) => {
		dispatch(setJsonData(data));
	};

	const saveClusterData = (data: ClusterParams) => {
		dispatch(setClusterParams(data));
	};

	const changeName = (status: boolean, n: string, name: string) => {
		switch (name) {
			case defaultFuzzyLoaderNumberName:
				if (status && fuzzyNumberUnity.data.length !== 0) {
					return 'Загружено';
				}
				return n;


			case defaultFuzzyNumber:
				if (status && Object.keys(fuzzyNumber).length !== 0) {
					return 'Загружено';
				}
				return n;

			case defaultFuzzyGraphCreate:
				if (status && graph_data.length !== 0) {
					return 'Загружено';
				}
				return n;

			case defaultFuzzyMSA:
				if (status && Object.keys(msa_data.domain).length > 0 &&
					msa_data.numType !== "" && msa_data.data) {
					return 'Загружено';
				}
				return n;

			case defaultFuzzyCluster:
				if (status && params.error !== 0 && params.m !== 0 && params.maxiter !== 0 && params.nCluster !== 0) {
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
					if (name === defaultFuzzyLoaderNumberName) {
						saveFnumData(arr);
					} else if (name === defaultFuzzyNumber) {
						sateToStore(arr);
					}
					else if (name === defaultFuzzyGraphCreate) {
						saveGraphData(arr);
					} else if (name === defaultFuzzyMSA) {
						saveMsaData(arr);
					} else if (name === defaultFuzzyCluster) {
						saveClusterData(arr);
					}
				} catch (e) {
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
