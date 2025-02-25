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
import { setIsChoosen, setResult } from '../../redux/reducers/FileReducers/CreateMSASlice';
import { task_type, defaultFuzzyMSA } from './consts';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { FileLoader } from '../../components/FileLoader/FileLoader';
import { fuzzyMsaCalc } from '../../http/FuzzyMsaApi';



export const FuzzyMSALoader = ({ header, tag }: FuzzyProps) => {

	const [loadData, setLoadData] = useState(false);
	const dispatch = store.dispatch;
	const { isChoosen, msa_data, taskType } = useAppSelector(state => state.CreateMSAReducer);
	const onHeaderClick = () => {
		setLoadData(!loadData);
	};

	const click = (flag: boolean, setter: ActionCreatorWithPayload<boolean>) => {
		dispatch(setter(!flag));
	};

	const getResult = async () => {
		const formData = {
			taskType,
			msa_data
		};
		const response = await fuzzyMsaCalc(formData);
		if (response.data.status === 200) {
			dispatch(setResult(response.data.data))
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
							<div className={styles.KindNumberContent}>
								<Button appearance='primary' onClick={() => click(isChoosen, setIsChoosen)}>Тип задачи</Button>
								{isChoosen && <Dropdown elems={task_type} forWhat={'Msa'} />}
							</div>

							<FileLoader name={defaultFuzzyMSA} i={defaultFuzzyMSA} f={defaultFuzzyMSA} n="Загрузить" />

							{taskType !== "" && msa_data && <Button appearance='primary' onClick={getResult}>Получить</Button>}
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