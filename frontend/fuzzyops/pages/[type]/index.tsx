import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import { allMenus } from '../../helpers/consts';



function Type({ firstCategory }: TypeProps): JSX.Element {
	return (
		<>
			{firstCategory}
		</>
	);
}


export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map(m => '/' + m.route),
		fallback: false
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

	if (!params) {
		return {
			notFound: true
		};
	}
	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);

	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}
	
	const menu = allMenus[firstCategoryItem.id];

	return {
		props: {
			menu,
			firstCategory: firstCategoryItem.id
		}
	};
	
};

export interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}