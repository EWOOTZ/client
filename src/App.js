/* eslint-disable */
import './App.css';
import { useState } from 'react';
import pictureHome from './images/Oak Tree.png';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Ground from './ground';
import Join from './join';

import Letter from './Letter';

import Main from './main';
import Mypage from './mypage';
import axios from 'axios';

const Home = () => {
  let title = '<당신>의\n';
  let title2 = '마이홈피';
  const navigate = useNavigate();
  const URL = "http://43.202.212.132:80/auth/token";

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const saveUserId = event => {
    setId(event.target.value);
    console.log(event.target.value);
  };

  const saveUserPw = event => {
    setPw(event.target.value);
    console.log(event.target.value);
  };

  return (
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
            <input className='input-name' type='text' placeholder='아이디를 입력하세요...' value={id} onChange={saveUserId} />
          </div>
          <div style={{ height: '5vh' }}></div>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '20px' }}>PW</p>
            <div style={{ width: '1vw' }}></div>
            <input className='input-name' type='text' placeholder='패스워드를 입력하세요...' value={pw} onChange={saveUserPw} />
          </div>
          <div style={{ height: '10vh' }}></div>
          <button className="login-gray" style={{ fontSize: "30px" }} onClick={() =>{navigate("/main"), console.log(id), console.log(pw), axios.post(URL,
          {headers: {
            'Access-Control-Allow-Origin':'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
          }},
          {
            username:id,
            password:pw,
          }).then((response)=>{console.log(response.data);
            if(response.status == 201){console.log("로그인 성공");}
          }).catch((error)=>console.log(error.response));} }>로그인!</button>
          <div style={{ height: '20vh' }}></div>
          <button className="login-gray" style={{ fontSize: "15px" }} onClick={() => navigate("/join")}>&lt;당신&gt;의 마이홈피가 처음이라면?</button>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <div className='backg'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ground" element={<Ground />} />
          <Route path="/join" element={<Join />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
