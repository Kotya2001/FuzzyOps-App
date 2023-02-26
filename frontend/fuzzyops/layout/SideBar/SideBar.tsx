import { SideBarProps } from './SideBar.props';
import  styles  from './SideBar.module.css';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import { Htag } from '../../components';


export const SideBar = ({ className, ...props }: SideBarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Htag tag='h1' className={styles.logo}>FuzzyOps</Htag>
			<Menu/>
		</div>
	);
};