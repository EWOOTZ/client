/* eslint-disable */
import './App.css';
import { useEffect, useState } from 'react';
import pictureHome from './images/Oak Tree.png';
import picturefriend from './images/friend3.png';
import picturebasic from './images/basicProfile.png';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

function Join() {
  let title = '<당신>의\n';
  let title2 = '마이홈피';
  let name = localStorage.getItem("id");
  let title3 = '님과'
  let title4= '일촌 맺기를 수락하시겠습니까?'
  const navigate = useNavigate();

  return (
    <div style={{backgroundImage:'url('+picturefriend+')'}}>
          <div className='white-line'>
          <div>
          <img src={pictureHome} width='30vw' height='30vh' style={{ color: "white" }} />
          <img src={pictureHome} width='30vw' height='30vh' style={{ color: "white" }} />
          <img src={pictureHome} width='30vw' height='30vh' style={{ color: "white" }} />
        </div>
        <p style={{ color: '#00DAC0', fontSize: 48 }}>
          {title}
        </p>
        <p style={{ color: '#8A8A8A', fontSize: 48 }}>
          {title2}
        </p>
        <div style={{ height: "1vw" }}></div>
          <div className='yellow-box'>
          <img src={picturebasic} width='70vw' height='70vh'></img>
          <div style={{height:"2vh"}}></div>
          <div className='hang'>
          <p style={{ color: '#00DAC0', fontSize: 30 }}>
          {name}
          </p>
          <div style={{width : '2vw'}}></div>
          <p style={{ color: 'black', fontSize: 30 }}>
          {title3}
        </p>
        </div>
        <p style={{ color: 'black', fontSize: 30 }}>
          {title4}
        </p>
        <div style={{height:"5vh"}}></div>
        <div className='hang'>
        <button className="login-gray" style={{ fontSize: "25px" }} onClick={() => navigate()}>네!</button>
        <div style={{width:"10vh"}}></div>
        <button className="login-gray" style={{ fontSize: "25px" }} onClick={() => navigate()}>아니요.</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Join;
