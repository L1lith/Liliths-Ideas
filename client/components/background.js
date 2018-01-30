import React, {Component} from 'react';
import './background.css';

class Background extends Component {
  componentWillMount(){
    fetch('/randombackground').then(response=>{
      if (response.status === 200) {
        response.text().then(text=>{
          this.setState({backgroundURL:text});
        });
      }
    });
  }
  render(){
    if (!this.state || typeof this.state.backgroundURL != 'string') return null;
    return (
      <img ref={ref=>{setTimeout(()=>{ref.style.opacity = 1;ref.style.visibility='visible';},100)}} id='mainbackground' src={this.state.backgroundURL}/>
    );
  }
}
export default Background;
