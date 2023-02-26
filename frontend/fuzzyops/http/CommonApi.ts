import { $host } from "./index";

export const getFile = async (hash_url: string) => {
	const response = await $host.get(`/main/download_file/${hash_url}`);
	return response;
};