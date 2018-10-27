import React from 'react';
import Constant from '../constant'

import '../css/Quiz.css';
 
class Quiz extends React.Component {

    state = {
      message: '',
    };

    checkAnswer = (answer) => {
      const { data } = this.props;
      if(Constant.quiz[data].answer === answer ){
        this.setState({message: '정답입니다.'});
      }else{
        this.setState({message: '오답입니다.'});
      }
    }

    render(){
      const { data } = this.props;
      const { message } = this.state;
        return (
                <div className="quiz">
                    <h5>질문: {Constant.quiz[data].question}</h5>
                    <button onClick={() => this.checkAnswer('O')}>O</button>
                    <button onClick={() => this.checkAnswer('X')}>X</button>
                    <p>{message}</p>
                </div>
            );
        }
}

export default Quiz;
