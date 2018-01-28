import React, {Component} from 'react';
import {connect} from 'react-redux';
import createDOMPurify from 'dompurify';
import './postViewer.less';

const DOMPurify = createDOMPurify(window);

class PostViewer extends Component {
  render(){
    if (!this.props || !this.props.posts || typeof this.props.id != 'string' || this.props.id.length < 1) return null;
    const post = this.props.posts[this.props.id];
    if (!post) return null;
    return (
      <div className='postviewer' id='postviewer'>
        <h1 className='title'>{post.title}</h1>
        <div className='content' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.content)}}/>
      </div>
    );
  }
}

export default connect(state=>{return {posts:state.posts}})(PostViewer);
