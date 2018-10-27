import React from 'react';

import Quiz from './Quiz';
import Slideshow from '../lib/Slideshow';
import '../css/Word.css';
import HoviIcon from '../assets/hovi.png';

class Word extends React.Component {
  state = {
    number: 1,
    quizAvailable: false,
  };
  
  componentDidMount() {
    const { text, answer } = this.props;

    if(answer.category ==="video"){
      this.setState({quizAvailable: true});
    }

    this.setState(
      {
        number: Math.floor(Math.random() * 9),
      },
      () => {
        const slideshow = new Slideshow(document.querySelector('.slideshow'));
      }
    );
  }

  render() {
    const { number, quizAvailable } = this.state;
    const { text, answer } = this.props;
    return (
      <React.Fragment>
        <a className="button close" onClick={this.props.onClose}>
        다른 질문하기
        </a>
        <div className="slideshow">
          <div className="slide slide--current">
            <div className={`slide__bg slide__bg--1`} />
            <h2 className={`word word--${number} word--question`}>Q) {text}</h2>
            {/* 일단은 더미데이터로 예상 질문들 만들어보기 */}
            <div className={`word word--answer`}>카테고리: {answer.category}</div>
              {answer.category !=='video' && <div className={`word word--answer`}>A) {answer.response}</div>} 
              {answer.category ==='nurse' &&  <img className="hovi-icon" src={HoviIcon} />}
              { answer.category ==='video' && 
              <iframe allowfullscreen className={`hospitalInfo--vedio`} width="912" height="513" src={`${answer.response}?&amp;autoplay=1"`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>}
              { quizAvailable && <Quiz data={answer.category}/> }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Word.defaultProps = {
  text: '',
};

export default Word;
