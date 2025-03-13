import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';


export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<a href='https://github.com/Kotya2001/FuzzyOps/tree/main?tab=readme-ov-file' target="_blank">
				О нас
			</a>
			<a href='https://github.com/Kotya2001/FuzzyOps/tree/main?tab=readme-ov-file' target="_blank">
				Ресурсы
			</a>
			<a href='https://github.com/Kotya2001/FuzzyOps/tree/main?tab=readme-ov-file' target="_blank">
				GitHub
			</a>
		</footer>
	);
};