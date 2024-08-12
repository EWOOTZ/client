/* eslint-disable */
import './App.css';
import { useState } from 'react';
import pictureHome from './images/Oak Tree.png';
import pictureapple from './images/apple.png';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function Join(){
  let title = '<당신>의\n';
  let title2 = '마이홈피';
  const navigate = useNavigate();

  return (
    <div className='backg'>
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
      <div className='grey-box'>
        <div className='yellow-box'>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '20px' }}>ID</p>
            <div style={{ width: '1vw' }}></div>
            <input className='input-name' type='text' placeholder='아이디를 입력하세요.' />
          </div>
          <div style={{ height: '5vh' }}></div>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '20px' }}>PW</p>
            <div style={{ width: '1vw' }}></div>
            <input className='input-name' type='text' placeholder='패스워드를 입력하세요.' />
          </div>
          <div style={{ height: '5vh' }}></div>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '13px' }}>확인</p>
            <div style={{ width: '0.7vw' }}></div>
            <input className='input-name' type='text' placeholder='패스워드를 재입력하세요.' />
          </div>
          <div style={{ height: '5vh' }}></div>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '13px' }}>이름</p>
            <div style={{ width: '0.7vw' }}></div>
            <input className='input-name' type='text' placeholder='이름을 입력하세요.' />
          </div>
          <div style={{ height: '25vh' }}></div>
          <div className='hang'>
          <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate(-1)}>가입하기!</button>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Join;
