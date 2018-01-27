import React, {Component} from 'react';

class Contact extends Component {
  render(){
    return (
      <form id='contact'>
        <label htmlFor='subject'>Subject</label>
        <input id='subject' name='subject' type='text'/>
        <label htmlFor='subject'>Message</label>
        <textarea id='message' name='message'/>
        <input type='submit' value='Send'/>
      </form>
    );
  }
}
export default [Contact,'/contact'];
