import { $host } from "./index";

export const fuzzyCluster = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyCluster/calc', uploadedFile, {
		responseType: 'blob'
	});
	return response;
};