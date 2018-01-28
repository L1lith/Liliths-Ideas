import React, {Component} from 'react';
import './frontpage.less';
import {connect} from 'react-redux';

class FrontPage extends Component {
  render(){
    return this.props.frontPage;
  }
}

export default [connect(state=>{frontPage:state.frontPage})(FrontPage),'/',{exact:true}];
