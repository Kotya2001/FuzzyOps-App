import { $host } from "./index";

export const fuzzynumber = async (uploadedFile) => {
    const response = await $host.post('/main/fuzzyLog/GetNumber', uploadedFile)
    return response
}

export const defnumber = async (uploadedFile) => {
    const response = await $host.post('/main/fuzzyLog/Defuzzyfy', uploadedFile)
    return response
}

export const opsfuzzynumber = async (uploadedFile) => {
    const response = await $host.post('/main/fuzzyLog/NumOps', uploadedFile)
    return response
}