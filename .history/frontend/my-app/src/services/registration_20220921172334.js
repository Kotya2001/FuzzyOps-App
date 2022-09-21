import $api from './http/i';


export default class Registration {
    static async registration(email, password) {
        return $api.post('/registration', {email, password})
    }
}