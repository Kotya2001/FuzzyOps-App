import { Box } from '../Box/Box';
import { Htag } from '../Htag/Htag';
import styles from './LoaderBox.module.css';
import { LoaderBoxProps } from './LoaderBox.props';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { setKindOfNumber, setIsLingVar, setIsName } from '../../redux/reducers/MethodsSlice';
import { Input } from '../Input/Input';
import { FileLoader } from '../FileLoader/FileLoader';
import { defaultFuzzyLoaderNumberName } from './consts';
import { Downloader } from '../Downloader/Downloader';
import { useState } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';



export const LoaderBox = ({ header, tag }: LoaderBoxProps) => {

	const dispatch = store.dispatch;
	const {kindOfNumber, kind, isLingVar, lingVar, isName, name } = useAppSelector(state => state.methodsReducer);
	const {fuzzyNumberUnity} = useAppSelector(state => state.createUnityReducer);
	const {numbersFuzz, keyFuzz} = useAppSelector(state => state.createKindReducer);

	const [loadData, setLoadData] = useState(false);
	const elems = ["Треугольный вид", "Трапецеидальный вид", "Гауссовский вид"];
	const example = JSON.stringify([1, 10, 20], null, 4);

	const click = (flag: boolean, setter: ActionCreatorWithPayload<boolean>) => {
		dispatch(setter(!flag));
	};

	const onHeaderClick = () => {
		setLoadData(!loadData);
	};

	const defType = (selected: string) => {
		let key, value;
		if (selected === "Треугольный вид") {
			key = "triangular";
			value = "a <= b <= c";
		} else if (selected === "Трапецеидальный вид") {
			key = "trapezoidal";
			value = "a <= b <= c <= d";
		} else if (selected === "Гауссовский вид") {
			key = "gauss";
			value = "sigma mean";
		} else if (selected === "name") {
			key = "name";
			value = "(Давление)";
		} else if (selected === "ling") {
			key = "ling";
			value = "(Большое)";
		} else {
			key = "";
			value = "";
		}
		return [key, value];
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
								<Button appearance='primary' onClick={() => click(kindOfNumber, setKindOfNumber)}>Вид числа</Button>
								{kindOfNumber && <Dropdown elems={elems} forWhat={'kind'} />}
								{!kindOfNumber && kind !== "" && <Input keyValue={defType(kind)} />}
							</div>

							<div className={styles.KindNumberContent}>
								<Button appearance='primary' onClick={() => click(isName, setIsName)}>Имя переменной</Button>
								{isName && <Input keyValue={defType('name')}/>}
							</div>

							<div className={styles.KindNumberContent}>
								<Button appearance='primary' onClick={() => click(isLingVar, setIsLingVar)}>Квантификатор</Button>
								{isLingVar && <Input keyValue={defType('ling')} />}
							</div>

							<FileLoader name={defaultFuzzyLoaderNumberName} i={defaultFuzzyLoaderNumberName} f={defaultFuzzyLoaderNumberName}  n="Загрузить" />
							{fuzzyNumberUnity.length !== 0  && numbersFuzz && keyFuzz && name && <Downloader file={{
								data: fuzzyNumberUnity,
								key: [numbersFuzz, keyFuzz],
								name,
								ling: lingVar
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