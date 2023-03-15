import styles from './Menu.module.css';
import cn from 'classnames';

import Link from 'next/link';
import { firstLevelMenu } from '../../helpers/helpers';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';







export const Menu = (): JSX.Element => {

	const { firstCategory } = useContext(AppContext);





	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(m => (
					<div key={m.route}>
						<Link href={`/${m.route}`} legacyBehavior>
	
							<a>
								<div className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id == firstCategory
								})}>
									<span >{m.name}</span>
								</div>
							</a>

						</Link>
					</div>
				))}
			</>
		);
	};

	return (
		<div className={styles.menu}>
			{buildFirstLevel()}
		</div>
	);
};