import {setLoginStatus} from '@redux/actionTypes';
import {loggedOut,loggedIn} from '@redux/loginStatus';

export function login(username,password,callback){
  if (callback !== undefined && typeof callback != 'function') throw new Error('Invalid Callback');
  return dispatch => {
    fetch('/auth/login',{credentials: 'same-origin',headers:{Authorization:'Basic '+btoa(`${username}:${password}`)}}).then(response=>{
      if (response.status === 200) {
        dispatch({type:setLoginStatus,status:loggedIn});
      } else {
        dispatch({type:setLoginStatus,status:loggedOut});
      }
      if (callback) callback(null,response);
    }).catch(err=>{
      dispatch({type:setLoginStatus,status:loggedOut});
      if (callback) callback(err);
    });
  };
}

export function logout(callback){
  if (callback !== undefined && typeof callback != 'function') throw new Error('Invalid Callback');
  return dispatch => {
    fetch('/auth/logout',{credentials:'same-origin'}).then(response=>{
      if (response.status === 200) {
        dispatch({type:setLoginStatus,status:loggedOut});
      }
      if (callback) callback(null,response);
    }).catch(err=>{
      if (callback) callback(err);
    });
  }
}

export function validate(callback) {
  if (callback !== undefined && typeof callback != 'function') throw new Error('Invalid Callback');
  return dispatch => {
    fetch('/auth/validate',{credentials:'same-origin'}).then(response=>{
      if (response.status === 200) {
        dispatch({type:setLoginStatus,status:loggedIn});
      } else {
        dispatch({type:setLoginStatus,status:loggedOut});
      }
      if (callback) callback(null,response);
    }).catch(err=>{
      if (callback) callback(err);
    });
  }
}

export function signup(username,password,email,callback){
  if (typeof username !== 'string' || username.length < 1) throw new Error('Invalid Username');
  if (callback !== undefined && typeof callback != 'function') throw new Error('Invalid Callback');
  return dispatch => {
    fetch('/auth/signup',{method: 'POST',headers:{'Content-Type': 'application/json'},body: JSON.stringify({username,password,email}),credentials:'same-origin'}).then(response=>{
      if (response.status === 200) {
        dispatch({type:setLoginStatus,status:loggedIn});

      } else {
        dispatch({type:setLoginStatus,status:loggedOut});
      }
      if (callback) callback(null,response);
    }).catch(err=>{
      dispatch({type:setLoginStatus,status:loggedOut});
      if (callback) callback(err);
    });
  };
}
