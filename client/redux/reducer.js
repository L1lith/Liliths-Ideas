import defaultState from '@redux/defaultState';
import {setLoginStatus} from '@redux/actionTypes';
import * as loginStatus from '@redux/loginStatus';
const validLoginStatus = Object.values(loginStatus);

function reducer(state, action) {
  if (typeof state === 'undefined' || action.type === '@@redux/INIT') {
    return defaultState;
  }
  switch(action.type) {
    case setLoginStatus:
      if (!validLoginStatus.includes(action.status)) throw new Error('Invalid Action Login Status');
      return Object.assign({},state,{loginStatus:action.status,user:action.status === loginStatus.loggedIn ? action.user : null});
      // if (action.status === loginStatus.loggedIn) {
      //   return Object.assign({},state,{loginStatus:action.status,user:action.user});
      // } else {
      //   return Object.assign({},state,{loginStatus:action.status,user:null});
      // }
    default:
      return state;
  }
}
// Logger wraps reducer for debugging purposes
const logger = (...args)=>{const output = reducer(...args);console.log('new state',output);return output};
export default reducer;
