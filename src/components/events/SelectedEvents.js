import React, { Component } from 'react';
import {selectedEventsSelector} from '../../ducks/events'
import {connect} from 'react-redux';
import SelectedEventCard from './SelectedEventCard';

class SelectedEvents extends Component {
    render() {
        const {events} = this.props;
        if (!events.length) return <h6 className="text-center">No selected events</h6>
        return (
            <div className="row py-3">
                {events.map(event => <SelectedEventCard event={event} key={event.uid} />)}
            </div>
        );
    }
}

export default connect((state) => ({
    events: selectedEventsSelector(state)
}), {})(SelectedEvents);