import React, {Component} from 'react';
import PeopleCardList from '../people/PeopleCardList';
import EventList from '../events/VirtualizedEventList';
import SelectedEvents from '../events/SelectedEvents';

class AdminPage extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center">Admin Page</h1>
                <div>
                    <h3 className="text-center">People list</h3>
                    <PeopleCardList />
                </div>
                <div>
                    <h3 className="text-center">Selected events</h3>
                    <SelectedEvents />
                </div>
                <div>
                    <h3 className="text-center">All events</h3>
                    <EventList />
                </div>
            </div>
        );
    }
}

export default AdminPage;