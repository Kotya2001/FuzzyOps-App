

import { FuzzyClusterLoader } from '../blocks/FuzzyEntityComponents/FuzzyClusterLoader';
import { withLayout } from '../layout/Layout';

const FuzzyCluster = () => {

	return (
		<div>
			<FuzzyClusterLoader header='Нечеткие графы' tag='h1' />;
			{/* <FuzzyGraphAlgs header='Информация о нечетком графе' tag='h1' /> */}
		</div>
	);
};

export default withLayout(FuzzyCluster);