import {makeAutoObservable} from 'mobx';

export default class Store {

    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    se
}