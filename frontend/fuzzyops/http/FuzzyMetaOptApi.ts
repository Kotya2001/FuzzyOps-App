import { $host } from "./index";

export const fuzzymetaopt = async (data: object, csvData: string) => {
	const formData = new FormData();
	formData.append('csvFile', new Blob([csvData], { type: 'text/csv' }), 'data.csv');
	const jsonPayload = JSON.stringify(data);
	formData.append('jsonData', new Blob([jsonPayload], { type: 'application/json' }));

	console.log(data, csvData);
	const response = await $host.post('/main/fuzzyMetaevOpt/calc', formData, {
		headers: {
			'Content-Type': 'multipart/form-data' // Указываем, что передаем форму
		}
	});
	return response;
};