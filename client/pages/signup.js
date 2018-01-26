import React, {Component} from 'react';
import Alert from '../components/alert';
import {Redirect} from 'react-router';

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
        <span className='username'>Username</span>
        <input required ref={ref=>{this.username = ref;}} name='username' type='text' className='username' autoComplete='username'/>
        <span className='password'>Password</span>
        <input required ref={ref=>{this.password = ref;}} name='password' type='password' className='password' autoComplete='password'/>
        <span className='email'>Email</span>
        <input required ref={ref=>{this.email = ref;}} name='email' type='email' className='email' autoComplete='email'/>
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
        fetch('/auth/signup',{method: 'POST',headers:{'Content-Type': 'application/json'},body: JSON.stringify({username,password,email}),credentials:'include'}).then(response=>{
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

export default [Signup,'/signup'];
