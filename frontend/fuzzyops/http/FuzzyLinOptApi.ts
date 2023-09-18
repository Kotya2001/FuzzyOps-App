import { $host } from "./index";

export const fuzzylinopt = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyLinOpt/GetRes', uploadedFile);
	return response;
};