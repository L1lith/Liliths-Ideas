import React, {Component} from 'react';
import './background.css';

class Background extends Component {
  render(){
    return (
      <div ref={ref=>{setTimeout(()=>{ref.style.opacity = 1;ref.style.visibility='visible';},100)}} id='mainbackground'/>
    )
  }
}
export default Background;
