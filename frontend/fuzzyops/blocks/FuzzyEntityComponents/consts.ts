export const defaultFuzzyLoaderNumberName = "createUnityFuzz";
export const defaultFuzzyNumber = "getFuzzyNumber";
export const defaultFuzzyNumberOps = "FuzzyNumberOps";
export const defaultFuzzyGraphCreate = "createGraph";
export const defaultFuzzyLinearOptName = "LinearOpt";
export const defaultFuzzyMetaOptName = "MetaOpt";
export const defaultFuzzyMetaOptNameCSV = "MetaOptCSV";
export const defaultGraphAssignment = "GraphAssignment";
export const defaultFuzzyMSA = "createMSA";
export const defaultFuzzyCluster = "fuzzyCluster";
export const defaultFuzzyClusterCsv = "fuzzyClusterCsv";
export const defaultFuzzyClusterCsvTest = "fuzzyClusterCsvTest";
export const defaultFuzzyLogicData = "defaultFuzzyLogicData";
export const defaultFuzzyNN1 = "defaultFuzzyNN1";
export const defaultFuzzyNN1Csv = "defaultFuzzyNN1Csv";
export const defaultFuzzyNNInp = "defaultFuzzyNNInp";
export const defaultFuzzyNN2 = "defaultFuzzyNN2";
export const defaultFpred = "defaultFpred";
export const defaultFan = "defaultFan";

export const paginationParams = { currentPage: 0, points: 75 };

export const defType = (selected: string) => {
	let key, value;
	if (selected === "Треугольный вид") {
		key = "triangular";
		value = "a <= b <= c";
	} else if (selected === "Трапецеидальный вид") {
		key = "trapezoidal";
		value = "a <= b <= c <= d";
	} else if (selected === "Гауссовский вид") {
		key = "gauss";
		value = "sigma mean";
	} else if (selected === "name") {
		key = "name";
		value = "(Давление)";
	} else if (selected === "ling") {
		key = "ling";
		value = "(Большое)";
	} else {
		key = "";
		value = "";
	}
	return [key, value];
};

export const elems = ["Треугольный вид", "Трапецеидальный вид", "Гауссовский вид"];
export const example = JSON.stringify([1, 10, 20], null, 4);
export const edge_type = ["Неориентированный", "Ориентированный"];
export const edge_number_math_type = ["Максимум", "Минимум", "Среднее", "Сумма"];
export const equals_type = ["Базовый", "Максимум", "Минимум"];
export const task_type = ["Граница Паретто", "Взвешенная сумма"];