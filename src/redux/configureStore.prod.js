import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default function configureState(initialState) {
    return createStore( 
        rootReducer, 
        initialState, 
        applyMiddleware(thunk) 
    ); 
}