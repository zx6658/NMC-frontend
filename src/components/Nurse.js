import React from 'react';
import Modal from 'react-modal';

import Word from './Word';
import Slideshow from '../lib/Slideshow';
import NurseListenerButton from './NurseListenerButton';
import '../css/Nurse.css';
import HoviIcon from '../assets/hovi.png';
import Constant from '../constant';
import IconImage from '../assets/icon.png';
import ClipImage from '../assets/clip.png';
import SendImage from '../assets/send-button.png';


class Nurse extends React.Component {

  state = {
    listening: false,
    text: "",
    answer: "",
    showModal: false,
    clicked: [],
  };
  
  onButtonClick = (index) => {
    if(this.state.clicked.includes(index)){
      this.setState({clicked: [...(this.state.clicked.filter((data)=> data !== index))]});
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
  handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
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
    const { nurse } = Constant;
    const { clicked,show, text, alert } = this.state;
    return (
      <div className="nurseInfo">
      <img className="clip-icon" src={ClipImage}/>
      <div className="nurseInfo-wrapper">
        <a href="/NMC-frontend">
        <button className="back-button">
            뒤로가기
          </button>
        </a>
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
        < NurseListenerButton
          onStart={this.start}
          onEnd={this.end}
          disabled={this.state.listening}
          buttonText={
            this.state.listening ? '말해주세요!' : '그 외 부탁하기'
          }
        /> 
        <button className="form-button" onClick={this.handleOpenModal}> 
          <img className="mic-image" src={SendImage} />
          전송 하기
        </button>
        {(show && text.length > 0) && (
              <Word text={this.state.text} onClose={this.handleClose} answer={ {category: 'nurse', response: '하비가 간호사에게 전달해드렸습니다.'}}/>
            )}
   <Modal 
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
      >
      <button onClick={this.handleCloseModal}>닫기</button>
        <div className="modal-wrapper">
        <img src={HoviIcon }/>
        <p>하비가 간호사에게 전달해 드렸습니다.</p>
      </div>
    </Modal>
      </div>
    );
  }
}

export default Nurse;
