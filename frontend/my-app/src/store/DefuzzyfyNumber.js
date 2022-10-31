import {makeAutoObservable} from "mobx";

export default class DefuzzyfyNumber {
    constructor() {
        this._DefuzzufyFile = {}
        this._isData = false
        // thiz._Number = {}
    }

    setDefuzFile(data) {
        this._DefuzzufyFile = data
    }

    setIsData(bool) {
        this._isData = bool
    }

    get Flag() {
        return this._isData
    }

    get File() {
        return this._DefuzzufyFile
    }
}
