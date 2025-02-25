import { FuzzyProps } from './FuzzyEntityComponents.props';
import cn from 'classnames';
import styles from './FuzzyEntityComponents.module.css';
import { Htag } from '../../components/Htag/Htag';
import { Box } from '../../components/Box/Box';
import { FileLoader } from '../../components/FileLoader/FileLoader';
import { defType, defaultFuzzyLoaderNumberName, defaultFuzzyNumber, elems } from './consts';
import { Button } from '../../components/Button/Button';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { fuzzynumber } from '../../http/FuzzyLogicApi';
import { setFuzzyNumberResult, setAllPages, setParams, setFileHash, setLing, setName, setDefuzValue, FuzzyNumberResultSlice } from '../../redux/reducers/ResultReducers/FuzzyNumberResultSlice';
import { setOperation, setValue } from '../../redux/reducers/OpsReducers/OpsSlice';
import { Plot } from '../../components/Plot/Plot';
import { useState } from 'react';
import { getFile } from '../../http/CommonApi';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { Input } from '../../components/Input/Input';
import { fuzzynumberOps } from '../../http/FuzzyOpsApi';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { setKindOfNumber } from '../../redux/reducers/MethodsSlice';
import { setFuzzyNumberUnity } from '../../redux/reducers/FileReducers/CreateUnitySlice';
import { setKeyFuzz, setNumbersFuzz } from '../../redux/reducers/FileReducers/CreateKindSlice';




