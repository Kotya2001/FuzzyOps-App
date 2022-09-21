import axios from 'axios';

export const API_URL = 'http'

const $api = axios.create({
    withCredentials: true,

})