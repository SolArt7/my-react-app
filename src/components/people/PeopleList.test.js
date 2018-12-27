import React from 'react';
import '../../config/enzyme';
import {shallow, mount} from 'enzyme';
import {PeopleList} from './PeopleList'
import Loader from '../common/Loader';

const testPeople = [{
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.com'
}];


it('Should render Loader when no data', () => {
    const container = shallow(<PeopleList people={[]} fetchPeople={() => {}}/>);
    
    expect(container.contains(<Loader/>));
});

it('Should fetch people', (done) => {
    mount(<PeopleList people={[]} fetchPeople={done}/>);
});

// it('Should render People', () => {
//     const container = mount(<PeopleList people={testPeople} fetchPeople={() => {}}/>);
//     const rows = container.find('.test--people-list__row');
//
//     expect(rows.length).toEqual(testPeople.length + 1); // plus title row
// });