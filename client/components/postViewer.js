import React, {Component} from 'react';
import {connect} from 'react-redux';
import createDOMPurify from 'dompurify';
import './postViewer.less';

const DOMPurify = createDOMPurify(window);

class PostViewer extends Component {
  constructor(props){
    super(props);
    this.state = {};
    ['last','next'].forEach(property=>{this[property] = this[property].bind(this);});
  }
  render(){
    if (!this.props || !this.props.posts || typeof this.props.id != 'string' || this.props.id.length < 1) return null;
    const post = this.props.posts[this.props.id];
    if (!post) return null;
    const last = typeof this.props.onLast == 'function' ? <button className='last' disabled={this.state.disabled==='last'} onClick={this.last}>⇦</button> : null;
    const next = typeof this.props.onNext == 'function' ? <button className='next' disabled={this.state.disabled==='next'} onClick={this.next}>⇨</button> : null;
    return (
      <article className='postviewer' id='postviewer'>
        <h1 className='title'>{post.title}</h1>
        <main className='content' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.content)}}/>
        <footer>
          {last}
          <button onClick={this.dislike} className='dislike'>👎🏻</button>
          <div className='center'>⬤</div>
          <button onClick={this.like} className='like'>👍🏻</button>
          {next}
        </footer>
      </article>
    );
  }
  next(){
    if (typeof this.props.onNext != 'function') return;
    const output = this.props.onNext();
    if (output === false) {
      this.setState(Object.assign({},this.state,{disabled:'next'}));
    } else {
      this.setState(Object.assign({},this.state,{disabled:'null'}));
    }
  }
  last(){
    if (typeof this.props.onNext != 'function') return;
    const output = this.props.onLast();
    if (output === false) {
      this.setState(Object.assign({},this.state,{disabled:'last'}));
    } else {
      this.setState(Object.assign({},this.state,{disabled:'null'}));
    }
  }
}

export default connect(state=>{return {posts:state.posts}})(PostViewer);
