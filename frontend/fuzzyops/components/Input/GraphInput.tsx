import { useState } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import { store } from '../../redux/store';
import { setPath, setSet, setNclusters } from '../../redux/reducers/ResultReducers/FuzzyGraphAlgsSlice';



export const GraphInput = ({ keyValue }: InputProps): JSX.Element => {

	const dispatch = store.dispatch;

	const key = keyValue[0];
	const value = keyValue[1];

	const [data, setData] = useState("");
	// const [path, setPathState] = useState("");
	// const [cluster, setClustersState] = useState("");
	// const [dominating, setClustersState] = useState("");

	const Create = () => {
		const re = /^[0-9\s]*$/;
		if (re.test(e.target.value)) {
			setData(e.target.value);
			if (key == "path") {
				dispatch(setPath(data));
			} else if (key == "dominating") {
				dispatch(setSet(data));
			} else if (key == "cluster") {
				if (data.length > 1) {
					alert("Введите только 1 число");
					return;
				}
				dispatch(setNclusters(data));
			}
		}
	}

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