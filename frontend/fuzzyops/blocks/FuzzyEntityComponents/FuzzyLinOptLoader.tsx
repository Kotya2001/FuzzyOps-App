import { Box } from '../../components/Box/Box';
import { Htag } from '../../components/Htag/Htag';
import styles from './FuzzyEntityComponents.module.css';
import { FuzzyProps } from './FuzzyEntityComponents.props';
import cn from 'classnames';
import { ExelFileLoader } from '../../components/ExelFileLoader/ExelFileLoader';
import { defaultFuzzyLinearOptName } from './consts';
import { useState } from 'react';




export const FuzzyLinOptLoader = ({ header, tag }: FuzzyProps) => {

	const [loadData, setLoadData] = useState(false);

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
							<ExelFileLoader name={defaultFuzzyLinearOptName} i={defaultFuzzyLinearOptName} f={defaultFuzzyLinearOptName} n="Загрузить" />
						</div>
						:
						<div className={styles.LoadContent}>
							<div className={styles.Prompt}>
								<p className={styles.Par}>Загрузите файл .csv</p>
							</div>
						</div>
					}
				</Box>
			</div>
		</div>
	);
};