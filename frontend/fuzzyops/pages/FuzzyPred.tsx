import { FuzzyPredGet } from '../blocks/FuzzyEntityComponents/FuzzyPredGet';
import { FuzzyPredLoad } from '../blocks/FuzzyEntityComponents/FuzzyPredLoad';
import { withLayout } from '../layout/Layout';



const FuzzyPred = () => {

	return <div>
		<FuzzyPredLoad header='Данные для нечеткой регрессии' tag='h1' />;
		<FuzzyPredGet header='Результат' tag='h1' />
	</div>;
};

export default withLayout(FuzzyPred);