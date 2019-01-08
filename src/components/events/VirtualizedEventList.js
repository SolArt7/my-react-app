import React, { Component } from 'react';
import {connect} from 'react-redux';
import { moduleName, fetchLazy, eventListSelector, selectEvent } from '../../ducks/events';
import {Table, Column, AutoSizer, InfiniteLoader} from 'react-virtualized';
import 'react-virtualized/styles.css';
import RowInTable from './RowInTable'

export class EventList extends Component {
    
    componentDidMount() {
        const {loaded, fetchLazy} = this.props;
        if (!loaded)
            fetchLazy();
    }
    
    getRows() {
        return this.props.events.map(this.getRow)
    }

    getRow = (event) => {
        return (
            <tr key={event.uid} className="test--event-list__row" onClick={this.handleRowClick(event.uid)}>
                <td>{event.title}</td>
                <td>{event.where}</td>
                <td>{event.month}</td>
            </tr>
        )
    };

    handleRowClick = ({rowData}) => {
        const {selectEvent} = this.props;
        selectEvent && selectEvent(rowData.uid);
    };

    rowGetter = ({index}) => {
        return this.props.events[index];
    };

    isRowLoaded = ({index}) => index < this.props.events.length;

    loadMoreRows = () => {
        this.props.fetchLazy();
    };
    
    getRowRenderer = (rowCtx) => <RowInTable {...rowCtx} />;

    render() {
        const {loaded, events} = this.props;
        // if (loading) return <Loader />
        return (
            <div className="px-5 py-5">
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    rowCount={loaded ? events.length : events.length + 1}
                    loadMoreRows={this.loadMoreRows}
                >
                    {({onRowsRendered, registerChild}) => (
                        <AutoSizer>
                            {({width}) => (                    
                                <Table
                                    ref={registerChild}
                                    rowCount={events.length}
                                    rowGetter={this.rowGetter}
                                    rowHeight={40}
                                    overscanRowCount={5}
                                    headerHeight={50}
                                    width={width}
                                    height={500}
                                    onRowClick={this.handleRowClick}
                                    onRowsRendered={onRowsRendered}
                                    rowRenderer={this.getRowRenderer}
                                >
                                    <Column
                                        label="Title"
                                        dataKey="title"
                                        width={width}
                                    />
                                    <Column
                                        label="Where"
                                        dataKey="where"
                                        width={width}
                                    />
                                    <Column
                                        label="When"
                                        dataKey="month"
                                        width={width}
                                    />
                                </Table>
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </div>
        );
    }
}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: state[moduleName].loading,
    loaded: state[moduleName].loaded,
}), { fetchLazy, selectEvent })(EventList);