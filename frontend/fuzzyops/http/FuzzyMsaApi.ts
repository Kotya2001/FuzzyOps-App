import { $host } from "./index";

export const fuzzyMsaCalc = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyMsa/calc', uploadedFile);
	return response;
};