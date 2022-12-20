import {makeAutoObservable} from "mobx";

export default class DefuzzyfyNumber {
    constructor() {
        this._DefuzzufyFile = {}
        this._isData = false
        this._Number = {}
        makeAutoObservable(this)
    }

    setFileData(data) {
        this._DefuzzufyFile = data
    }

    setIsData(bool) {
        this._isData = bool
    }

    setDefNumber(data) {
        this._Number = data
    }
    get Flag() {
        return this._isData
    }

    get DefuzzufyNumberFile() {
        return this._DefuzzufyFile
    }

    get DefNumber() {
        return this._Number
    }
}
