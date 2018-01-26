import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './header.css';

class Header extends Component {
  render(){
    return (
        <header id='mainheader'>
          <NavLink to='/'>
            <h1 className='title backgroundtext'><span className='glow'/>Lilith&#39;s Ideas</h1>
          </NavLink>
          <nav>
            <ul className='spread'>
              <li><NavLink to='/browse/philosophy'>Philosophy</NavLink></li>
              <li><NavLink to='/browse/code'>Code</NavLink></li>
              <li><NavLink to='/browse'>More</NavLink></li>
            </ul>
          </nav>
        </header>
    );
  }
}

export default Header;
