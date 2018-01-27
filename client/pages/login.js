import React, {Component} from 'react';
import Alert from '../components/alert';
import {Redirect} from 'react-router';
import {login} from '@redux/actions/auth';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
    ['submit','success','failure','error'].forEach(name=>{this[name] = this[name].bind(this)});
  }
  render(){
    if (typeof this.state.redirect == 'string' && this.state.redirect.length > 0) return (<Redirect to={this.state.redirect}/>);
    return (
      <form id='login' onSubmit={e=>{e.preventDefault();this.submit(e);}}>
        <Alert content={this.state.alert}/>
        <span className='username'>Username</span>
        <input required ref={ref=>{this.username = ref;}} name='username' type='text' className='username' autoComplete='username'/>
        <span className='password'>Password</span>
        <input required ref={ref=>{this.password = ref;}} name='password' type='password' className='password' autoComplete='password'/>
        <input type='submit' value='Login' disabled={this.state.disabled === true} />
      </form>
    );
  }
  submit(e){
    if (this.username && this.password) {
      let username = this.username.value,
      password = this.password.value;
      if (username.length > 0 && password.length > 0) {
        this.setState(Object.assign({},this.state,{disabled:true}));
        this.props.dispatch(login(username,password));
        fetch('/auth/login',{credentials: 'same-origin',headers:{Authorization:'Basic '+btoa(`${username}:${password}`)}}).then(response=>{
          response.text().then(text=> {
            if (response.status === 200) {
              this.success(text);
            } else {
              this.failure(text);
              this.setState(Object.assign({},this.state,{disabled:false}));
            }
          });
        }).catch(err=>{
          this.error(err);
          this.setState(Object.assign({},this.state,{disabled:false}));
        });
      }
    }
  }
  success(m){
    this.setState(Object.assign({},this.state,{redirect:'/'}));
  }
  failure(m){
    this.setState(Object.assign({},this.state,{alert:m ? new Error(m) : new Error('Login Failed')}));
  }
  error(m) {
    this.setState(Object.assign({},this.state,{alert:m || new Error()}));
  }
}

export default [connect()(Login),'/login'];
