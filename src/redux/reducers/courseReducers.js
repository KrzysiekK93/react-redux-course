import * as types from '../actions/actionTypes';
import initialState from  './initialState';

export default function courseReducer(state = initialState.courses, actions){
    switch (actions.type){
        case types.CREATE_COURSE:
            return [...state, { ...actions.courses}];
        case types.LOAD_COURSES_SUCCESS:
            return actions.courses;
        default: 
            return state;
    }
}