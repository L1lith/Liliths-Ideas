import {setLoginStatus} from '@redux/actionTypes';
import {loggedOut} from '@redux/loginStatus';

export function login(username,password,callback){
  if (callback !== undefined && typeof callback != 'function') throw new Error('Invalid Callback');
  return dispatch => {
    fetch('/auth/login',{credentials: 'same-origin',headers:{Authorization:'Basic '+btoa(`${username}:${password}`)}}).then(response=>{
      if (response.status === 200) {
        dispatch({type:setLoginStatus,status:loggedIn});
        if (callback) callback(true);
      } else {
        dispatch({type:setLoginStatus,status:loggedOut});
        if (callback) callback(false);
      }
    }).catch(err=>{
      dispatch({type:setLoginStatus,status:loggedOut});
      if (callback) callback(err);
    });
  };
}
