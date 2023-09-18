import { $host } from "./index";

export const fuzzymetaopt = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyMetaOpt/GetRes', uploadedFile);
	return response;
};