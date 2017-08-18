import {createIndices} from './ops'

export default class DataStore {
    constructor(dataArray, indexMap) {
        this._dataArray = [...dataArray];
        if (indexMap)
            this._indexMap = [...indexMap];
        else
            this._indexMap = createIndices(dataArray.length);
    }

    getSize() {
        return this._indexMap.length;
    }

    getObjectAt(index) {
        return this._dataArray[this._indexMap[index]];
    }

    getRawAt(index){
        return this._dataArray[index];
    }

    getAll() {
        const result = [];
        for (let x = 0; x < this._indexMap.length; x++) {
            result.push(this.getObjectAt(x));
        }
        return result;
    }

    getRawData() {
        return this._dataArray;
    }

    getIndexMap() {
        return this._indexMap;
    }

    resetStore(){
        this._indexMap = createIndices(this._dataArray.length);
    }
}