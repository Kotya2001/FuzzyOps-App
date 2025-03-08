import { FuzzyNN1Create } from '../blocks/FuzzyEntityComponents/FuzzyNN1Create';
import { FuzzyNN1Get } from '../blocks/FuzzyEntityComponents/FuzzyNN1Get';
import { withLayout } from '../layout/Layout';



const FuzzyNN = () => {

	return <div>
		<FuzzyNN1Create header='Параметры для обучения' tag='h1' />
		<FuzzyNN1Get header='Результат' tag='h1' />
	</div>;
};

export default withLayout(FuzzyNN);