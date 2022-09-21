import axios from 'axios';

export const API_URL = 'http://local'

const $api = axios.create({
    withCredentials: true,

})