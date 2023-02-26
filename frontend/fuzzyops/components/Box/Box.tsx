import  styles  from './Box.module.css';
import cn from 'classnames';
import { BoxProps } from './Box.props';


export const Box = ({ color='white', children, className, ...props }: BoxProps): JSX.Element => {
	return (
		<div className={cn(styles.box, className, {
			[styles.blue]: color == 'blue',
		})}
		{...props}>
		{children}
		</div>
	);
};