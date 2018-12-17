import * as actionTypes from './actionTypes';
// import axios from 'axios';

export const updateCourses = (courses) => {
    return {
        type: actionTypes.HOMEPAGE_UPDATE_COURSES_INFO,
        newCoursesInfo: courses   
    }
}

export const updateDepartments = (departmentsInfo) => {
    return {
        type: actionTypes.HOMEPAGE_UPDATE_DEPARTMENTS_INFO,
        newDepartmentsInfo: departmentsInfo   
    }
}

export const updateEvents = (eventsInfo) => {
    return {
        type: actionTypes.HOMEPAGE_UPDATE_EVENTS_INFO,
        newEventsInfo: eventsInfo   
    }
}

export const updateFacts = (factsInfo) => {
    return {
        type: actionTypes.HOMEPAGE_UPDATE_FACTS_INFO,
        newFactsInfo: factsInfo
    }
}
