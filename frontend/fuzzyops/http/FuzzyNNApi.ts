import { $host } from "./index";

export const fuzzynn = async (data: object, csvData: string) => {
	const formData = new FormData();
	formData.append('csvFile', new Blob([csvData], { type: 'text/csv' }), 'data.csv');
	const jsonPayload = JSON.stringify(data);
	formData.append('jsonData', new Blob([jsonPayload], { type: 'application/json' }));

	const response = await $host.post('/main/fuzzyNN/train', formData, {
		headers: {
			'Content-Type': 'multipart/form-data' // Указываем, что передаем форму
		}
	});
	return response;
};

export const fuzzynnGet = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyNN/get', uploadedFile);
	return response;
};

export const fuzzynn2 = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyNN2/calc', uploadedFile);
	return response;
};

export const fuzzypred = async (uploadedFile: object) => {
	const response = await $host.post('/main/fuzzyPred/calc', uploadedFile);
	return response;
};

export const fanhandler = async (uploadedFile: object) => {
	const response = await $host.post('/main/fan/calc', uploadedFile);
	return response;
};