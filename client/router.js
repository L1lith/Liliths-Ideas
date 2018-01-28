import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import pages from './pages';

class Router extends Component {
  render(){
    return (
      <Switch>
        {Object.values(pages).map((pagePair,index)=>{
          const options = typeof pagePair[2] == 'object' ? pagePair[2] : {};
          return (
            <Route key={index} exact={options.exact === true} path={pagePair[1]} component={pagePair[0]}/>
          );
        })}
      </Switch>
    );
  }
}

export default Router;
