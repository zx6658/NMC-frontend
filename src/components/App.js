import React, { Component } from 'react';

import  { nmcApi } from '../api';
import Word from './Word';
import Nurse from './Nurse';
import Loading from './Loading';
import ListenerButton from './ListenerButton';
import HospitalImage from '../assets/hospital.png';
import IconImage from '../assets/icon.png';
import NurseImage from '../assets/nurse.png';
import '../css/App.css';

class App extends Component {
  state = {
    show: false,
    nurseShow: false,
    listening: false,
    text: "",
    answer: "",
  };

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

    this.recognition.onresult = async event => {
      const text = event.results[0][0].transcript;
      // const answer="";
      const answer = await this.getAnswer(text);
      this.setState({ text: text, answer: answer });
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

  getAnswer = async (question) => {
      const answer = await nmcApi.getAnswer(question);
      return answer;
  }

  start = () => {
    this.recognition.start();
  };

  end = () => {
    this.recognition.stop();
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const { show, nurseShow, answer, text, listening } = this.state;
   
    return (
      <main className="demo-1">
        <div className="info">
          <div className="info-wrapper">
            <img src={IconImage} alt="icon" className="icon"/>
            <img src={HospitalImage} alt="hospital" className="hospital-icon"/>
          </div>
            { show && text.length > 0 ? (
              <Word text={this.state.text} answer={answer} onClose={this.handleClose} />
            ) : (
              <ListenerButton
                onStart={this.start}
                onEnd={this.end}
                disabled={this.state.listening}
                buttonText={
                  this.state.listening ? '말해주세요!' : '하비 부르기'
                }
              />
            )}
          </div>
          <div className="nurse">
          <div className="info-wrapper">
            <img src={IconImage} alt="icon" className="icon"/>
            <img src={NurseImage} alt="nurse" className="nurse-icon"/>
          </div>
          <button
            className="button"
            onClick={()=>this.setState({nurseShow: true})}
          >
          간호사 부르기
          </button>
          </div>
          {nurseShow && <Nurse />}
          {listening && <Loading />}
      </main>
    
    );
  }
}

export default App;
