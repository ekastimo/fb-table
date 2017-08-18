import React, {Component} from 'react';
import {Cell} from 'fixed-data-table-2';

export const SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

function reverseSort(sortDir) {
    return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

const inputStyle = {
    width: '100%',
    border: '1px solid #ededed',
    fontWeight: 'normal',
    textAlign: 'center'
};

export default class SortHeaderCell extends Component {
    constructor(props) {
        super(props);
        this._onSortChange = this._onSortChange.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
    }

    render() {
        const {sortDir, children, showFilter = true, onFilterChange, onSortChange, ...props} = this.props;
        return (
            <Cell {...props}>
                <div style={{paddingLeft: 5, paddingRight: 5}}>
                    <a onClick={this._onSortChange} style={{cursor: 'pointer', textDecoration: 'none'}}>
                        {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
                    </a>
                </div>
                {
                    showFilter && (
                        <div style={{paddingLeft: 5, paddingRight: 5, alignContent: 'center'}}>
                            <input style={inputStyle}
                                   onChange={this._onFilterChange}
                                   placeholder=""
                            />
                        </div>

                    )
                }
            </Cell>
        );
    }

    _onSortChange(e) {
        e.preventDefault();
        const {onSortChange, sortDir, columnKey} = this.props;
        if (onSortChange) {
            onSortChange(columnKey, sortDir ? reverseSort(sortDir) : SortTypes.DESC);
        }
    }

    _onFilterChange(e) {
        const value = e.target.value;
        const {onFilterChange, columnKey} = this.props;
        onFilterChange(columnKey, value);
    }
}