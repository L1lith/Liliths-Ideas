import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './logout.less';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    this.setState({});
    fetch('/secure/logout',{credentials:'same-origin'}).then(response=>{
      if (response.status === 200) {
        this.setState({logoutSuccessful:true});
      } else {
        this.setState({logoutSuccessful:false});
      }
    }).catch(err=>{
      this.setState({logoutSuccessful:false});
    });
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

export default [Logout,'/logout'];
