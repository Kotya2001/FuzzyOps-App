import { $host } from "./index";

export const registration = async (email, password) => {
    const response = await $host.post('/registration', {email, password})
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('/login', {email, password})
    return response
}

export const downloadFile = async (data) => {
    const response = await $host.post('downLoadFile', {data})
    return response
}
