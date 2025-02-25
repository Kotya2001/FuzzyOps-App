import { withLayout } from '../layout/Layout';
import { FuzzyMSALoader } from '../blocks/FuzzyEntityComponents/FuzzyMSALoader';
import { FuzzyMSAResult } from '../blocks/FuzzyEntityComponents/FuzzyMSAResult';



const FuzzyMSA = () => {

	return <div>
		<FuzzyMSALoader header='Загрузка данных' tag='h1' />
		<FuzzyMSAResult header='Результат' tag='h1' />
	</div>;
};

export default withLayout(FuzzyMSA);