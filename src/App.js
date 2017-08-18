// @flow
import React from 'react';
import PropTypes from 'prop-types';
import "fixed-data-table-2/dist/fixed-data-table.css";
import XTable from "./table/XTable";
import FakeObjectDataListStore from "./utils/FakeObjectDataListStore";

export const tableConfig = {
    columns: [
        {
            name: "id",
            label: "ID",
            type: "text",
            width: 60,
            extras: {
                fixed: true,
            },
        },
        {
            name: "firstName",
            label: "First Name",
            type: "text",
            width: 200,
            extras: {
                isResizable: true,
                minWidth: 100,
                maxWidth: 170,
            },
        },
        {
            name: "lastName",
            label: "Last Name",
            type: "text",
            width: 200,
            extras: {
                isResizable: true,
                minWidth: 100,
                maxWidth: 170,
            },
        },
        {
            name: "city",
            label: "City",
            type: "text",
            width: 200,
            extras: {
                isResizable: true,
                minWidth: 100,
            },
        },
        {
            name: "companyName",
            label: "Company Name",
            type: "text",
            width: 200,
            extras: {
                isResizable: true,
                minWidth: 100,
            },
        },
        {
            name: "sentence",
            label: "Sentence",
            type: "text",
            width: 200,
            extras: {
                isResizable: true,
                flexGrow: 1,
            },
        },
    ],
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dataList = new FakeObjectDataListStore(2000);
        this.data = [];
        for (let x=0;x<this.dataList.getSize();x++){
            this.data.push(this.dataList.getObjectAt(x));
        }
    }

    render() {
        return (
            <div className="main-holder" style={{ padding: 10 }}>
                <XTable config={tableConfig} data={this.data} />
            </div>
        );
    }
}
export default App;
