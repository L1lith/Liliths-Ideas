import React, {Component} from 'react';

class Alert extends Component {
  render(){
    if (this.props) {
      if (this.props.error) {
        if (typeof this.props.error == 'string' && this.props.error.length > 0) {
          return this.error(this.props.error);
        } else if (this.props.error instanceof Error && typeof this.props.error.message == 'string' && this.props.error.message.length > 0) {
          return this.error(this.props.error.message);
        }
        return this.error();
      } else if (typeof this.props.message == 'string' && this.props.message.length > 0) {
        return this.normal(this.props.message);
      } else if (this.props.content) {
        if (this.props.content instanceof Error) {
          return this.error(this.props.content.message);
        } else if (typeof this.props.content == 'string' && this.props.content.length > 0) {
          return this.normal(this.props.content);
        }
      }
    }
    return null;
  }
  normal(message) {
    return (
      <div className='alert normal'>{message}</div>
    );
  }
  error(message='Error'){
    return (
      <div className='alert error'>{message}</div>
    );
  }
}

export default Alert;
