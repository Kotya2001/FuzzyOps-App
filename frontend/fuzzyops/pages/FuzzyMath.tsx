import { FuzzyNumber } from '../blocks/LoaderBox/FuzzyNumber';
import { LoaderBox } from '../blocks/LoaderBox/LoaderBox';
import { withLayout } from '../layout/Layout';



const FuzzyMath = () => {

	return <div>
		<LoaderBox header='Нечеткое число' tag='h1' />;
		<FuzzyNumber header='Вычисление нечеткого числа' tag='h1' />;
	</div>;
};

export default withLayout(FuzzyMath);