import {expect} from 'chai'
import DataStore from './DataStore'
import data from "./data.json"
import {filterData, objectMatches, sortData, SortTypes} from './ops'

describe('sortData', () => {
    it('Loads the correct data Array', () => {
        const datStore = new DataStore(data);
        expect(datStore.getSize()).to.be.equal(5);
        const sortedDesc = sortData(datStore, "id", SortTypes.DESC);
        const sortedAsc = sortData(datStore, "id", SortTypes.ASC);
    })
});

describe('filterData', () => {
    it('Loads the correct data Array', () => {
        const datStore = new DataStore(data);
        const filtered1 = filterData(datStore, {id: "0"});
        expect(filtered1.getSize()).to.be.equal(1);

        const filtered2 = filterData(datStore, {firstName: "e"});
        expect(filtered2.getSize()).to.be.equal(4);
    })
});

describe('objectMatches', () => {
    it('Does a proper match of object', () => {
        expect(objectMatches(
            {id: "0"},//data
            {id: "0"}//filter
        )).to.be.equal(true);

        expect(objectMatches(
            {id: 0},//data
            {id: "0"}//filter
        )).to.be.equal(true);

        expect(objectMatches(
            {id: 0, name: "Timothy"},//data
            {id: "0", name: 'tim'}//filter
        )).to.be.equal(true);

        expect(objectMatches(
            {id: 0, name: "Timothy"},//data
            {name: 'tim'}//filter
        )).to.be.equal(true);
    });

    it('Rejects invalid Objects', () => {
        expect(objectMatches(
            {id: "0"},//data
            {id: "1"}//filter
        )).to.be.equal(false);

        expect(objectMatches(
            {id: 0},//data
            {id: "1"}//filter
        )).to.be.equal(false);

        expect(objectMatches(
            {name: "Timothy"},//data
            {id: "0", name: 'tim'}//filter
        )).to.be.equal(false);

        expect(objectMatches(
            {id: 0, name: "Timothy", foo: "Bar"},//data
            {id: "1", name: 'Timothy', foo: "Bar"}//filter
        )).to.be.equal(false);
    })
});


describe('Table Operations', () => {
    it('Sorts on filtered data', () => {
        const datStore = new DataStore(data);
        const filtered1 = filterData(datStore, {firstName: "e"});
        expect(filtered1.getIndexMap()).to.have.ordered.members([0, 1, 2, 3]);
        const sorted = sortData(filtered1, 'firstName', SortTypes.DESC);
        expect(sorted.getIndexMap()).to.have.ordered.members([3, 0, 2, 1]);
    });

    it('Sorts on filtered data2', () => {
        const datStore = new DataStore(data);
        const filtered1 = filterData(datStore, {firstName: "m"});
        expect(filtered1.getIndexMap()).to.have.ordered.members([0, 1, 4]);
        const sorted = sortData(filtered1, 'firstName', SortTypes.DESC);
        expect(sorted.getIndexMap()).to.have.ordered.members([0, 4, 1]);
    });

    it('Filters Original Data', () => {
        const datStore = new DataStore(data);
        const filtered1 = filterData(datStore, {firstName: "e"});
        expect(filtered1.getSize()).to.equal(4);
        expect(filtered1.getIndexMap()).to.have.ordered.members([0, 1, 2, 3]);
        const filtered2 = filterData(filtered1, {firstName: "m"});
        expect(filtered2.getIndexMap()).to.have.ordered.members([0, 1, 4]);
    });
});