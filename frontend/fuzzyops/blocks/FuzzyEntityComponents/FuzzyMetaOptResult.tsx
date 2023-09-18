
import { FuzzyProps } from './FuzzyEntityComponents.props';
import { Box } from '../../components/Box/Box';
import { Htag } from '../../components/Htag/Htag';
import styles from './FuzzyEntityComponents.module.css';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { Button } from '../../components/Button/Button';
import { fuzzymetaopt } from '../../http/FuzzyMetaOptApi';
import { setTheta, setStatus } from '../../redux/reducers/ResultReducers/FuzzuMetaOptResultSlice';
import { Downloader } from '../../components/Downloader/Downloader';
import { defaultFuzzyMetaOptName } from './consts';


export const FuzzyMetaOptResult = ({ header, tag }: FuzzyProps) => {

	const dispatch = store.dispatch;
	const { csvX, params } = useAppSelector(state => state.MetaOptReducer);
	const { theta, status } = useAppSelector(state => state.MetaOptResultReducer);


	const calc = async (data: object) => {
		const response = await fuzzymetaopt({data});
		if (response.data.status == 200) {
			const data = response.data.data;
			dispatch(setTheta(data.theta));
			dispatch(setStatus(true));
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

						<div className={styles.LoadContent}>
	
							{csvX && params && <Button appearance='primary' onClick={() => calc({params: params, X: csvX})}>Посчитать</Button>}
							{status && <Downloader file={{ theta: theta }} 
								forWhat={defaultFuzzyMetaOptName}/>}

						</div>
					</div>

				</Box>
			</div>
		</div>
	);
};