import { $host } from "./index";

export const fuzzynumberOps = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyLog/fuzzyOps', uploadedFile);
	return response;
};