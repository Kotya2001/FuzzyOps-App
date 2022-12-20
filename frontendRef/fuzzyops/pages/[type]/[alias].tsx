import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import { PageComponent } from '../../page-components';
import { allMenus } from '../../helpers/consts';


function Page({ firstCategory }: PageProps): JSX.Element {
	
	return <PageComponent firstCategory={firstCategory}/>;
}


export default withLayout(Page);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const m of firstLevelMenu) {

		const menu: MenuItem[] = allMenus[m.id];
		paths = paths.concat(menu.flatMap(s => Array.from(s.pages).map(p => `/${m.route}/${p.alias}`)));
	}
	return {
		paths,
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

	try {
		const menu = allMenus[firstCategoryItem.id];

		if (menu.length == 0) {
			return {
				notFound: true
			};
		}
		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id
			}
		};
		
	} catch {
		return {
			notFound: true
		};
	}
};

export interface PageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}