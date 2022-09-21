import Registration from '../services/registration';
import {makeAutoObservable} from 'mobx';
import Redirect from 'reac'

export default class Store {

    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async registration(email, password) {
        try {
            const response = await Registration.registration(email, password);
            if (response.data.msg === 'ok') {

            }
        }
    }
}