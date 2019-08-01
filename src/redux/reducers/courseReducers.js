import * as types from '../actions/actionTypes';
import initialState from  './initialState';

export default function courseReducer(state = initialState.courses, actions){
    switch (actions.type){
        case types.CREATE_COURSES_SUCCESS:
            return [...state, { ...actions.courses}];
        case types.UPDATE_COURSES_SUCCESS:
            return state.map(course => course.id === actions.courses.id ? actions.courses : course);
        case types.LOAD_COURSES_SUCCESS:
            return actions.courses;
        case types.DELETE_COURSE_OPTIMISTIC:
            return state.filter(course => course.id !== actions.courses.id);
        default: 
            return state;
    }
}