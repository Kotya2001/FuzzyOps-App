
import { FuzzyProps } from './FuzzyEntityComponents.props';
import { Box } from '../../components/Box/Box';
import { Htag } from '../../components/Htag/Htag';
import styles from './FuzzyEntityComponents.module.css';
import { store } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';





export const FuzzyMSAResult = ({ header, tag }: FuzzyProps) => {

	// const dispatch = store.dispatch;
	const { result } = useAppSelector(state => state.CreateMSAReducer);


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
							{result}
						</div>
					</div>

				</Box>
			</div>
		</div>
	);
};