import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
} 

export function updateCoursesSuccess(courses) {
    return { type: types.UPDATE_COURSES_SUCCESS, courses };
} 

export function createCoursesSuccess(courses) {
    return { type: types.CREATE_COURSES_SUCCESS, courses };
} 

export function deleteCourseOptimistic(courses) {
    return { type: types.DELETE_COURSE_OPTIMISTIC, courses };
} 

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCourses()
        .then(courses => {
            dispatch(loadCoursesSuccess(courses));
        })
        .catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}

export function saveCourses(courses) {
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return courseApi
        .saveCourse(courses)
        .then(savedCourse => {
            courses.id 
            ? dispatch(updateCoursesSuccess(savedCourse))
            : dispatch(createCoursesSuccess(savedCourse));
        })
        .catch(error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}

export function deleteCourses(courses) {
    return function (dispatch) {
        dispatch(deleteCourseOptimistic(courses));
        return courseApi.deleteCourse(courses.id)
    }
}