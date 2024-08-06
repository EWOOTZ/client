/* eslint-disable */
import './App.css';
import { useState } from 'react';
import pictureHome from './images/Oak Tree.png';
import pictureapple from './images/apple.png';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function Mypage() {
    const navigate = useNavigate();
    return (
        <div className='backg'>
            <div className='white-line'>
                <div className='hang'>
                    <p className='login-gray' style={{ fontSize: "30px" }}>마이페이지</p>
                    <img src={pictureapple} width='45px' height='35px' style={{ color: "white" }} />
                </div>
                <div style={{ height: "5vh" }}></div>
                <div className='hang2'>
                    <div style={{ background: "white", width: "15vw", height: "20vh", }}></div>
                    <div style={{ width: "2vw" }}></div>
                    <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate()}>변경</button>
                </div>
                <div style={{ height: "3vh" }}></div>
                <div className='grey-box'>
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
                </div>
            </div>
        </div>
    );
}

export default Mypage;
