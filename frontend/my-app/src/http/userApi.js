import { $authHost, $host } from "./index";

export const registration = async (email, password) => {
    const response = await $host.post('/registration', {email, password})
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('/login', {email, password})
    return response
}

export const logout = async () => {
    const response = await $host.get('/logout', {})
    return response
}