import { FirstLevelMenuItem } from '../interfaces/menu.interface';


export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'FuzzyMath', name: 'Нечеткие числа', id: 0 },
	{ route: 'FuzzyGraphs', name: 'Нечеткие графы', id: 1 },
	{ route: "FuzzyLogic", name: 'Нечеткая логика', id: 2 },
	{ route: 'FuzzyOptimization', name: 'Нечеткая оптимизация (линейная)', id: 3 },
	{ route: 'FuzzyOptimizationMeta', name: 'Нечеткая оптимизация (метаэв.)', id: 4 },
	{ route: 'FuzzyNN', name: 'Нечеткие сети', id: 5 },
	{ route: 'FuzzyNN2', name: 'Нечеткие сети (алг. 2)', id: 6 },
	{ route: 'FuzzyMSA', name: 'Методы Многокритериального анализа', id: 7 },
	// { route: 'FuzzyCluster', name: 'Нечеткая кластеризация', id: 8 }
];