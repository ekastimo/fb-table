import React, {Component} from "react";
import PropTypes from 'prop-types';
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import {Table, Column} from "fixed-data-table-2";
import {TextCell, ColoredTextCell, DateCell, TooltipCell} from "./cells/cells";
import SortHeaderCell, {SortTypes} from "./cells/SortHeaderCell";
import DataStore from "./data/DataStore";
import {filterData, sortData} from "./data/ops";
import "./style.css";

export default class XTable extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        config: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        const {config: {columns}, data} = props;
        const columnWidths = {};
        columns.forEach(({name, width}) => {
            columnWidths[name] = width;
        });
        this.state = {
            columnWidths, columns,
            viewData: new DataStore(data),
            sortCol: "id",
            sortDirection: SortTypes.DESC,
            filters: {},
        };

        this._onFilterChange = this._onFilterChange.bind(this);
        this._onSortChange = this._onSortChange.bind(this);
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    }

    render() {
        const {columnWidths, columns, viewData, sortCol, sortDirection} = this.state;
        return (
            <AutoSizer>
                {({height, width}) => (
                    <Table
                        rowHeight={30}
                        headerHeight={70}
                        rowsCount={viewData.getSize()}
                        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                        isColumnResizing={false}
                        width={width}
                        height={height}
                        {...this.props}>
                        {
                            columns.map(col => {
                                const {name, label, extras = {}} = col;
                                return (
                                    <Column
                                        key={name}
                                        columnKey={name}
                                        header={
                                            <SortHeaderCell
                                                onFilterChange={this._onFilterChange}
                                                onSortChange={this._onSortChange}
                                                sortDir={sortCol === name ? sortDirection : undefined}>
                                                {label}
                                            </SortHeaderCell>
                                        }
                                        cell={<TextCell data={viewData}/>}
                                        width={columnWidths[name]}
                                        {...extras}
                                    />
                                );
                            })
                        }
                    </Table>
                )}
            </AutoSizer>
        );
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths}) => ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }));
    }


    _onSortChange(sortCol, sortDirection) {
        const {viewData} = this.state;
        this.setState({
            viewData: sortData(viewData, sortCol, sortDirection),
            sortCol,
            sortDirection,
        });
    }

    _onFilterChange(columnKey, value = "") {
        const {sortCol, sortDirection, filters, viewData} = this.state;
        const newFilters = {...filters};
        newFilters[columnKey] = value;
        const filteredData = filterData(viewData, newFilters);
        // Resort Data
        const newDataList = sortCol ? sortData(filteredData, sortCol, sortDirection) : filteredData;
        this.setState({
            viewData: newDataList,
            filters: newFilters
        });
    }
}


