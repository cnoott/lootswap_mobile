/***
INSQUAD - STORE CLASS
***/

import {createStore, applyMiddleware} from 'redux';
import saga, {SagaMiddleware} from 'redux-saga';
import sagas from './sagas';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

// Persisting the redux state through reducers
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: SagaMiddleware<object>[] = [];
const sagaMiddleware = saga();
middlewares.push(sagaMiddleware);

const storeRef = createStore(persistedReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(sagas);
let persistor = persistStore(storeRef);

const ReduxStore = {store: storeRef, persistor};
export default ReduxStore;
