import { FuzzyNN2Create } from '../blocks/FuzzyEntityComponents/FuzzyNN2Create';
import { FuzzyNN2Get } from '../blocks/FuzzyEntityComponents/FuzzyNN2Get';
import { withLayout } from '../layout/Layout';



const FuzzyNN2 = () => {

	return <div>
		<FuzzyNN2Create header='Параметры для обучения' tag='h1' />;
		<FuzzyNN2Get header='Результат' tag='h1' />
	</div>;
};

export default withLayout(FuzzyNN2);