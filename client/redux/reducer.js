import defaultState from '@redux/defaultState';
import {setLoginStatus} from '@redux/actionTypes';
import * as loginStatus from '@redux/loginStatus';
const validLoginStatus = Object.values(loginStatus);

function reducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch(action.type) {
    case actionTypes.setLoginStatus:
      if (!validLoginStatus.includes(action.status)) throw new Error('Invalid Action Login Status')
      return Object.assign({},state,{loginStatus:action.status});
    default:
      return state;
  }
}
export default reducer;
