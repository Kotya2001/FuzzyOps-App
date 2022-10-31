import axios from "axios";

const $host = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000"
})

export {$host}