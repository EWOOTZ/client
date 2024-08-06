/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import pictureHome from './images/house.svg';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ground from './ground';
import RouteTest from './Route';
import {useMediaQuery} from 'react-responsive';


// <div></div>는 박스 넣기
// <p></p>는 글자 넣기
// <img></img>는 이미지 넣기
// 브라우저 개발자도구에서 오류확인 가능
// control + / -> 한줄주석
// let [a, c] = [1, 2] -> a에 1, c에 2가 담긴다
// useState 사용하면 변수 바뀔때 자동 재랜더링됨

export const PC = ({children}) => {
  const isPc = useMediaQuery({
    query : "(min-width:769px)"
  });
  
  return <>{isPc && children}</>
}

function App() {
  let title = '<당신>의\n';
  let title2 = '마이홈피';

  return(
    
    <div className='backg'>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className='white-line'>
        <div>
          <div className='top-right'>               <RouteTest />             </div>
          <img src = {pictureHome} width='30px' height='30px' style={{color:"white"}}/>
        </div>
        <p style={{color : '#00DAC0', fontSize:48} }>
          {title}
        </p>
        <p style={{color : 'black', fontSize : 48}}>
          {title2}
        </p>
        <div className='grey-box'></div>
      </div>
        } />
        <Route path="/ground" element={<Ground />} />
      </Routes>
    </BrowserRouter>
  </div>
  
);
}

function Modal() {
  return (
    <div className = "modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
  )
}


export default App;