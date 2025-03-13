import { useState } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';




export const GraphInput = ({ keyValue }: InputProps): JSX.Element => {


	const key = keyValue[0];
	const value = keyValue[1];

	const [data, setData] = useState("");

	const dataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

		const re = /^[0-9\s]*$/;
		if (re.test(e.target.value)) {
			setData(e.target.value);
		}
	};

	return (
		<form onSubmit={e => e.preventDefault()} className={styles.formStyle}>
			<input value={data} maxLength={10000000000} placeholder={value} name={key} onChange={e => dataHandler(e)}
				className={styles.inputStyle} />
		</form>
	);
};