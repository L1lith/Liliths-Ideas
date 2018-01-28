import React, {Component} from 'react';
import './frontpage.less';

class FrontPage extends Component {
  render(){
    return (
      <div id='frontpage' className='frontpage'>

      </div>
    );
  }
}

export default [FrontPage,'/',{exact:true}];
