import { Box } from '../../components/Box/Box';
import { Htag } from '../../components/Htag/Htag';
import styles from './FuzzyEntityComponents.module.css';
import { FuzzyProps } from './FuzzyEntityComponents.props';
import cn from 'classnames';
import { defaultFuzzyNN2 } from './consts';
import { useState } from 'react';
import { FileLoaderMeta } from '../../components/FileLoaderMeta/FileLoaderMeta';





export const FuzzyNN2Create = ({ header, tag }: FuzzyProps) => {

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
							<FileLoaderMeta name={defaultFuzzyNN2} i={defaultFuzzyNN2} f={defaultFuzzyNN2} n="Загрузить json" />
						</div>

						:
						<div className={styles.LoadContent}>
							<div className={styles.Prompt}>
								<p className={styles.Par}>Загрузите данные .json</p>
							</div>
						</div>
					}
				</Box>
			</div>
		</div>
	);
};