import {addPersonSaga, ADD_PERSON_REQUEST, ADD_PERSON_SUCCESS} from './people'
import {call, put} from 'redux-saga/effects';
import {generateId} from './utils';
import firebase from 'firebase';

it('Should dispatch person with ID', () => {
    const person = {
        firstName: 'Test name',
        lastName: 'Test surname',
        email: 'test@mail.com',
        key: generateId()
    };
    
    const saga = addPersonSaga({
        type: ADD_PERSON_REQUEST,
        payload: { person }
    });
    const ref = firebase.database().ref('/people');
    
    expect(saga.next().value).toEqual(call([ref, ref.push], person));
    const uid = person.key;
    expect(saga.next(person).value).toEqual(put({
        type: ADD_PERSON_SUCCESS,
        payload: {
            person: {uid, ...person}
        }
    }))
});