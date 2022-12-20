import { Box } from '../Box/Box';
import { Htag } from '../Htag/Htag';
import styles from './LoaderBox.module.css';
import { LoaderBoxProps } from './LoaderBox.props';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { setKindOfNumber } from '../../redux/reducers/MethodsSlice';
import { Input } from '../Input/Input';
import { FileLoader } from '../FileLoader/FileLoader';
import { defaultFuzzyLoaderNumberName } from './consts';
import { Downloader } from '../Downloader/Downloader';
import { useState } from 'react';



export const LoaderBox = ({ header, tag }: LoaderBoxProps) => {

	const dispatch = store.dispatch;
	const {kindOfNumber, kind } = useAppSelector(state => state.methodsReducer);
	const {fuzzyNumberUnity} = useAppSelector(state => state.createUnityReducer);
	const {numbersFuzz, keyFuzz} = useAppSelector(state => state.createKindReducer);

	const [loadData, setLoadData] = useState(false);
	const elems = ['Треугольный вид', 'Трапецеидальный вид'];
	const example = JSON.stringify({ "data": [1, 10, 20] }, null, 4);

	const onHeaderClick = () => {
		setLoadData(!loadData);
	};

	const onKindNumberClick = () => {
		dispatch(setKindOfNumber(!kindOfNumber));
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
								<Button appearance='primary' onClick={onKindNumberClick}>Вид числа</Button>
								{kindOfNumber && <Dropdown elems={elems} forWhat={'kind'} />}
								{!kindOfNumber && kind !== "" && <Input selected={kind} />}
							</div>

							<FileLoader name={defaultFuzzyLoaderNumberName} i={defaultFuzzyLoaderNumberName} f={defaultFuzzyLoaderNumberName}  n="Загрузить" />
							{fuzzyNumberUnity.length !== 0  && numbersFuzz && keyFuzz && <Downloader file={{
								data: fuzzyNumberUnity,
								key: [numbersFuzz, keyFuzz]
							}} forWhat={defaultFuzzyLoaderNumberName}/>}
						</div>
						:
						<div className={styles.LoadContent}>
							<div className={styles.Prompt}>
								<p className={styles.Par}>{example}</p>
								<p className={styles.Par}>Формат данных вашего универсального множества .json</p>
							</div>
						</div>
					}
				</Box>
			</div>
		</div>
	);
};