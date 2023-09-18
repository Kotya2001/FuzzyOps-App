import { FuzzyLinOptLoader } from '../blocks/FuzzyEntityComponents/FuzzyLinOptLoader';
import { FuzzyLinOptResult } from '../blocks/FuzzyEntityComponents/FuzzyLinOptResult';
import { withLayout } from '../layout/Layout';



const FuzzyOptimization = () => {

	return <div>
		<FuzzyLinOptLoader header='Нечеткие коэффициенты' tag='h1'/>;
		<FuzzyLinOptResult header='Результат' tag='h1'/>
	</div>;
};

export default withLayout(FuzzyOptimization);