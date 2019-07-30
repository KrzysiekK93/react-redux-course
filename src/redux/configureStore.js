import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureState(initialState) {
    const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore( 
        rootReducer, 
        initialState, 
        composeEnhances(applyMiddleware(thunk, reduxImmutableStateInvariant())) 
    ); 
}