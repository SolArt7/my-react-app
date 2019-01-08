import {appName} from '../config';
import { Record, OrderedMap, OrderedSet } from 'immutable';
import {all, call, put, take, select, takeEvery} from 'redux-saga/effects';
import firebase from 'firebase';
import {createSelector} from 'reselect';
import {fbDataToEntities} from './utils';

export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

const EVENT_LIMIT = 10;

const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;
const FETCH_ALL_FAIL = `${prefix}/FETCH_ALL_FAIL`;

const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`;
const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`;
const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`;
const FETCH_LAZY_FAIL = `${prefix}/FETCH_LAZY_FAIL`;

const DELETE_EVENT_REQUEST = `${prefix}/DELETE_EVENT_REQUEST`;
const DELETE_EVENT_SUCCESS = `${prefix}/DELETE_EVENT_SUCCESS`;
const DELETE_EVENT_FAIL = `${prefix}/DELETE_EVENT_FAIL`;

const SELECT_EVENT = `${prefix}/SELECT_EVENT`;

const ReducerRecord = Record({
    entities: new OrderedMap({}),
    selected: new OrderedSet([]),
    loading: false,
    loaded: false
});

export const EventRecord = Record({
    uid: null,
    title: null,
    url: null,
    where: null,
    when: null,
    month: null,
    submissionDeadline: null
});

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action;
    switch (type) {
        case FETCH_ALL_REQUEST:
        case FETCH_LAZY_START:
            return state
                .set('loading', true);
            
        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbDataToEntities(payload, EventRecord));

        case FETCH_LAZY_SUCCESS:
            return state
                .set('loading', false)
                .mergeIn(['entities'], fbDataToEntities(payload, EventRecord))
                .set('loaded', Object.keys(payload).length < EVENT_LIMIT);

        case SELECT_EVENT:
            return state.selected.contains(payload.uid)
                ? state.update('selected', selected => selected.remove(payload.uid))
                : state.update('selected', selected => selected.add(payload.uid));
            
        case DELETE_EVENT_REQUEST:
            return state.set('loading', true);
        
        case DELETE_EVENT_SUCCESS:
            const {uid} = payload;
            return state
                .deleteIn(['selected', uid])
                .deleteIn(['entities', uid])
                .set('loading', false);

        default:
            return state
    }
};

// Selectors
export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, (state) => state.entities);
export const eventListSelector = createSelector(entitiesSelector, (entities) => (
    entities.valueSeq().toArray()
));
export const idSelector = (_, props) => props.uid;
export const selectedEvents = createSelector(stateSelector, (state) => state.selected);
export const selectedEventsSelector = createSelector(entitiesSelector, selectedEvents, (entities, selected) => (
    selected.toArray().map(uid => entities.get(uid))
));
export const eventSelector = createSelector(entitiesSelector, idSelector, (entities, id) => entities.get(id));
// AC
export function fetchAll() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export function fetchLazy() {
    return {
        type: FETCH_LAZY_REQUEST
    }
}

export function selectEvent(uid) {
    return {
        type: SELECT_EVENT,
        payload: {uid}
    }
}

export function deleteEvent(uid) {
    return {
        type: DELETE_EVENT_REQUEST,
        payload: {uid}
    }
}

// Sagas
export function* fetchAllSaga() {
    const ref = firebase.database().ref('/events');

    while (true) {
        yield take(FETCH_ALL_REQUEST);
        try {
            const data = yield call([ref, ref.once], 'value');
            yield put({
                type: FETCH_ALL_SUCCESS,
                payload: data.val()
            })
        } catch (error) {
            yield put({
                type: FETCH_ALL_FAIL,
                error
            })
        }
    }

}

export function* fetchLazySaga() {

    while (true) {
        try {
            yield take(FETCH_LAZY_REQUEST);

            yield put({
                type: FETCH_LAZY_START
            })

            const state = yield select(stateSelector);
            const lastEvent = state.entities.last();

            if (state.loaded) continue;

            const ref = firebase.database().ref('/events')
                .orderByKey()
                .limitToFirst(EVENT_LIMIT)
                .startAt(lastEvent ? lastEvent.uid : '');

            const data = yield call([ref, ref.once], 'value');
            yield put({
                type: FETCH_LAZY_SUCCESS,
                payload: data.val()
            })
        } catch (error) {
            yield put({
                type: FETCH_LAZY_FAIL,
                error
            })
        }
    }
}

export function* deleteEventSaga() {
    while (true) {
        const action = yield take(DELETE_EVENT_REQUEST);
        const {uid} = action.payload;
        const ref = firebase.database().ref(`events/${uid}`);
        
        try {
            yield call([ref, ref.remove]);

            yield put({
                type: DELETE_EVENT_SUCCESS,
                payload: {uid}
            })
            
        } catch (error) {
            yield put({
                type: DELETE_EVENT_FAIL,
                error
            })
        }
    }
}


export function* saga() {
    yield all([
        fetchAllSaga(),
        fetchLazySaga(),
        deleteEventSaga()
    ])
}
