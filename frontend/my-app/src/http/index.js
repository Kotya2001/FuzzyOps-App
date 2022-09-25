import axios from "axios";

const $host = axios.create({
    baseURL: "http://localhost:5000"
})

const $authHost = axios.create({
    baseURL: "http://localhost:5000"
})

export {
    $host,
    $authHost
}