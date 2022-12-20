import {makeAutoObservable} from "mobx";

export class FuzzyLogFileStore {
    constructor() {
        this._data = {}
        this._numbers = ""
        this._key = ""
        makeAutoObservable(this)
    }

    setFileData(data) {
        this._data = data
    }
    
    setUnity(data, key) {
        this._numbers = data
        this._key = key
    }

    get All() {
        if (this._key === 'trap') {
            const all_data = {data: this._data, trap: this._numbers}
            return all_data
        } else {
            const all_data = {data: this._data, triangle: this._numbers}
            return all_data
        }
    }

    get Nums() {
        return this._numbers
    }
}

export class DeffuzzyLogicStore {
    constructor() {
        this._data = {}
        this._numbers = ""
        this._key = ""
        this._by = ""
        makeAutoObservable(this)
    }

    setFileData(data) {
        this._data = data
    }
    
    setUnity(data, key) {
        this._numbers = data
        this._key = key
    }

    setBy(by) {
        this._by = by
    }

    get All() {
        if (this._key === 'trap') {
            const all_data = {data: this._data, trap: this._numbers,
                 by: this._by}
            return all_data
        } else {
            const all_data = {data: this._data, triangle: this._numbers,
                by: this._by}
            return all_data
        }
    }

    get Nums() {
        return this._numbers
    }
}