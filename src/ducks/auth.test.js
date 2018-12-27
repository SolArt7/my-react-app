import authReducer, {ReducerRecord, signUpSaga, signInSaga, signOutSaga, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_ERROR, SIGN_UP_SUCCESS, SIGN_IN_ERROR, SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_ERROR} from './auth';
import {call, put, take} from 'redux-saga/effects';
import firebase from 'firebase';
import {push} from 'react-router-redux';

// Saga tests

it('Should sign-up user', () => {
    const saga = signUpSaga();
    const auth = firebase.auth();
    const authData = {
        email: 'lala@example.com',
        password: '123321aaa'
    };
    const requestAction = {
        type: SIGN_UP_REQUEST,
        payload: authData
    };
    const user = {
        email: authData.email,
        uid: Math.random().toString()
    };
    expect(saga.next().value).toEqual(take(SIGN_UP_REQUEST));
    expect(saga.next(requestAction).value).toEqual(call(
        [auth, auth.createUserWithEmailAndPassword],
        authData.email, authData.password
    ));
    expect(saga.next(user).value).toEqual(put({
        type: SIGN_UP_SUCCESS,
        payload: {user}
    }));

    const error = new Error;

    expect(saga.throw(error).value).toEqual(put({
        type: SIGN_UP_ERROR,
        error
    }))
});

it('Should sign-in user', () => {
    const auth = firebase.auth();
    const authData = {
        email: 'lala@example.com',
        password: '123321aaa'
    };
    const user = {
        email: authData.email,
        uid: Math.random().toString()
    };
    const requestAction = {
        type: SIGN_IN_REQUEST,
        payload: authData
    };
    const saga = signInSaga(requestAction);

    expect(saga.next().value).toEqual(call(
        [auth, auth.signInWithEmailAndPassword], 
        authData.email, authData.password));

    expect(saga.next(user).value).toEqual(put({
        type: SIGN_IN_SUCCESS,
        payload: {user}
    }));

    const error = new Error;

    expect(saga.throw(error).value).toEqual(put({
        type: SIGN_IN_ERROR,
        error
    }))
});

it('Should sign-out user', () => {
    const auth = firebase.auth();
    const requestAction = {
        type: SIGN_OUT_REQUEST
    };
    const saga = signOutSaga(requestAction);

    expect(saga.next().value).toEqual(call([auth, auth.signOut]))

    expect(saga.next().value).toEqual(put({
        type: SIGN_OUT_SUCCESS
    }));

    expect(saga.next().value).toEqual(put(push('/auth/signin')));

    const error = new Error;

    expect(saga.throw(error).value).toEqual(put({
        type: SIGN_OUT_ERROR,
        error
    }));
});

// Reducers tests

it('Should add user to store', () => {
    const state = new ReducerRecord();
    const user = {
        email: 'lala@example.com',
        password: '123321aaa'
    };
    const requestAction = {
        type: SIGN_IN_SUCCESS,
        payload: {user}
    };

    const newState = authReducer(state, requestAction);

    expect(newState).toEqual(new ReducerRecord({user}));
});

it('Should remove user from store', () => {
    const state = new ReducerRecord({
        user: {
            email: 'lala@example.com',
            password: '123321aaa'
        }
    });

    const newState = authReducer(state, { type: SIGN_OUT_SUCCESS });
    expect(newState).toEqual(new ReducerRecord());
});