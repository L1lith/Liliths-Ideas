import {setPost,removePost,setFrontPage} from '@redux/actionTypes';

export function create(title,content,tags){
  return dispatch => {

  }
}
export function getFrontPage(pageNumber,callback){
  if (pageNumber && (typeof pageNumber != 'number' || pageNumber < 1)) throw new Error('GetFrontPage: Invalid Page Number');
  return dispatch => {
    fetch('/frontpage'+ (typeof pageNumber == 'number' ? `?pageNumber=${pageNumber}` : '')).then(response=>{
      if (response.status === 200) {
        response.json().then(function(data) {
          dispatch({type:setFrontPage,posts:data,pageNumber:(typeof pageNumber == 'number' ? pageNumber : 1)});
          if (typeof callback == 'function') callback(null);
        });
      } else {
        if (typeof callback == 'function') callback(new Error('Invalid Response Status'));
      }
    }).catch(err=>{
      if (typeof callback == 'function') callback(err);
    });
  }
}
