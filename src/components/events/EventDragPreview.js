import React, {Component} from 'react';
import {connect} from 'react-redux';
import {eventSelector} from '../../ducks/events';

class EventDragPreview extends Component {
    render() {
        const {event} = this.props;
        return (
            <h2>{event.title}</h2>
        );
    }
}

export default connect((state, props) => ({
    event: eventSelector(state, props)
}), null)(EventDragPreview);