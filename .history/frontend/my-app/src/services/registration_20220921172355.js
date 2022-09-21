import $api from '../http/index.js';


export default class Registration {
    static async registration(email, password) {
        return $api.post('/registration', {email, password})
    }
}