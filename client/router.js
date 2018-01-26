import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import pages from './pages';

class Router extends Component {
  render(){
    return (
      <Switch>
        {Object.values(pages).map((pagePair,index)=>{
          return (
            <Route key={index} exact={pagePair[2] === true} path={pagePair[1]} component={pagePair[0]}/>
          );
        })}
      </Switch>
    );
  }
}

export default Router;
