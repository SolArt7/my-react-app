import React, { Component } from 'react';
import EventList from '../events/VirtualizedEventList';

class EventsPage extends Component {
    render() {
        return (
            <div>
                <h3 className="text-center">Events Page</h3>
                <EventList />
            </div>
        );
    }
}

export default EventsPage;