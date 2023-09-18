import { $host } from "./index";

export const fuzzyGraphCreate = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyGraph/create', uploadedFile);
	return response;
};

export const shortestPath = async(uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyGraph/shortestPath/Get', uploadedFile);
	return response;
};

export const chechDominating = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyGraph/Dominating/check', uploadedFile);
	return response;
};

export const getClusters = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyGraph/Cluster/Get', uploadedFile);
	return response;
};

export const getAssignment = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyGraph/Assignment/Get', uploadedFile);
	return response;
};