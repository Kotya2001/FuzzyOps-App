import {makeAutoObservable} from "mobx";

export class FuzzyLogicStore {
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

    setFileData(data) {
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

export class FuzzyNumberOps {
    constructor(){
        this._newNumber = {}
        this._isData = false
        this._File = {}
        makeAutoObservable(this)
    }

    setNewNumber(data) {
        this._newNumber = data
    }

    setIsData(bool) {
        this._isData = bool
    }

    setFileData(data) {
        this._File = data
    }

    get Number() {
        return this._newNumber
    }

    get Flag() {
        return this._isData
    }

    get File() {
        return this._File
    }
}