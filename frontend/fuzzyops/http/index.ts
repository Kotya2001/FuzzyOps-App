import axios from "axios";

export const $host = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000"
});