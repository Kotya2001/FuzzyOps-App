import { useState } from 'react';
import { Box } from '../../components/Box/Box';
import { Htag } from '../../components/Htag/Htag';
import styles from './FuzzyEntityComponents.module.css';
import { FuzzyProps } from './FuzzyEntityComponents.props';
import { Button } from '../../components/Button/Button';
import { GraphInput } from '../../components/Input/GraphInput';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { setPath, setPathLoop, setGroups, setDominatingRes } from '../../redux/reducers/ResultReducers/FuzzyGraphAlgsSlice';
import { getClusters, shortestPath, chechDominating } from '../../http/FuzzyGraphApi';
import { P } from '../../components/P/P';

export const FuzzyGraphAlgs = ({ header, tag }: FuzzyProps) => {

	const dispatch = store.dispatch;
	const [isOpendPath, setIsOpendPath] = useState(false);
	const [isOpendCluster, setIsOpendCluster] = useState(false);
	const [isOpendDomin, setIsOpendDomin] = useState(false);
	const { path, dominating, cluster, pathLoop, groups, dominatingRes } = useAppSelector(state => state.FuzzyGraphAlgsReducer);

	const apiBody = async (data: string, fileHash: string) => {
		if (data == "path") {
			const response = await shortestPath({path, fileHash});
			if (response.data.status === 200) {
				const data = response.data.data;
				dispatch(setPathLoop(data.path.join()));
			} else {
				alert(response.data.message);
			}
		} else if (data == "cluster") {
			const response = await getClusters({ cluster, fileHash });
			if (response.data.status == 200) {
				const data = response.data.data;
				dispatch(setGroups(data));
			} else {
				alert(response.data.message);
			}
		} else if (data == "dominating") {
			const response = await chechDominating({ dominating, fileHash });
			if (response.data.status == 200) {
				const data = response.data.data;
				dispatch(setDominatingRes(data));
			} else {
				alert(response.data.message);
			}
		}
	};


	const calc = async (data: string) => {
		dispatch(setPath(""));
		const fileHash = localStorage.getItem("file_hash");
		if (!fileHash) {
			alert("Создайте граф");
		} else {
			await apiBody(data, fileHash);
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

						<div className={styles.LoadContent}>
							<Button appearance='primary' onClick={() => setIsOpendPath(!isOpendPath)}>Кратчайший путь</Button>
							{isOpendPath && <GraphInput keyValue={["path", "Start End"]}/>}
							{path && <Button appearance='primary' onClick={() => calc("path")}>Посчитать</Button>}
							{pathLoop && <P size='m'> {pathLoop} </P>}

						</div>
					</div>
					
					<div className={styles.blockBoxHeader}>

						<div className={styles.LoadContent}>
							<Button appearance='primary' onClick={() => setIsOpendCluster(!isOpendCluster)}>Найти кластеры</Button>
							{isOpendCluster && <GraphInput keyValue={["cluster", "Number of clusters"]} />}
							{cluster && <Button appearance='primary' onClick={() => calc("cluster")}>Найти</Button>}
							{Object.keys(groups).length !== 0 && <P size='m'> {JSON.stringify(groups, null, 4)} </P>}

						</div>
					</div>

					<div className={styles.blockBoxHeader}>

						<div className={styles.LoadContent}>
							<Button appearance='primary' onClick={() => setIsOpendDomin(!isOpendDomin)}>Проверка на доминантность</Button>
							{isOpendDomin && <GraphInput keyValue={["dominating", "Indexes of nodes"]} />}
							{dominating && <Button appearance='primary' onClick={() => calc("dominating")}>Проверить</Button>}
							{dominatingRes && <P size='m'>{dominatingRes}</P>}

						</div>
					</div>

				</Box>
			</div>
		</div>
	);
};