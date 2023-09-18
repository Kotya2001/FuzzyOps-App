
import { FuzzyGraphAlgs } from '../blocks/FuzzyEntityComponents/FuzzyGraphAlgs';
import { FuzzyGraphCreate } from '../blocks/FuzzyEntityComponents/FuzzyGraphCreate';
import { withLayout } from '../layout/Layout';



const FuzzyGraphs = () => {

	return (
		<div>
			<FuzzyGraphCreate header='Нечеткие графы' tag='h1' />;
			<FuzzyGraphAlgs header='Информация о нечетком графе' tag='h1'/>
		</div>
	);
};

export default withLayout(FuzzyGraphs);