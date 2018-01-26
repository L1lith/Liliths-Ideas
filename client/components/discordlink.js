import React, {Component} from 'react';
import './discordlink.css';

class DiscordLink extends Component {
  render(){
    return (
      <div className='discordlink'>
        <img src='/images/discordLogo'/>
        <span className='username'>Lilith#7915</span>
      </div>
    );
  }
}

export default DiscordLink;
