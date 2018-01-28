import React, {Component} from 'react';
import './frontpage.less';
import {connect} from 'react-redux';
import Alert from '@components/alert';
import {getFrontPage} from '@redux/actions/posts';

class FrontPage extends Component {
  constructor(props){
    super(props);
    this.state = {loading:true};
  }
  componentWillMount(){
    this.props.dispatch(getFrontPage(undefined,error=>{
      if (error) return this.setState(Object.assign({},this.state,{error}));
    }));
  }
  render(){
    return (
      <div className='frontpage'>
        <Alert error={this.state.error}/>
      </div>
    );
  }
}

export default [connect(state=>{return {frontPages:state.frontPages}})(FrontPage),'/',{exact:true}];
