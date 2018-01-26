import React, {Component} from 'react';
import {Redirect} from 'react-router';
import titleCase from '../functions/titleCase';

class Category extends Component {
  render(){
    const categoryName = this.props && this.props.match && this.props.match.params && typeof this.props.match.params.category == 'string' ? this.props.match.params.category : null;
    if (!categoryName) return (<Redirect to='/browse'/>);
    return (
      <div className='category'>
        
      </div>
    );
  }
}
export default [Category,'/browse/:category'];
