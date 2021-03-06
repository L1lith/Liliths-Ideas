import React, {Component} from 'react';
import Alert from '../components/alert';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {signup} from '@redux/actions/auth';

class Signup extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
    ['submit','success','failure','error'].forEach(name=>{this[name] = this[name].bind(this)});
  }
  render(){
    if (typeof this.state.redirect == 'string' && this.state.redirect.length > 0) return (<Redirect to={this.state.redirect}/>);
    return (
      <form id='sign' onSubmit={e=>{e.preventDefault();this.submit(e);}}>
        <Alert content={this.state.alert}/>
        <label htmlFor='username' className='username'>Username</label>
        <input id='username' required ref={ref=>{this.username = ref;}} name='username' type='text' className='username' autoComplete='username'/>
        <label htmlFor='password' className='password'>Password</label>
        <input id='password' required ref={ref=>{this.password = ref;}} name='password' type='password' className='password' autoComplete='password'/>
        <label htmlFor='email' className='email'>Email</label>
        <input id='email' required ref={ref=>{this.email = ref;}} name='email' type='email' className='email' autoComplete='email'/>
        <input type='submit' value='Signup' disabled={this.state.disabled === true} />
      </form>
    );
  }
  submit(e){
    if (this.username && this.password && this.email) {
      let username = this.username.value,
      password = this.password.value,
      email = this.email.value;
      if (username.length > 0 && password.length > 0 && email.length > 4) {
        this.setState(Object.assign({},this.state,{disabled:true}));
        this.props.dispatch(signup(username,password,email,(err,response)=>{
          if (err) return this.error(err);
          if (response.status === 200) {
            this.success();
          } else {
            this.failure();
          }
        }));
      }
    }
  }
  success(){
    this.setState(Object.assign({},this.state,{redirect:'/'}));
  }
  failure(){
    this.setState(Object.assign({},this.state,{disabled:false, alert:new Error('Login Failed')}));
  }
  error(m) {
    this.setState(Object.assign({},this.state,{disabled:false, alert:new Error('Communication Error')}));
  }
}

export default [connect()(Signup),'/signup'];
