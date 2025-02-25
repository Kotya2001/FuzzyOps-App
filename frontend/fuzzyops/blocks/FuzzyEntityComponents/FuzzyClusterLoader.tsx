import { FuzzyProps } from './FuzzyEntityComponents.props';
import cn from 'classnames';
import { Box } from '../../components/Box/Box';
import { Htag } from '../../components/Htag/Htag';
import styles from './FuzzyEntityComponents.module.css';
import { Button } from '../../components/Button/Button';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useState } from 'react';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { FileLoader } from '../../components/FileLoader/FileLoader';
import { ExelFileLoader } from '../../components/ExelFileLoader/ExelFileLoader';
import { defaultFuzzyCluster, defaultFuzzyClusterCsv, defaultFuzzyClusterCsvTest } from './consts';
import { fuzzyCluster } from '../../http/FuzzyClusterApi';





export const FuzzyClusterLoader = ({ header, tag }: FuzzyProps) => {

	const [loadData, setLoadData] = useState(false);
	const { params, train_data, test_data } = useAppSelector(state => state.FuzzyClusterReducer);
	const dispatch = store.dispatch;
	const onHeaderClick = () => {
		setLoadData(!loadData);
	};


	const getResult = async () => {
		const formData = {
			params,
			train_data,
			test_data
		};
		const response = await fuzzyCluster(formData);
		console.log(response)
		if (response.status === 200) {
			// Создаем URL для скачивания
			const url = window.URL.createObjectURL(new Blob([response.data]));

			// Создаем элемент ссылки для скачивания
			const a = document.createElement('a');
			a.href = url;
			a.download = 'result.csv'; // Имя файла при скачивании
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url); // Освобождаем URL


		} else {
			alert(response.data.message);
		}
	};


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

						<Htag tag='h2' className={cn(styles.headerH2, {
							[styles.headerH2Active]: loadData === true
						})} click={onHeaderClick}>Загрузить данные</Htag>
						<Htag tag='h2' className={cn(styles.headerH2, {
							[styles.headerH2Active]: loadData === false
						})} click={onHeaderClick}>Подсказка</Htag>

					</div>
					{loadData ?
						<div className={styles.LoadContent}>

							<FileLoader name={defaultFuzzyCluster} i={defaultFuzzyCluster} f={defaultFuzzyCluster} n="Загрузить параметры" />
							<ExelFileLoader name={defaultFuzzyClusterCsv} i={defaultFuzzyClusterCsv} f={defaultFuzzyClusterCsv} n="Загрузить тренировочные данные csv" />
							<ExelFileLoader name={defaultFuzzyClusterCsvTest} i={defaultFuzzyClusterCsvTest} f={defaultFuzzyClusterCsvTest} n="Загрузить тестовые данные csv" />
							{train_data && test_data && params && <Button appearance='primary' onClick={getResult}>Получить</Button>}
						</div>

						:
						<div className={styles.LoadContent}>
							<div className={styles.Prompt}>
								<p className={styles.Par}>Загрузите данные в формате .json</p>
								<p className={styles.Par}>Установите тип задачи</p>
							</div>
						</div>
					}
				</Box>
			</div>
		</div>
	)
}