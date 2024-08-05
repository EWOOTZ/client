/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// <div></div>는 박스 넣기
// <p></p>는 글자 넣기
// <img></img>는 이미지 넣기
// 브라우저 개발자도구에서 오류확인 가능
// control + / -> 한줄주석
// let [a, c] = [1, 2] -> a에 1, c에 2가 담긴다
// useState 사용하면 변수 바뀔때 자동 재랜더링됨

function App() {


  var post = '강남 우동 맛집';  // 변수 하나 선언 사용할땐 {post} 이런식으로
  let [a1, b1] = useState(['여자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [like, like2] = useState(0);

  let [a2, b2] = useState('여자 코트 추천');

  function gkatn() {
    like2(like + 1)
  }

  function 함수2() {
    let copy = [...a1];
    copy[0] = '남자 코트 추천'
    b1(copy);
  }

  return(
    // <div className='App'>
    //   <div class = "black-nav">  
    //     <h4 style={{color : 'red', fontSize : '20spx'}}>블로그</h4>
    //   </div>
    //   <div className="list">
    //     <h4>{a1[0]} <span onClick={함수2}>👍</span> {like} </h4>
    //     <p>2월 17일 발행</p>
    //   </div>
    //   <div className="list">
    //     <h4>{a1[1]}</h4>
    //     <p>2월 17일 발행</p>
    //   </div>
    //   <div className="list">
    //     <h4>{a1[2]}</h4>
    //     <p>2월 17일 발행</p>
    //   </div>

    //   <Modal/>

    // </div>
    <div className='backg'>
      <div className='white-line'>안녕하세요</div>
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