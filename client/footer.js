import React, {Component} from 'react';
import DiscordLink from './components/discordlink';
import {Link} from 'react-router-dom';
import './footer.less';

class Footer extends Component {
  render(){
    return (
      <footer id='mainfooter'>
      {
        window.location.pathname !== '/login' ?
        <Link to='/login' className='login'>Login</Link> :
        <Link to='/signup' className='signup'>Signup</Link>
      }

        <Link to='/contact' className='contact'>Contact</Link>
      </footer>
    );
  }
}

export default Footer;
