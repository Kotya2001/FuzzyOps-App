

import { useRouter } from 'next/router';
import { FuzzyNumber } from '../../components/LoaderBox/FuzzyNumber';
import { LoaderBox } from '../../components/LoaderBox/LoaderBox';
import { PageComponentProps } from './PageComponent.props';



export const PageComponent = ({ firstCategory }: PageComponentProps): JSX.Element => {
	const router = useRouter();


	switch (router.asPath.split('/')[2]) {
		case 'ForFuzzyLogic':
			return <LoaderBox header='Нечеткое число' tag='h1' />;
		case 'FuzzyNumber':
			return <FuzzyNumber header='Вычисление нечеткого числа' tag='h1'/>;
		default:
			return <></>;
	}
};