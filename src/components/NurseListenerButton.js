import React from 'react';

import MicImage from '../assets/microphone.png';

class NurseListenerButton extends React.Component {
  state = {
    show: false,
  };

  handleMove = e => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    e.target.style.setProperty('--x', `${x}px`);
    e.target.style.setProperty('--y', `${y}px`);
  };

  handleStart = event => {
    event.preventDefault();

    this.props.onStart();
  };

  render() {
    return (
      <button
        {...this.props}
        className="mic-button"
        onClick={this.handleStart}
        onMouseMove={this.handleMove}>
        <img className="mic-image" src={MicImage} />
        <span>{this.props.buttonText}</span>
      </button>
    );
  }
}

NurseListenerButton.defaultProps = {
  buttonText: 'Click me to listen',
};

export default NurseListenerButton;
