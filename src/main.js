/* eslint-disable */
import './App.css';
import { useState } from 'react';
import pictureHome from './images/Oak Tree.png';
import pictureapple from './images/apple.png';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function Main() {
    let title = '<당신>의\n';
    let title2 = '마이홈피';
    const navigate = useNavigate();
    return (
        <div className='backg'>
            <div className='white-line'>
                <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate("/mypage")}>마이페이지</button>
                <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate("/ground")}>광장가기</button>


            </div>
        </div>
    );
}

export default Main;
