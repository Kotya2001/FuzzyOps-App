import { $host } from "./index";

export const fuzzynumber = async (uploadedFile) => {
    const response = await $host.post('/main/fuzzyLog/GetNumber', uploadedFile)
    return response
}