import { LoaderBoxProps } from './LoaderBox.props';
import cn from 'classnames';
import styles from './LoaderBox.module.css';
import { Htag } from '../Htag/Htag';
import { Box } from '../Box/Box';
import { FileLoader } from '../FileLoader/FileLoader';
import { defaultFuzzyNumber, paginationParams } from './consts';
import { Button } from '../Button/Button';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { fuzzynumber } from '../../http/FuzzyLogicApi';
import { setFuzzyNumberResult, setAllPages, setParams } from '../../redux/reducers/ResultReducers/FuzzyNumberResultSlice';
import { Plot } from '../Plot/Plot';
import { useState } from 'react';




export const FuzzyNumber = ({ header, tag }: LoaderBoxProps) => {

	const dispatch = store.dispatch;
	const { fuzzyNumber } = useAppSelector(state => state.CreateFuzzyNumberReducer);
	const { result, all_pages, params } = useAppSelector(state => state.FuzzyNumberResultReducer);

	const [count, setCount] = useState(0);

	const clickUp = async () => {
		if (count < all_pages - 1) {
			setCount(count + 1);

			const paginationParams = { currentPage: count, points: 100 };
			const formData = {
				fuzzyNumber,
				paginationParams
			};
			const response = await fuzzynumber(formData);
			if (response.data.status === 'ok') {
				const data = {
					result: response.data.result,
					all_pages: response.data.all_pages,
					params: response.data.params
				};
				dispatch(setFuzzyNumberResult(data));
				dispatch(setAllPages(data));
				dispatch(setParams(data));

			} else {
				alert(response.data.msg);
			}
		}
	};

	const clickDown = async () => {
		console.log(count);
		if (count > 0) {
			setCount(count - 1);

			const paginationParams = { currentPage: count, points: 100 };
			const formData = {
				fuzzyNumber,
				paginationParams
			};
			const response = await fuzzynumber(formData);
			if (response.data.status === 'ok') {
				const data = {
					result: response.data.result,
					all_pages: response.data.all_pages,
					params: response.data.params
				};
				dispatch(setFuzzyNumberResult(data));
				dispatch(setAllPages(data));
				dispatch(setParams(data));

			} else {
				alert(response.data.msg);
			}

		}
	};

	const getResult = async () => {

		if (Object.keys(fuzzyNumber).length === 0) {
			alert('Загрузите ваше универсальное множество');
			return;
		}

		const formData = { fuzzyNumber, paginationParams };

		const response = await fuzzynumber(formData);
		if (response.data.status === 'ok') {
			const data = {
				result: response.data.result,
				all_pages: response.data.all_pages,
				params: response.data.params

			};
			dispatch(setFuzzyNumberResult(data));
			dispatch(setAllPages(data));
			dispatch(setParams(data));

		} else {
			alert(response.data.msg);
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
						<Htag tag='h2' className={cn(styles.headerH2)}>Функция принадлежности</Htag>
					</div>

					<div className={styles.LoadContent}>

						<FileLoader name={defaultFuzzyNumber} i={defaultFuzzyNumber} f={defaultFuzzyNumber} n="Загрузить" />

					</div>

					<div className={styles.LoadContent}>
						<Button appearance='primary' onClick={getResult}>Получить</Button>
					</div>

					<div>
						{Object.keys(result).length !== 0 && <Plot result={result} all_pages={all_pages} params={params} />}
					</div>
					<div className={styles.btns}>
						<Button appearance='primary' onClick={clickDown}>Назад</Button>
						<Button appearance='primary' onClick={clickUp}>Вперед</Button>
					</div>
				</Box>
			</div>
		</div>

	);
};