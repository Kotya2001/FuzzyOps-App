import { ModalWindowProps } from './ModalWindow.props';
import styles from "./ModalWindow.module.css";


export const ModalWindow = ({ active, setActive, children }: ModalWindowProps) => {
	return (
		<div className={active ? styles.modal + ` ` + styles.active : styles.modal} onClick={() => setActive(false)}>
			<div className={active ? styles.modal__content + ` ` + styles.act : styles.modal__content} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};
