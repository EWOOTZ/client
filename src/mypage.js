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
                <div className='grey-box2'>
                    <div style={{width : "20vw"}}></div>
                    <div className='hang3'>
                        <p style={{ color: "black", fontSize: '20px' }}>닉네임</p>
                        <div style={{ width: '6.7vw' }}></div>
                        <input className='input-2' type='text' placeholder='닉네임을 입력하세요...' />
                    </div>
                    <div style={{ height: '5vh' }}></div>
                    <div className='hang'>
                        <p style={{ color: "black", fontSize: '20px' }}>프로필 뮤직</p>
                        <div style={{ width: '3.3vw' }}></div>
                        <input className='input-2' type='text' placeholder='프로필 뮤직을 설정하세요...' />
                        <div style={{width:"0.5vw"}}></div>
                        <button className="login-gray" style={{ fontSize: "15px" }} onClick={() => navigate()}>검색</button>
                    </div>
                    <div style={{ height: '5vh' }}></div>
                    <div className='hang'>
                        <p style={{ color: "black", fontSize: '20px' }}>한줄 소개</p>
                        <div style={{ width: '4.6vw' }}></div>
                        <input className='input-2' type='text' placeholder='한줄 소개를 입력하세요...' />
                    </div>
                    <div style={{ height: '5vh' }}></div>
                    <div className='hang'>
                        <p style={{ color: "black", fontSize: '20px' }}>내 미니홈피 URL</p>
                        <div style={{ width: '0.5vw' }}></div>
                        <input className='input-2' type='text' placeholder='http://minihomep.com/haejin0221' />
                        <div style={{width:"0.5vw"}}></div>
                        <button className="login-gray" style={{ fontSize: "15px" }} onClick={() => navigate()}>복사</button>
                    </div>
                </div>
                <div style={{height : "1vh"}}></div>
                <div className='hang'>
                    <div style={{width : "55vw"}}></div>
                <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate("/main")}>수정하기</button>
            </div>
            </div>
        </div>
    );
}

export default Mypage;
