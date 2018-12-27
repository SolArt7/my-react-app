import React, { Component } from 'react';
import {connect} from 'react-redux';
import { moduleName, fetchAll, eventListSelector, selectEvent } from '../../ducks/events';
import Loader from '../common/Loader';

export class EventList extends Component {
    
    componentDidMount() {
        const {loaded, fetchAll} = this.props;
        if (!loaded)
            fetchAll();
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
    }

    handleRowClick = (uid) => () => {
        const {selectEvent} = this.props;
        selectEvent && selectEvent(uid);
    }

    render() {
        const {loading} = this.props;
        if (loading) return <Loader />
        return (
            <div className="px-5 py-5">
            
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Where</th>
                            <th scope="col">When</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: state[moduleName].loading,
    loaded: state[moduleName].loaded,
}), { fetchAll, selectEvent })(EventList);