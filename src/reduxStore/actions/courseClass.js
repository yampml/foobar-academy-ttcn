import * as actionTypes from './actionTypes';
// import axios from 'axios';

export const updateCoursesClass = (coursesClass) => {
    return {
        type: actionTypes.COURSES_UPDATE_CLASS,
        newCoursesClass: coursesClass   
    }
}