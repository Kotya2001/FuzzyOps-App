import { $host } from "./index";

export const fuzzynumber = async (uploadedFile: object) => {
    const response = await $host.post('/main/fuzzyLog/GetNumber', uploadedFile);
    return response;
};