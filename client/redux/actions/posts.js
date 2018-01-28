import {setPost,removePost} from '@redux/actionTypes';

export function create(title,content,tags){
  return dispatch => {

  }
}
export function getFrontPage(pageNumber){
  if (pageNumber && typeof pageNumber != 'number') throw new Error('GetFrontPage: Invalid Page Number');
  return dispatch => {
    fetch('/frontpage'+pageNumber ? `?pageNumber=${pageNumber}` : '').then(response=>{

    }).catch(err=>{

    });
  }
}
