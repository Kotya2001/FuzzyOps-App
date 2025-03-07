
import { FuzzyLogicCreate } from '../blocks/FuzzyEntityComponents/FuzzyLogicCreate';
import { FuzzyLogicRes } from '../blocks/FuzzyEntityComponents/FuzzyLogicRes';
import { withLayout } from '../layout/Layout';



const FuzzyLogic = () => {

	return (
		<div>
			<FuzzyLogicCreate header='Нечетая логика' tag='h1' />;
			<FuzzyLogicRes header='Полученные данные' tag='h1' />
		</div>
	);
};

export default withLayout(FuzzyLogic);