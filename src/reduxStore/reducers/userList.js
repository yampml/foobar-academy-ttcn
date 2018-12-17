import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState =  {
  userList: []
}

const updateUserList = (state, action) => {
  return updateObject(state, {
      userList: action.newUserList
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
      case actionTypes.UPDATE_USER_LIST: return updateUserList(state, action);
      default:
        return state;
  }
}

export default reducer;