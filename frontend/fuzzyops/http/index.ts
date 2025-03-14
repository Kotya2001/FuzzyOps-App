import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const $host = axios.create({
    withCredentials: true,
    baseURL: backendUrl
});