import {appName} from '../config';
import {List, Record} from 'immutable';
import {put, call, takeEvery, select} from 'redux-saga/effects'
import firebase from 'firebase';
import {reset} from 'redux-form';
import {fbDataToEntities} from './utils';
import { createSelector } from 'reselect';

export const moduleName = 'people';

// actions

export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_SUCCESS = `${appName}/${moduleName}/ADD_PERSON_SUCCESS`;
export const ADD_PERSON_FAIL = `${appName}/${moduleName}/ADD_PERSON_FAIL`;

export const ADD_EVENT_REQUEST = `${appName}/${moduleName}/ADD_EVENT_REQUEST`;
export const ADD_EVENT_SUCCESS = `${appName}/${moduleName}/ADD_EVENT_SUCCESS`;
export const ADD_EVENT_FAIL = `${appName}/${moduleName}/ADD_EVENT_FAIL`;

export const FETCH_PEOPLE_REQUEST = `${appName}/${moduleName}/FETCH_PEOPLE_REQUEST`;
export const FETCH_PEOPLE_SUCCESS = `${appName}/${moduleName}/FETCH_PEOPLE_SUCCESS`;
export const FETCH_PEOPLE_FAIL = `${appName}/${moduleName}/FETCH_PEOPLE_FAIL`;

// reducer
export const ReducerRecord = Record({
    entities: new List([]),
    loaded: false,
    loading: false
});

export const PersonRecord = Record({
    uid: null,
    firstName: null,
    lastName: null,
    email: null,
    events: []
});

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action;

    switch (type) {
        
        case ADD_PERSON_SUCCESS:
            return state
                .update('entities', entities => entities.concat({[payload.person.uid]: new PersonRecord(payload.person)}));
    
        case FETCH_PEOPLE_REQUEST: 
            return state
                .set('loading', true);

        case FETCH_PEOPLE_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbDataToEntities(payload.people, PersonRecord));
            
        case ADD_EVENT_SUCCESS:
            const {personUid, events} = payload;
            return state
                .setIn(['entities', personUid, 'events'], events);

        default:
            return state;
    }
};

// selectors
const stateSelector = state => state[moduleName];
const peopleGetter = createSelector(stateSelector, people => people.entities);
export const idSelector = (_, props) => props.uid;
export const peopleListSelector = createSelector(peopleGetter, (people) => people.valueSeq().toArray());
export const personSelector = createSelector(peopleGetter, idSelector, (entities, id) => entities.get(id));

// AC
export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: {person}
    }
}

export function fetchPeople() {
    return {
        type: FETCH_PEOPLE_REQUEST
    }
}

export function addEventToPerson(eventUid, personUid) {
    return {
        type: ADD_EVENT_REQUEST,
        payload: { eventUid, personUid }
    }
}

// Sagas
export const addPersonSaga = function* (action) {
    const ref = firebase.database().ref('/people');
    try {
        const person = yield call([ref, ref.push], action.payload.person);
        const uid = person.key;
        yield put({
            type: ADD_PERSON_SUCCESS,
            payload: {
                person: {uid, ...action.payload.person}
            }
        });
        // clear form with name person
        yield put(reset('person'));

    } catch (error) {
        yield put({
            type: ADD_PERSON_FAIL,
            error
        })
    }

};

export const fetchPeopleSaga = function* (action) {
    const ref = firebase.database().ref('/people');
    try {
        const people =  yield call([ref, ref.once], 'value');
        yield put({
            type: FETCH_PEOPLE_SUCCESS,
            payload: {people: people.val()}
        })
    } catch (error) {
        yield put({
            type: FETCH_PEOPLE_FAIL,
            error
        })
    }
};

export const addEventSaga = function* (action) {
    const {eventUid, personUid} = action.payload;
    const ref = firebase.database().ref(`/people/${personUid}/events`);
    
    const people = yield select(peopleGetter);
    const events = people.getIn([personUid, 'events']).concat(eventUid);
    
    try {
        yield call([ref, ref.set], events);
        yield put({
            type: ADD_EVENT_SUCCESS,
            payload: {
                personUid,
                events
            }
        });
        
    } catch (error) {
        yield put({
            type: ADD_EVENT_FAIL,
            error
        })
    }
};

export const saga = function* () {
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga);
    yield takeEvery(FETCH_PEOPLE_REQUEST, fetchPeopleSaga);
    yield takeEvery(ADD_EVENT_REQUEST, addEventSaga);
};