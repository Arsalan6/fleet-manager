// Redux Imports
import { createStore, applyMiddleware, compose } from 'redux';

// Middleware Import
import createSagaMiddleware from 'redux-saga';

// Reducer Import
import rootReducer from './root-reducer.js';

// Sagas Import
import { rootSaga } from './root-saga';

// Saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
let composeEnhancers = compose;

export const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middlewares)
));

// Sagas Run (takes on individual written sagas to be listened)
sagaMiddleware.run(rootSaga);

// Persisted version of the store
export const persister = (store);