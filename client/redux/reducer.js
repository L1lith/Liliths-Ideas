import defaultState from '@redux/defaultState';
import {setLoginStatus,setFrontPage} from '@redux/actionTypes';
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
    case setFrontPage:
      const newFrontPages = state.frontPages.slice(0);
      newFrontPages[action.pageNumber - 1] = action.posts.map(post=>post.id);
      savePages(...action.posts);
      const newPosts = Object.assign({},state.posts);
      action.posts.forEach(post=>{
        newPosts[post.id] = post;
      });
      return Object.assign({},state,{posts:newPosts,frontPages:newFrontPages});
    default:
      return state;
  }
}

function savePages(...posts) {
  posts.forEach(post=>{
    localStorage['post#'+post.id] = JSON.stringify(post);
  });
}

// Logger wraps reducer for debugging purposes
const logger = (...args)=>{console.log(...args.slice(1));const output = reducer(...args);console.log('new state',output);return output};
export default logger;
