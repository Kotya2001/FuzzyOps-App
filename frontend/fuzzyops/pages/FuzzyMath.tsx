import { FuzzyNumber } from '../blocks/FuzzyEntityComponents/FuzzyNumber';
import { FuzzuNumberLoader } from '../blocks/FuzzyEntityComponents/FuzzyNumberLoader';
import { withLayout } from '../layout/Layout';



const FuzzyMath = () => {

	return <div>
		<FuzzuNumberLoader header='Нечеткое число' tag='h1' />;
		<FuzzyNumber header='Вычисление нечеткого числа' tag='h1' />;
	</div>;
};

export default withLayout(FuzzyMath);