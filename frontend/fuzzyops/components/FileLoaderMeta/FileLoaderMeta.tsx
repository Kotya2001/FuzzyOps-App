import { FileLoaderMetaProps } from './FileLoaderMeta.props';
import styles from './FileLoaderMeta.module.css';
import { store } from '../../redux/store';
import {
	defaultFuzzyLogicData, defaultFuzzyMetaOptName, defaultGraphAssignment, defaultFuzzyLinearOptName, defaultFuzzyNN1,
	defaultFuzzyNNInp, defaultFuzzyNN2, defaultFpred, defaultFan, defaultFuzzyMSA
} from '../../blocks/FuzzyEntityComponents/consts';
import { useState } from 'react';
import { setIsLoadParams, setParams } from '../../redux/reducers/OptimizationReducers/MetaOptSlice';
import { setTasks, setWorkers, setFuzzyCosts } from '../../redux/reducers/FileReducers/AddAssignmentsSlice';
import { setData, setIsLoadRules } from '../../redux/reducers/FileReducers/FuzzyLogicSlice';
import { setLinOptData, setLoadLinOpt } from '../../redux/reducers/OptimizationReducers/LinearOptSlice';
import { setConfig, setIsLoadCfg, setInputData, setIsInput } from '../../redux/reducers/FileReducers/FuzzyNN1Slice';
import { setIsLoadXtrain, setXTrain } from '../../redux/reducers/FileReducers/FuzzyNN2Slice';
import { setPredData, setIsLoadX } from '../../redux/reducers/FileReducers/FuzzyPredSlice';
import { setFanData, setIsFan } from '../../redux/reducers/FileReducers/FanSlice';
import { setIsData, setJsonData } from '../../redux/reducers/FileReducers/CreateMSASlice';

export const FileLoaderMeta = ({ name, i, f, n }: FileLoaderMetaProps) => {

	const dispatch = store.dispatch;

	const [fileStatus, setFileStatus] = useState(false);



	const changeName = (status: boolean, n: string, name: string) => {
		switch (name) {
			case defaultFuzzyMetaOptName:
				if (status) {
					return 'json Загружен';
				}
				return n;

			case defaultGraphAssignment:
				if (status) {
					return 'Загружено';
				}
				return n;
			case defaultFuzzyLogicData:
				if (status) {
					return 'Загружено';
				}
				return n;
			case defaultFuzzyLinearOptName:
				if (status) {
					return 'Загружено';
				}
				return n;
			case defaultFuzzyNN1:
				if (status) {
					return 'json Загружен';
				}
				return n;
			case defaultFuzzyNNInp:
				if (status) {
					return 'json Загружен';
				}
				return n;
			case defaultFuzzyNN2:
				if (status) {
					return 'json Загружен';
				}
				return n;
			case defaultFpred:
				if (status) {
					return 'json Загружен';
				}
				return n;
			case defaultFan:
				if (status) {
					return 'json Загружен';
				}
				return n;
			case defaultFuzzyMSA:
				if (status) {
					return 'json Загружен';
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
					if (name == defaultFuzzyMetaOptName) {
						dispatch(setParams(arr));
						dispatch(setIsLoadParams(true));
					} else if (name == defaultGraphAssignment) {
						dispatch(setTasks(arr.tasks));
						dispatch(setWorkers(arr.workers));
						dispatch(setFuzzyCosts(arr.fuzzyCosts));

					} else if (name == defaultFuzzyLogicData) {
						dispatch(setData(arr));
						dispatch(setIsLoadRules(true));
					} else if (name == defaultFuzzyLinearOptName) {
						dispatch(setLinOptData(arr));
						dispatch(setLoadLinOpt(true));
					} else if (name == defaultFuzzyNN1) {
						dispatch(setConfig(arr));
						dispatch(setIsLoadCfg(true));
					} else if (name == defaultFuzzyNNInp) {
						dispatch(setInputData(arr));
						dispatch(setIsInput(true));
					} else if (name == defaultFuzzyNN2) {
						dispatch(setXTrain(arr));
						dispatch(setIsLoadXtrain(true));
					} else if (name == defaultFpred) {
						dispatch(setPredData(arr));
						dispatch(setIsLoadX(true));
					} else if (name == defaultFan) {
						dispatch(setFanData(arr));
						dispatch(setIsFan(true));
					} else if (name == defaultFuzzyMSA) {
						dispatch(setJsonData(arr));
						dispatch(setIsData(true));
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
