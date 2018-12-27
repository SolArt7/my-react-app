import React from 'react';
import {shallow, mount} from 'enzyme';
import {EventList} from './TableEventList';
import Loader from '../common/Loader';
import events from '../../mocks/conferences';
import {EventRecord} from '../../ducks/events';
import '../../config/enzyme';

const testEvents = events.map(event => new EventRecord({...event, uid: Math.random().toString()}))

it('Should render Loader', () => {
    const container = shallow(<EventList loading fetchAll={() => {}} />);

    expect(container.contains(<Loader />));
});

it('Should render events list', () => {
    const container = shallow(<EventList events={testEvents} fetchAll={() => {}} />);
    const rows = container.find('.test--event-list__row');

    expect(rows.length).toEqual(events.length)
});

it('Should request fetch data', (done) => {
   mount(<EventList events={[]} fetchAll={done} />);
});

it('Should select event', () => {
    let selected = null;
    const selectEvent = (uid) => selected = uid;
    
    const container = mount(<EventList 
        events={testEvents} 
        fetchAll={() => {}} 
        selectEvent={selectEvent}
    />);

    container.find('.test--event-list__row').first().simulate('click');

    expect(selected).toEqual(testEvents[0].uid);
})