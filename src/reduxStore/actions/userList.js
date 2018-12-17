import * as actionTypes from './actionTypes';
import axios from 'axios';

export const updateUserList = (userList) => {
    return {
        type: actionTypes.UPDATE_USER_LIST,
        newUserList: userList
    }
}

export const fetchUserFromDB = () => {
  return dispatch => {
    let url = "http://localhost:3001/users";
    axios.get(url)
      .then(response => {
        dispatch(updateUserList(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  };
};
