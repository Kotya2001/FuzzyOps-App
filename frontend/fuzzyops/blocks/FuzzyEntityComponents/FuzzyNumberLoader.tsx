import { Box } from '../../components/Box/Box';
import { Htag } from '../../components/Htag/Htag';
import styles from './FuzzyEntityComponents.module.css';
import { FuzzyProps } from './FuzzyEntityComponents.props';
import cn from 'classnames';
import { Button } from '../../components/Button/Button';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { setKindOfNumber, setIsLingVar, setIsName } from '../../redux/reducers/MethodsSlice';
import { Input } from '../../components/Input/Input';
import { FileLoader } from '../../components/FileLoader/FileLoader';
import { defType, defaultFuzzyLoaderNumberName, elems, example } from './consts';
import { Downloader } from '../../components/Downloader/Downloader';
import { useState } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';



export const FuzzuNumberLoader = ({ header, tag }: FuzzyProps) => {

	const dispatch = store.dispatch;
	const { kindOfNumber, kind, isLingVar, lingVar, isName, name } = useAppSelector(state => state.methodsReducer);
	const { fuzzyNumberUnity } = useAppSelector(state => state.createUnityReducer);
	const { numbersFuzz, keyFuzz } = useAppSelector(state => state.createKindReducer);
	console.log(fuzzyNumberUnity)

	const [loadData, setLoadData] = useState(false);

	const click = (flag: boolean, setter: ActionCreatorWithPayload<boolean>) => {
		dispatch(setter(!flag));
	};

	const onHeaderClick = () => {
		setLoadData(!loadData);
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
								{isName && <Input keyValue={defType('name')} />}
							</div>

							<div className={styles.KindNumberContent}>
								<Button appearance='primary' onClick={() => click(isLingVar, setIsLingVar)}>Квантификатор</Button>
								{isLingVar && <Input keyValue={defType('ling')} />}
							</div>

							<FileLoader name={defaultFuzzyLoaderNumberName} i={defaultFuzzyLoaderNumberName} f={defaultFuzzyLoaderNumberName} n="Загрузить" />
							{fuzzyNumberUnity.data.length !== 0 && numbersFuzz && keyFuzz && name && <Downloader file={{
								data: fuzzyNumberUnity.data,
								key: [numbersFuzz, keyFuzz],
								name,
								ling: lingVar,
								defuzz_type: fuzzyNumberUnity.defuzz_type,
								use_gpu: fuzzyNumberUnity.use_gpu,
								method: fuzzyNumberUnity.method
							}} forWhat={defaultFuzzyLoaderNumberName} />}
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