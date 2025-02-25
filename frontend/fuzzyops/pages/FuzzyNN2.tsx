import { FuzzyMetaOptLoader } from '../blocks/FuzzyEntityComponents/FuzzyMetaOptLoader';
import { FuzzyMetaOptResult } from '../blocks/FuzzyEntityComponents/FuzzyMetaOptResult';
import { withLayout } from '../layout/Layout';



const FuzzyNN2 = () => {

	return <div>
		<FuzzyMetaOptLoader header='Параметры для обучения' tag='h1' />;
		<FuzzyMetaOptResult header='Результат' tag='h1' />
	</div>;
};

export default withLayout(FuzzyNN2);