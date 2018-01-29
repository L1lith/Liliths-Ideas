import React, {Component} from 'react';
import './frontpage.less';
import {connect} from 'react-redux';
import Alert from '@components/alert';
import {getFrontPage} from '@redux/actions/posts';
import PostViewer from '@components/postViewer';

class FrontPage extends Component {
  constructor(props){
    super(props);
    this.state = {loading:true,pageNumber:1,postNumber:1};
    ['last','next'].forEach(property=>{this[property] = this[property].bind(this);});
  }
  componentWillMount(){
    this.props.dispatch(getFrontPage(undefined,error=>{
      if (error) return this.setState(Object.assign({},this.state,{error}));
    }));
  }
  render(){
    return (
      <div className='frontpage'>
        <Alert error={this.state.error}/>
        {this.props.frontPages[this.state.pageNumber - 1] ?
          (
            <PostViewer onLast={this.last} onNext={this.next} id={this.props.frontPages[this.state.pageNumber - 1][this.state.postNumber - 1]}/>
          )
        : null}
      </div>
    );
  }
  last(){
    console.log('last');
    const posts = this.props.frontPages[this.state.pageNumber - 1];
    const newPostNumber = this.state.postNumber - 1;
    console.log(newPostNumber);
    if (newPostNumber > 0) {
      this.setState(Object.assign({},this.state,{postNumber:newPostNumber}));
    }
  }
  next(){
    console.log('next');
    const posts = this.props.frontPages[this.state.pageNumber - 1];
    const newPostNumber = this.state.postNumber + 1;
    if (newPostNumber <= posts.length) {
      this.setState(Object.assign({},this.state,{postNumber:newPostNumber}));
    }
  }
}

export default [connect(state=>{return {frontPages:state.frontPages}})(FrontPage),'/',{exact:true}];
