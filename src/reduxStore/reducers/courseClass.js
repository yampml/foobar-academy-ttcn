import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  coursesClass: [
    {
      name: "Airi Satou",
      startDate: "1/1/2011",
      numberOfStudents: '56'
    },
    {
      name: "Airi Satou2",
      startDate: "1/1/2011",
      numberOfStudents: '56'
    },
    {
      name: "Airi Satou3",
      startDate: "1/1/2011",
      numberOfStudents: '56'
    },
    {
      name: "Airi Satou4",
      startDate: "1/1/2011",
      numberOfStudents: '56'
    },
    {
      name: "Airi Satou5",
      startDate: "1/1/2011",
      numberOfStudents: '56'
    }, 
  ]
};

const updateCoursesClass = (state, action) => {
    return updateObject(state, {
        
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.COURSES_UPDATE_CLASS: return updateCoursesClass(state, action);
        default:
          return state;
    }
}

export default reducer;