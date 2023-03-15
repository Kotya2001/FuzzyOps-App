
import { setKeyFuzz, setNumbersFuzz } from '../../redux/reducers/FileReducers/CreateKindSlice';
import { setFuzzyNumberUnity } from '../../redux/reducers/FileReducers/CreateUnitySlice';
import { setLingVar } from '../../redux/reducers/MethodsSlice';
import { store } from '../../redux/store';
import { Button } from '../Button/Button';
import { defaultFuzzyLoaderNumberName } from '../../blocks/LoaderBox/consts';
import { DownloaderProps } from './Downloader.props';


export const Downloader = ({ file, forWhat }: DownloaderProps) => {

	const dispatch = store.dispatch;

	const createBlob = () => {
		const str = JSON.stringify(file);
		const blob = new Blob([str]);
		return blob;
	};

	const click = async () => {
		const blob = createBlob();
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = 'data.json';
		document.body.append(anchor);
		anchor.click();
		anchor.remove();

		switch (forWhat) {
			case (defaultFuzzyLoaderNumberName):
				dispatch(setFuzzyNumberUnity([]));
				dispatch(setKeyFuzz(""));
				dispatch(setNumbersFuzz(""));
				dispatch(setLingVar(""));
		}

	};

	return (
		<Button appearance='primary' onClick={click}>Скачать</Button>
	);

};