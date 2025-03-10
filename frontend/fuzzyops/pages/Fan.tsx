import { FanGet } from '../blocks/FuzzyEntityComponents/FanGet';
import { FanLoad } from '../blocks/FuzzyEntityComponents/FanLoad';
import { withLayout } from '../layout/Layout';



const Fan = () => {

	return <div>
		<FanLoad header='Данные для нечеткой аналитической сети' tag='h1' />;
		<FanGet header='Результат' tag='h1' />
	</div>;
};

export default withLayout(Fan);