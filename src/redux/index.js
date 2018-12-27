import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer';
import history from '../history';
import rootSaga from '../redux/saga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger);

const store = createStore(reducer, enhancer);

// dev only
window.store = store;

sagaMiddleware.run(rootSaga);

export default store;