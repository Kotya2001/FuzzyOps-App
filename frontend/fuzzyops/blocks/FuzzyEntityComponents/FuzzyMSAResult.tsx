
import { FuzzyProps } from './FuzzyEntityComponents.props';
import { Box } from '../../components/Box/Box';
import { Htag } from '../../components/Htag/Htag';
import styles from './FuzzyEntityComponents.module.css';
import { useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { fuzzyMsaCalc } from '../../http/FuzzyMsaApi';





export const FuzzyMSAResult = ({ header, tag }: FuzzyProps) => {
	const { taskType, msa_data, isData } = useAppSelector(state => state.CreateMSAReducer);


	const [loading, setLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');





	const getParams = async () => {
		setIsDisabled(true);
		setLoading(true); // Устанавливаем состояние загрузки
		setErrorMessage(''); // Сбрасываем предыдущее сообщение об ошибке

		try {
			const formData = {
				taskType,
				msa_data
			};
			const response = await fuzzyMsaCalc(formData);

			if (response.data.status === 200) {
				const data = response.data.data;
				const str = JSON.stringify({ ...data });
				const blob = new Blob([str]);
				const url = URL.createObjectURL(blob);
				const anchor = document.createElement('a');
				anchor.href = url;
				anchor.download = 'msa.json';
				document.body.append(anchor);
				anchor.click();
				anchor.remove();

				URL.revokeObjectURL(url);
				setSuccessMessage('Файл успешно загружен!');
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

	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage('');
			}, 5000);
			return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента или изменении successMessage
		}
	}, [successMessage]);





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
							{taskType !== "" && isData && <Button appearance='primary' onClick={() => getParams()} disabled={isDisabled}>Найти</Button>}
							{loading && <div className={styles.loadingMessage}>Идет вычисление...</div>}
							{errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
							{successMessage && <div className={styles.successMessage}>{successMessage}</div>}

						</div>
					</div>

				</Box>
			</div>
		</div>
	);
};