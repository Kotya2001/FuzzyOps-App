import { Htag } from '../../components/Htag/Htag';
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';



export const Header = ({ ...props }: HeaderProps): JSX.Element => {
	return (
		<div {...props}>
			<Htag tag='h1' className={styles.logo}>FuzzyOps</Htag>
		</div>
	);
};