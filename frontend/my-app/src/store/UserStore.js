import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setUser(data) {
        this._user = data
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    get userData() {
        return this._user
    }

    get isAuth() {
        return this._isAuth
    }
}