export const FuzzyNumber = ({ header, tag }: FuzzyProps) => {

	const dispatch = store.dispatch;
	const { fuzzyNumber } = useAppSelector(state => state.CreateFuzzyNumberReducer);
	const { kindOfNumber, kind } = useAppSelector(state => state.methodsReducer);
	const { result, all_pages, params, file_hash, name, ling, defuz_value } = useAppSelector(state => state.FuzzyNumberResultReducer);
	const { n, operation } = useAppSelector(state => state.FuzzyOpsReducer);
	const [count, setCount] = useState(0);
	const [modalActive, setModalActive] = useState(false);
	const [comminBtnActive, setCommonBtnActive] = useState(false);
	const [fuzzyBtnActive, setFuzzyBntActive] = useState(false);
	const [isPagination, setIsPagination] = useState(false);
	const [isCalc, setIsCalc] = useState(false);
	const { fuzzyNumberUnity } = useAppSelector(state => state.createUnityReducer);
	const { numbersFuzz, keyFuzz } = useAppSelector(state => state.createKindReducer);


	const setData = (data: FuzzyNumberResultSlice) => {
		dispatch(setFuzzyNumberResult(data));
		dispatch(setAllPages(data));
		dispatch(setParams(data));
		dispatch(setFileHash(data));
		dispatch(setLing(data));
		dispatch(setName(data));
		dispatch(setDefuzValue(data));
	};

	const apiBody = async () => {
		setIsCalc(false);
		const paginationParams = count !== 0 ? { currentPage: count, points: 100 } : { currentPage: 0, points: 100 };
		const formData = {
			fuzzyNumber,
			paginationParams
		};
		const response = await fuzzynumber(formData);
		if (response.data.status === 200) {
			const data = {
				result: response.data.data.result,
				all_pages: response.data.data.all_pages,
				params: response.data.data.params,
				file_hash: response.data.data.file_hash,
				name: response.data.data.name,
				ling: response.data.data.ling,
				defuz_value: response.data.data.defuz_value
			};
			setData(data);
			localStorage.setItem("data", JSON.stringify(data));

		} else {
			alert(response.data.message);
		}
	};

	const checkCalc = async () => {
		if (isCalc) {
			setIsPagination(true);
			await calc();
		} else {
			await apiBody();
		}
	};


	const clickUp = async () => {
		if (count < all_pages - 1) {
			setCount(count + 1);
			await checkCalc();

		}
	};

	const clickDown = async () => {
		if (count > 0) {
			setCount(count - 1);
			await checkCalc();
		}
	};

	const getResult = async () => {
		if (Object.keys(fuzzyNumber).length === 0) {
			alert('Загрузите ваше универсальное множество');
			return;
		}
		await apiBody();
	};

	const btnOperationClick = (ops: string) => {
		setModalActive(true);
		dispatch(setOperation(ops));
		return;
	};


	const downloadFile = async () => {

		const response = await getFile(file_hash);

		if (response.data.status === 200) {
			const data = response.data.data.file;
			console.log(response.data)
			const str = JSON.stringify(data);
			const blob = new Blob([str]);
			const url = URL.createObjectURL(blob);
			const anchor = document.createElement('a');
			anchor.href = url;
			anchor.download = 'fuzzynumber.json';
			document.body.append(anchor);
			anchor.click();
			anchor.remove();

			URL.revokeObjectURL(url);
		} else {
			alert('Файл отсутствует в кэшэ, пресчитайте значения');
		}

	};

	const calc = async () => {
		setIsCalc(true);
		setIsPagination(false);
		const paginationParams = count !== 0 ? { currentPage: count, points: 100 } : { currentPage: 0, points: 100 };
		const value = comminBtnActive ? n : { data: fuzzyNumberUnity, key: [numbersFuzz, keyFuzz] };
		console.log(value);
		const formData = {
			value,
			file_hash,
			operation,
			paginationParams,
			isPagination
		};
		const resp = await fuzzynumberOps(formData);
		if (resp.data.status === 200) {
			const data = {
				result: resp.data.data.result,
				all_pages: resp.data.data.all_pages,
				params: resp.data.data.params,
				file_hash: resp.data.data.file_hash,
				name: resp.data.data.name,
				ling: resp.data.data.ling,
				defuz_value: resp.data.data.defuz_value
			};
			setData(data);
			localStorage.setItem("data", JSON.stringify(data));

		} else {
			alert(resp.data.message);
		}
	};

	const openCommon = () => {
		setCommonBtnActive(!comminBtnActive);
		setFuzzyBntActive(false);
		dispatch(setFuzzyNumberUnity({
			data: [],
			defuzz_type: "",
			use_gpu: false,
			method: ""
		}));
		dispatch(setKeyFuzz(""));
		dispatch(setNumbersFuzz(""));
	};

	const openFuzzy = () => {
		setFuzzyBntActive(!fuzzyBtnActive);
		setCommonBtnActive(false);
		dispatch(setValue(""));
	};

	const isNum = (v: string) => {
		return /^\d+$/.test(v);
	};

	const click = (flag: boolean, setter: ActionCreatorWithPayload<boolean>) => {
		dispatch(setter(!flag));
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
						<Htag tag='h2' className={cn(styles.headerH2)}>Функция принадлежности</Htag>
					</div>

					<div className={styles.LoadContent}>

						<FileLoader name={defaultFuzzyNumber} i={defaultFuzzyNumber} f={defaultFuzzyNumber} n="Загрузить" />

					</div>

					<div className={styles.LoadContent}>
						<Button appearance='primary' onClick={getResult}>Получить</Button>
					</div>

					<div>
						{Object.keys(result).length !== 0 && <Plot
							result={result}
							all_pages={all_pages}
							params={params}
							name={name}
							ling={ling}
							defuz_value={defuz_value} />}
					</div>
					<div className={styles.btns}>
						<Button appearance='primary' onClick={clickDown}>Назад</Button>
						<Button appearance='primary' onClick={clickUp}>Вперед</Button>
						{file_hash && <Button appearance='primary' onClick={downloadFile}>Скачать</Button>}
						{file_hash && <Button appearance='primary' onClick={() => btnOperationClick("+")}>+</Button>}
						{file_hash && <Button appearance='primary' onClick={() => btnOperationClick("-")}>-</Button>}
						{file_hash && <Button appearance='primary' onClick={() => btnOperationClick("*")}>*</Button>}
					</div>
					{modalActive &&
						<ModalWindow active={modalActive} setActive={setModalActive}>
							<div className={styles.btnsModal}>
								<Button appearance='primary' onClick={openCommon}>Обычное число</Button>
								{comminBtnActive && <Input keyValue={["number", "Число"]} />}
								{isNum(n) && <Button appearance='primary' onClick={calc}>Посчитать</Button>}
								<Button appearance='primary' onClick={openFuzzy}>Нечеткое число</Button>
								{
									fuzzyBtnActive &&
									<div className={styles.KindNumberContent}>
										<Button appearance='primary' onClick={() => click(kindOfNumber, setKindOfNumber)}>Вид числа</Button>
										{kindOfNumber && <Dropdown elems={elems} forWhat={'kind'} />}
										{!kindOfNumber && kind !== "" && <Input keyValue={defType(kind)} />}
									</div>
								}
								{
									fuzzyBtnActive &&
									<FileLoader name={defaultFuzzyLoaderNumberName} i={defaultFuzzyLoaderNumberName} f={defaultFuzzyLoaderNumberName} n="Загрузить" />
								}
								{
									fuzzyBtnActive && fuzzyNumberUnity.data.length !== 0 && numbersFuzz && keyFuzz &&
									<Button appearance='primary' onClick={calc}>Посчитать</Button>
								}
							</div>
						</ModalWindow>
					}
				</Box>
			</div>
		</div>

	);
};