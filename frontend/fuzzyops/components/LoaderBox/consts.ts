export const defaultFuzzyLoaderNumberName = "createUnityFuzz";
export const defaultFuzzyNumber = "getFuzzyNumber";
export const defaultFuzzyNumberOps = "FuzzyNumberOps";
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