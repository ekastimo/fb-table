import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {SortTypes} from './data/ops'
import XTable from './XTable'


const tableConfig = {
    columns: [
        {
            name: 'id',
            label: 'ID',
            type: 'text',
            width: 50,
            extras: {
                fixed: true,
            }
        },
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            width: 200,
            extras: {
                isResizable: true,
                minWidth: 100,
                maxWidth: 170
            }
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            width: 200,
            extras: {
                isResizable: true,
                minWidth: 100,
                maxWidth: 170
            }
        },
        {
            name: 'city',
            label: 'City',
            type: 'text',
            width: 200,
            extras: {
                isResizable: true,
                minWidth: 100,
            }
        },
        {
            name: 'companyName',
            label: 'Company Name',
            type: 'text',
            width: 200,
            extras: {
                isResizable: true,
                minWidth: 100,
            }
        },
        {
            name: 'sentence',
            label: 'Sentence',
            type: 'text',
            width: 200,
            extras: {
                isResizable: true,
                flexGrow: 1,
            }
        }
    ]
};
const dataList = [
    {
        'id': 0,
        'city': 'Kampala',
        'email': 'gracem@yahoo.com',
        'firstName': 'Mirembe',
        'lastName': 'Grace',
    },
    {
        'id': 1,
        'city': 'Masaka',
        'email': 'tinak@gmail.com',
        'firstName': 'Tina',
        'lastName': 'Kisakye',
    },
    {
        'id': 2,
        'city': 'Abim',
        'email': 'emmag@hotmail.com',
        'firstName': 'Emmanuella',
        'lastName': 'Gwa',
    },
    {
        'id': 3,
        'city': 'Entebe',
        'email': 'sylvan@yahoo.com',
        'firstName': 'Sylvan',
        'lastName': 'Kasasa',
    },
    {
        'id': 4,
        'city': 'Arua',
        'email': 'victor@outlook.com',
        'firstName': 'Victor',
        'lastName': 'Kasom',
    }
];

describe('<XTable />', () => {

    it('Loads the correct State and Sort by ID', () => {
        const wrapper = shallow(<XTable config={tableConfig} data={dataList}/>);
        expect(wrapper.state().viewData.getSize()).to.equal(5);
        expect(wrapper.state().sortCol).to.equal("id");
        expect(wrapper.state().sortDirection).to.equal("DESC");
        expect(wrapper.state().filters).to.be.an('object').that.is.empty;

        // Sort by id
        wrapper.instance()._onSortChange('id', SortTypes.ASC);
        expect(wrapper.state().sortCol).to.equal("id");
        expect(wrapper.state().sortDirection).to.equal("ASC");
        const found = wrapper.state().viewData.getObjectAt(0);
        expect(4).to.be.equal(found.id)

    });

    it('Sorts by city', () => {
        const wrapper = shallow(<XTable config={tableConfig} data={dataList}/>);
        expect(wrapper.state().viewData.getSize()).to.equal(5);
        expect(wrapper.state().sortCol).to.equal("id");
        expect(wrapper.state().sortDirection).to.equal("DESC");
        expect(wrapper.state().filters).to.be.an('object').that.is.empty;
        // Sort by city
        wrapper.instance()._onSortChange('city', SortTypes.DESC);
        expect(wrapper.state().sortCol).to.equal("city");
        expect(wrapper.state().sortDirection).to.equal("DESC");
        const {viewData} = wrapper.state();
        expect(viewData.getIndexMap()).to.have.ordered.members([2, 4, 3, 0, 1]);
    });

    it('Sorts by city and filter by email', () => {

        const wrapper = shallow(<XTable config={tableConfig} data={dataList}/>);
        expect(wrapper.state().viewData.getSize()).to.equal(5);

        // Sort by city
        wrapper.instance()._onSortChange('city', SortTypes.DESC);
        expect(wrapper.state().sortCol).to.equal("city");
        expect(wrapper.state().sortDirection).to.equal("DESC");
        const {viewData} = wrapper.state();
        expect(viewData.getIndexMap()).to.have.ordered.members([2, 4, 3, 0, 1]);

        // Filter by Email
        wrapper.instance()._onFilterChange('email', "yahoo");
        expect(wrapper.state().filters).to.deep.equal({email: 'yahoo'});
        expect(wrapper.state().viewData.getIndexMap()).to.have.ordered.members([3, 0]);


        //Clear Filter
        wrapper.instance()._onFilterChange('email', "");
        expect(wrapper.state().viewData.getSize()).to.be.equal(5);
        expect(wrapper.state().filters).to.deep.equal({email: ''});

        //Clear Filter with undefined
        wrapper.instance()._onFilterChange('email', undefined);
        expect(wrapper.state().viewData.getSize()).to.be.equal(5);
        expect(wrapper.state().filters).to.deep.equal({email: ''})

    });


    it('Sort shud work on filtered data', () => {

        const wrapper = shallow(<XTable config={tableConfig} data={dataList}/>);
        expect(wrapper.state().viewData.getSize()).to.equal(5);

        // Filter by Email
        wrapper.instance()._onFilterChange('email', "yahoo");
        expect(wrapper.state().filters).to.deep.equal({email: 'yahoo'});
        expect(wrapper.state().viewData.getSize()).to.be.equal(2);
        expect(wrapper.state().viewData.getObjectAt(0).city).to.be.equal("Kampala");

        wrapper.instance()._onSortChange('city', SortTypes.DESC);

        expect(wrapper.state().viewData.getObjectAt(0).city).to.be.equal("Entebe")

    })

});