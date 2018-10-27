import React, { Component } from 'react';

import  { nmcApi } from '../api';
import Word from './Word';
import ListenerButton from './ListenerButton';
import HospitalImage from '../assets/hospital.png';
import IconImage from '../assets/icon.png';
import '../css/App.css';

class App extends Component {
  state = {
    show: false,
    listening: false,
    text: "",
    answer: "",
  };

  componentDidMount() {
    this.getAnswer();
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

  getAnswer = async (question) => {
      const answer = await nmcApi.getAnswer("hi");
      this.setState({answer});
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
    const { show, answer, text } = this.state;
   
    return (
      <main className="demo-1">
      <img src={IconImage} alt="icon" className="icon"/>
      <img src={HospitalImage} alt="hospital" className="hospital-icon"/>
        { show && answer && text.length >0 ? (
          <Word text={this.state.text} answer={answer} onClose={this.handleClose} />
        ) : (
          <ListenerButton
            onStart={this.start}
            onEnd={this.end}
            disabled={this.state.listening}
            buttonText={
              this.state.listening ? '말해주세요!' : '여기를 눌러 병원에 대해 궁금한 것을 말해주세요!'
            }
          />
        )}
      </main>
    );
  }
}

export default App;
