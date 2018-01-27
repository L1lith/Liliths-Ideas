import React, {Component} from 'react';

class Contact extends Component {
  render(){
    return (
      <form id='contact'>
        <label for='subject'>Subject</label>
        <input id='subject' name='subject' type='text'/>
        <label for='subject'>Message</label>
        <textarea id='message' name='message'/>
      </form>
    );
  }
}
export default [Contact,'/contact'];
