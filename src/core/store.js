import { 
    createStore, 
    combineReducers, 
    applyMiddleware 
} from 'redux';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'remote-redux-devtools';

import * as reducers from '../reducers';

const rootReducer = combineReducers({
    ...reducers
});

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8097 });

export default createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
);