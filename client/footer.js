import React, {Component} from 'react';
import DiscordLink from './components/discordlink';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loggedIn} from '@redux/loginStatus';
import {withRouter} from 'react-router-dom';
import './footer.less';

class Footer extends Component {
  render(){
    return (
      <footer id='mainfooter'>
      {
        this.props.location.pathname === '/login' ?
        <Link to='/signup' className='signup'>Signup</Link> :
        this.props && this.props.loginStatus && this.props.loginStatus === loggedIn ?
        <Link to='/logout' className='logout'>Logout</Link> :
        <Link to='/login' className='login'>Login</Link>

      }

        <Link to='/contact' className='contact'>Contact</Link>
      </footer>
    );
  }
}

export default withRouter(connect(state=>{
  return {loginStatus:state.loginStatus}
})(Footer));
