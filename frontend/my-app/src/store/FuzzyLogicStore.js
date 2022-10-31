import {makeAutoObservable} from "mobx";

export default class FuzzyLogicStore {
    constructor() {
        this._FuzzyNumber = {}
        this._isData = false
        this._FuzzyNumberFile = {}
        makeAutoObservable(this)
    }

    setFuzzyNumber(data) {
        this._FuzzyNumber = data
    }

    setIsData(bool) {
        this._isData = bool
    }

    setFuzzyNumberFile(data) {
        this._FuzzyNumberFile = data
    }

    get Number() {
        return this._FuzzyNumber
    }

    get Flag() {
        return this._isData
    }

    get FuzzyNumberFile() {
        return this._FuzzyNumberFile
    }
}