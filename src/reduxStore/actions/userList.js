import * as actionTypes from './actionTypes';
import axios from 'axios';

export const updateUserList = (userList) => {
  return {
    type: actionTypes.UPDATE_USER_LIST,
    newUserList: userList
  }
}

export const fetchUserFromDB = () => {
  const auth_token = sessionStorage.getItem('token');
  return dispatch => {
    let url = "https://api-english-academy.herokuapp.com/users";
    axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + auth_token
      }
    })
      .then(response => {
        dispatch(updateUserList(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  };
};
