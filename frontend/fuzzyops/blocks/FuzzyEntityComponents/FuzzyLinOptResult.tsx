
import { FuzzyProps } from './FuzzyEntityComponents.props';
import { Box } from '../../components/Box/Box';
import { Htag } from '../../components/Htag/Htag';
import styles from './FuzzyEntityComponents.module.css';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { Button } from '../../components/Button/Button';
import { fuzzylinopt } from '../../http/FuzzyLinOptApi';
import { setInteractionCoefs, setInteractions, setAlphas, setStatus } from '../../redux/reducers/ResultReducers/FuzzuLinOptResult';
import { Downloader } from '../../components/Downloader/Downloader';
import { defaultFuzzyLinearOptName } from './consts';


export const FuzzyLinOptResult = ({ header, tag }: FuzzyProps) => {

	const dispatch = store.dispatch;
	const { csvData } = useAppSelector(state => state.LinearOptReducer);
	const { status, interactions, interaction_coefs, alphas } = useAppSelector(state => state.LinOptResultReducer)


	const calc = async (data: string) => {
		const response = await fuzzylinopt({data});
		if (response.data.status == 200) {
			const data = response.data.data;
			dispatch(setInteractionCoefs(data.interaction_coefs));
			dispatch(setInteractions(data.interactions));
			dispatch(setAlphas(data.alphas));
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
	
							{csvData && <Button appearance='primary' onClick={() => calc(csvData)}>Посчитать</Button>}
							{status && <Downloader file={{ alphas: alphas, interaction_coefs: interaction_coefs, interactions: interactions }} 
							forWhat={defaultFuzzyLinearOptName}/>}

						</div>
					</div>

				</Box>
			</div>
		</div>
	);
};