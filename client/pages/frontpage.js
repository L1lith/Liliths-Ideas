import React, {Component} from 'react';
import './frontpage.less';
import {connect} from 'react-redux';

class FrontPage extends Component {
  render(){
    return <p>FrontPage</p>;
  }
}

export default [connect(state=>{return {frontPage:state.frontPage}})(FrontPage),'/',{exact:true}];
