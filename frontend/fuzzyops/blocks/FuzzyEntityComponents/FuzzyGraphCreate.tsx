import { FuzzyProps } from './FuzzyEntityComponents.props';
import styles from './FuzzyEntityComponents.module.css';
import { Htag } from '../../components/Htag/Htag';
import { Box } from '../../components/Box/Box';
import { useState } from 'react';
import cn from 'classnames';
import { Button } from '../../components/Button/Button';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { edge_type, edge_number_math_type, equals_type, defaultFuzzyGraphCreate } from './consts';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { setIsEdgeType, setIsEdgeNumberEqType, setIsEdgeNumberMathType } from '../../redux/reducers/FileReducers/CreateFuzzyGraphSlice';
import { FileLoader } from '../../components/FileLoader/FileLoader';
import { fuzzyGraphCreate } from '../../http/FuzzyGraphApi';


export const FuzzyGraphCreate = ({ header, tag }: FuzzyProps) => {

	const { isEdgeType, isEdgeNumberEqType, isEdgeNumberMathType, graph_data, graphSettings } = useAppSelector(state => state.CreateFuzzyGraphReducer);

	const [loadData, setLoadData] = useState(false);
	const dispatch = store.dispatch;

	const click = (flag: boolean, setter: ActionCreatorWithPayload<boolean>) => {
		dispatch(setter(!flag));
	};

	const onHeaderClick = () => {
		setLoadData(!loadData);
	};

	const getResult = async () => {
		const formData = {
			graphSettings,
			graph_data
		};
		const response = await fuzzyGraphCreate(formData);
		console.log(response);
		if (response.data.status === 200) {
			const file_hash = response.data.data;
			localStorage.setItem("file_hash", file_hash);
			alert("Граф сохранен");

			const str = JSON.stringify({ file_hash });
			const blob = new Blob([str]);
			const url = URL.createObjectURL(blob);
			const anchor = document.createElement('a');
			anchor.href = url;
			anchor.download = 'fuzzyGraphHash.json';
			document.body.append(anchor);
			anchor.click();
			anchor.remove();

			URL.revokeObjectURL(url);
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
						})} click={onHeaderClick}>Создать граф</Htag>
						<Htag tag='h2' className={cn(styles.headerH2, {
							[styles.headerH2Active]: loadData === false
						})} click={onHeaderClick}>Подсказка</Htag>

					</div>
					{loadData ?
						<div className={styles.LoadContent}>
							<div className={styles.KindNumberContent}>
								<Button appearance='primary' onClick={() => click(isEdgeType, setIsEdgeType)}>Тип ребер</Button>
								{isEdgeType && <Dropdown elems={edge_type} forWhat={'edgeType'} />}
							</div>

							<div className={styles.KindNumberContent}>
								<Button appearance='primary' onClick={() => click(isEdgeNumberEqType, setIsEdgeNumberEqType)}>Тип числа ребер</Button>
								{isEdgeNumberEqType && <Dropdown elems={equals_type} forWhat={'edgeNumberType'} />}
							</div>

							<div className={styles.KindNumberContent}>
								<Button appearance='primary' onClick={() => click(isEdgeNumberMathType, setIsEdgeNumberMathType)}>Тип операции ребра</Button>
								{isEdgeNumberMathType && <Dropdown elems={edge_number_math_type} forWhat={'edgeMathType'} />}
							</div>

							<FileLoader name={defaultFuzzyGraphCreate} i={defaultFuzzyGraphCreate} f={defaultFuzzyGraphCreate} n="Загрузить" />

							{graph_data.length !== 0 && graphSettings.edgeType && graphSettings.edgeNumberEqType &&
								graphSettings.edgeNumberMathType && <Button appearance='primary' onClick={getResult}>Получить</Button>}

						</div>
						:
						<div className={styles.LoadContent}>
							<div className={styles.Prompt}>
							</div>
						</div>
					}
				</Box>
			</div>
		</div>
	);
};