import DataStore from './DataStore';
import {isDefined} from '../../utils/utils'


export const SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

export function createIndices(size) {
    const indices = [];
    for (let index = 0; index < size; index++) {
        indices.push(index)
    }
    return indices
}

export const objectMatches = (data, filter) => {
    let matches = true;
    for (let key in filter) {
        if (filter.hasOwnProperty(key)) {
            const matcher = isDefined(filter[key]) ? `${filter[key]}`.toLowerCase() : filter[key];
            if (matcher && matcher.length > 0) {
                const value = isDefined(data[key]) ? `${data[key]}`.toLowerCase() : data[key];
                if (!value || value.indexOf(matcher) === -1)
                    matches = false;
            }
        }
    }
    return matches;
};

export const sortData = (dataStore, columnKey, sortDir) => {
    const sortIndexes = dataStore.getIndexMap();
    sortIndexes.sort((indexA, indexB) => {
        const valueA = dataStore.getRawAt(indexA)[columnKey];
        const valueB = dataStore.getRawAt(indexB)[columnKey];
        let sortVal = 0;
        if (valueA > valueB) {
            sortVal = 1;
        }
        if (valueA < valueB) {
            sortVal = -1;
        }
        if (sortVal !== 0 && sortDir === SortTypes.ASC) {
            sortVal = sortVal * -1;
        }
        return sortVal;
    });
    return new DataStore(dataStore.getRawData(), sortIndexes);
};

export const filterData = (dataStore, filter) => {
    dataStore.resetStore();
    const size = dataStore.getSize();
    const filteredIndexes = [];
    for (let index = 0; index < size; index++) {
        const obj = dataStore.getObjectAt(index);
        if (objectMatches(obj, filter)) {
            filteredIndexes.push(index);
        }
    }
    return new DataStore(dataStore.getRawData(), filteredIndexes);
};