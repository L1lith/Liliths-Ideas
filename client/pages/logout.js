import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '@redux/actions/auth';
import './logout.less';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
    this.props.dispatch(logout(successful=>{
      if (typeof successful == 'boolean') {
        this.setState({logoutSuccessful:successful});
      }
    }));
  }
  render(){
    return (
      <div className='logout'>
        {typeof this.state.logoutSuccessful == 'boolean' ? <h1>Logout {this.state.logoutSuccessful ? 'Successful.' : 'Failed.'}</h1> : <h1>Logging Out</h1>}
        <Link to='/'>Return Home</Link>
      </div>
    );
  }
}

export default [connect()(Logout),'/logout'];
