
import { FuzzyProps } from './FuzzyEntityComponents.props';
import { Box } from '../../components/Box/Box';
import { Htag } from '../../components/Htag/Htag';
import styles from './FuzzyEntityComponents.module.css';
import { useAppSelector } from '../../redux/hooks';
import { Button } from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { setFileHash } from '../../redux/reducers/FileReducers/FuzzyNN1Slice';
import { store } from '../../redux/store';
import { FileLoaderMeta } from '../../components/FileLoaderMeta/FileLoaderMeta';
import { defaultFuzzyNNInp } from './consts';
import { fuzzynn, fuzzynnGet } from '../../http/FuzzyNNApi';


export const FuzzyNN1Get = ({ header, tag }: FuzzyProps) => {

	const { isLoadConfig, isLoadTrain, file_hash, isInput, config, csvTrain, input_data } = useAppSelector(state => state.FuzzyNN1Reducer);
	const dispatch = store.dispatch;

	const [loading, setLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const [loadingAns, setLoadingAns] = useState(false);
	const [isDisabledAns, setIsDisabledAns] = useState(false);
	const [errorMessageAns, setErrorMessageAns] = useState('');
	const [successMessageAns, setSuccessMessageAns] = useState('');





	const getParams = async () => {
		setIsDisabled(true);
		setLoading(true); // Устанавливаем состояние загрузки
		setErrorMessage(''); // Сбрасываем предыдущее сообщение об ошибке

		try {
			const response = await fuzzynn(config, csvTrain);

			if (response.data.status === 200) {
				const data = response.data.data;
				const file_hash = data.file_hash;
				const str = JSON.stringify({ ...data });
				const blob = new Blob([str]);
				const url = URL.createObjectURL(blob);
				const anchor = document.createElement('a');
				anchor.href = url;
				anchor.download = 'model_hash.json';
				document.body.append(anchor);
				anchor.click();
				anchor.remove();

				URL.revokeObjectURL(url);
				setSuccessMessage('Файл успешно загружен!');
				dispatch(setFileHash(file_hash));
				setIsDisabled(false);
			} else {
				setErrorMessage(response.data.message);
				setIsDisabled(false); // Устанавливаем сообщение об ошибке
			}
		} catch (error) {
			setErrorMessage('Произошла ошибка при вычислении.'); // Обработка ошибок сети
			setIsDisabled(false);
		} finally {
			setLoading(false);
			setIsDisabled(false);  // Сбрасываем состояние загрузки независимо от результата
		}
	};

	const getAns = async () => {
		setIsDisabledAns(true);
		setLoadingAns(true); // Устанавливаем состояние загрузки
		setErrorMessageAns(''); // Сбрасываем предыдущее сообщение об ошибке

		try {
			const dataToSend = { file_hash, input_data }
			const response = await fuzzynnGet(dataToSend);

			if (response.data.status === 200) {
				const data = response.data.data;
				const str = JSON.stringify({ ...data });
				const blob = new Blob([str]);
				const url = URL.createObjectURL(blob);
				const anchor = document.createElement('a');
				anchor.href = url;
				anchor.download = 'model_hash.json';
				document.body.append(anchor);
				anchor.click();
				anchor.remove();

				URL.revokeObjectURL(url);
				setSuccessMessageAns('Файл успешно загружен!');
				setIsDisabledAns(false);
			} else {
				setErrorMessageAns(response.data.message);
				setIsDisabledAns(false); // Устанавливаем сообщение об ошибке
			}
		} catch (error) {
			setErrorMessageAns('Произошла ошибка при вычислении.'); // Обработка ошибок сети
			setIsDisabledAns(false);
		} finally {
			setLoadingAns(false);
			setIsDisabledAns(false);  // Сбрасываем состояние загрузки независимо от результата
		}
	};

	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage('');
			}, 5000);
			return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента или изменении successMessage
		}
	}, [successMessage]);

	useEffect(() => {
		if (successMessageAns) {
			const timer = setTimeout(() => {
				setErrorMessageAns('');
			}, 5000);
			return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента или изменении successMessage
		}
	}, [successMessageAns]);





	return (
		<div className={styles.wrapper}>
			<div>
				<Htag tag={tag} className={styles.headerH1}>
					{header}
				</Htag>
			</div>

			<div>
				<Box className={styles.block}>

					<div className={styles.blockBoxHeader}>

						<div className={styles.LoadContent}>
							{isLoadTrain && isLoadConfig && <Button appearance='primary' onClick={() => getParams()} disabled={isDisabled}>Обучить модель</Button>}
							{loading && <div className={styles.loadingMessage}>Идет обучение...</div>}
							{errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
							{successMessage && <div className={styles.successMessage}>{successMessage}</div>}

							{file_hash && <FileLoaderMeta name={defaultFuzzyNNInp} i={defaultFuzzyNNInp} f={defaultFuzzyNNInp} n="Загрузить входные данные .json" />}
							{isInput && <Button appearance='primary' onClick={() => getAns()} disabled={isDisabledAns}>Получить ответ</Button>}
							{loadingAns && <div className={styles.loadingMessage}>Получение ответа...</div>}
							{errorMessageAns && <div className={styles.errorMessage}>{errorMessage}</div>}
							{successMessageAns && <div className={styles.successMessage}>{successMessage}</div>}

						</div>
					</div>

				</Box>
			</div>
		</div>
	);
};