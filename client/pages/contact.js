import React, {Component} from 'react';

class Contact extends Component {
  render(){
    return (
      <form id='contact'>
        <h1>Contact</h1>
        <input name='subject' type='text'/>
      </form>
    );
  }
}
export default [Contact,'/contact'];
