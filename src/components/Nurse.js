import React from 'react';

import Slideshow from '../lib/Slideshow';
import '../css/Nurse.css';
import Constant from '../constant';
import IconImage from '../assets/icon.png';
import MicImage from '../assets/microphone.png';
import ClipImage from '../assets/clip.png';

class Nurse extends React.Component {

  state = {
    listening: false,
    text: "",
    answer: "",
    clicked: [],
  };
  
  onButtonClick = (index) => {
    if(this.state.clicked.includes(index)){
    this.setState({clicked: [...(this.state.clicked.splice(index,1))]});
    }else{
      this.setState({clicked: [...this.state.clicked,index]});
    }
  }

  componentDidMount() {
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      alert(
        'Speech Recognition API is not supported in this browser, try chrome'
      );
      return;
    }

    this.recognition = new Recognition();
    this.recognition.lang = 'ko-KR';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = event => {
      const text = event.results[0][0].transcript;

      console.log('transcript', text);
      this.setState({ text });
    };

    this.recognition.onspeechend = () => {
      console.log('끝');

      this.setState({ show: true });
    };

    this.recognition.onnomatch = event => {
      console.log('no match');
      this.setState({ text: "들을 수 없습니다! 다시 말해주세요!" });
    };

    this.recognition.onstart = () => {
      this.setState({
        listening: true,
        text: "",
      });
    };

    this.recognition.onend = () => {
      console.log('end');

      this.setState({
        listening: false,
      });

      this.end();
    };

    this.recognition.onerror = event => {
      console.log('error', event);

      this.setState({
        show: true,
        text: event.error,
      });
    };
  }

  render() {
    const { nurse } = Constant;
    const { clicked } = this.state;
    return (
      <div className="nurseInfo">
      <img className="clip-icon" src={ClipImage}/>
      <div className="nurseInfo-wrapper">
        <img className="nurseInfo-icon" src={IconImage} />
        <div className="button-wrapper" >
          {nurse.map((info, index)=>{
            return(
              <button 
                onClick={() => this.onButtonClick(index) }
                className={`nurseInfo-button ${clicked.includes(index) ? 'active' : ''}`}>{info}</button>
            )
          })}
        </div>
        </div>
        <button className="mic-button"> 
          <img className="mic-image" src={MicImage} />
          그 외 부탁하기
        </button>
      </div>
    );
  }
}

export default Nurse;
