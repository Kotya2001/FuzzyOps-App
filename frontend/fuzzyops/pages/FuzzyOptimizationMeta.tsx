import { FuzzyMetaOptLoader } from '../blocks/FuzzyEntityComponents/FuzzyMetaOptLoader';
import { FuzzyMetaOptResult } from '../blocks/FuzzyEntityComponents/FuzzyMetaOptResult';
import { withLayout } from '../layout/Layout';



const FuzzyOptimizationMeta = () => {

	return <div>
		<FuzzyMetaOptLoader header='Параметры алгоритма муравьиных колоний' tag='h1' />;
		<FuzzyMetaOptResult header='Результат' tag='h1'/>
	</div>;
};

export default withLayout(FuzzyOptimizationMeta);