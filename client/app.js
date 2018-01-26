import React, { Component } from 'react';
import Header from './header';
import Router from './router';
import Ipsum from './components/ipsum';
import Background from './components/background';
import Footer from './footer';
import './app.less';
import './shapes.css';
//import './public/index.html';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Background/>
        <div className='beforefooter'>
        <Header/>
        <main className='content'>
          <Router/>
        </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
