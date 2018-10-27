import React, { Component } from 'react';
import ReactLoading from "react-loading";

import HoviIcon from '../assets/hovi.png';
import MicIcon from '../assets/microphone.png'
import '../css/Loading.css';

const Loading = () => {
    return (
        <div className="loading">
          <img className="loading--hovi-icon" src={HoviIcon} />
          <div className="loading-sub">
            <img className="loading--mic-icon" src={MicIcon} />
            <ReactLoading type={'bars'} color="#fff" />
          </div>
        </div>
    )
}


export default Loading;