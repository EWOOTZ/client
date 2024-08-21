/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import './Letter.css';
import notice_pencil from './assets/notice_pencil.png';
import notice_chart from './assets/notice_chart.png';
import notice_search from './assets/notice_search.png';
import notice_love from './assets/notice_love.png';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';


function Notice() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState('latest'); // Notice 컴포넌트 내부로 이동


  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected:', event.target.value); // 선택된 값을 로그로 출력
  };

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 'daily':
        return <DailyContent />;
      case 'food':
        return <FoodContent />;
      default:
        return <DailyContent />;
    }
  };

  const navigate = useNavigate();

  return (
    <div className='white-line'>

      <div className='hang'>


        <div className='notice-gray-box'>

          <div className="hang" style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "20%", width: "100%" }}>
            <div style={{ width: "1vh" }}></div>
            <input className='input-search' style={{ width: "10vw" }} type='text' placeholder='제목 검색' />
            <div style={{ width: "0.5vw" }}></div>
            <img src={notice_search} alt="notice_search" style={{ width: "2vw" }} />
          </div>

          <div style={{ height: "3vh" }}></div>
          <p style={{ display: "flex", color: "black", fontSize: '21px', alignItems: "flex-start", justifyContent: "flex-start", width: "100%", paddingLeft: "59px" }}>카테고리</p>
          <div style={{ height: '2.2vh' }}></div>
          <div className='container-search'>
            <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
              <img src={notice_chart} alt="notice_chart" style={{ width: "1.4vw" }} />
              <button className="login-gray" style={{ fontSize: "18.5px" }} onClick={() => setSelectedCategory('daily')}>일상</button>
            </div>
            <div style={{ height: '1.2vh' }}></div>

            <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
              <img src={notice_chart} alt="notice_chart" style={{ width: "1.4vw" }} />
              <button className="login-gray" style={{ fontSize: "18.5px" }} onClick={() => setSelectedCategory('food')}>맛집 탐방</button>
            </div>
          </div>
          <div className="hang" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20%", width: "100%" }}>
            <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate('/ground')}>글쓰기!</button>
            <img src={notice_pencil} alt="notice_pencil" style={{ width: "1.4vw" }} />
          </div>
        </div>
        <div className='notice-gray-box2'>

          {renderCategoryContent()}
        </div>
      </div>



    </div>

  );
}

const DailyContent = ({ selectedOption, handleChange }) => (
  <div className='column-container'>
    <div className='yellow-box-top'>
      <div className='white-box-top'>
        <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
          <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>전체</p>
          <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>500000000 개의 글</p>
          <div style={{ width: "45vw" }}></div>
          <select value={selectedOption}
            onChange={handleChange} className="custom-select" style={{ fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된 순</option>
            <option value="popular">인기순</option>
          </select>
        </div>
      </div>
    </div>
    <div style={{ height: "2vh" }}></div>
    <div className='yellow-box-bottom'>
      <div className='white-box-bottom'>
        <div style={{ height: "60vh", width: "42vw", paddingLeft: "3px" }}>
          <p style={{ width: "43vw", height:"3vh",display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>글제목</p>
          <hr style={{ border: "0.2px solid black", width: "100%" }} />
          <div>
            <div>
              <p>권해진 또오오옹ㅇ꺠애애앵ㅋㅋ!!</p>
              <hr style={{ border: "0.2px solid gray", width: "100%" }} />
            </div>

            <div>
              <p>댓걸~이 되는 방법 10가지!!</p>
              <hr style={{ border: "0.2px solid gray", width: "100%" }} />
            </div>


          </div>
        </div>

        <div style={{ height: "60vh", width: "15vw" }}>

        <div className="hang" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>

          <p style={{ height:"2.95vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>글쓰니</p>
          <img src={notice_love} alt="notice_love" />

          </div>
          <hr style={{ border: "0.2px solid black", width: "100%" }} />
         
         
          <div>
           
            <p style={{ width: "15vw", display: "flex", alignItems: "center", justifyContent: "center" }}>수진이짱</p>

            <hr style={{ border: "0.2px solid gray", width: "100%" }} />
          </div>
          <p style={{ width: "15vw", display: "flex", alignItems: "center", justifyContent: "center" }}>이예원</p>

          <div >
            <hr style={{ border: "0.2px solid gray", width: "100%" }} />
          </div>

        </div>
        <div style={{ height: "60vh", width: "10vw" }}>
          <p style={{height:"3vh", width: "10vw", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>작성일</p>

          <hr style={{ border: "0.2px solid black", width: "100%" }} />
          <div >
            <p style={{ width: "10vw", display: "flex", alignItems: "center", justifyContent: "center" }}>2087-04-28</p>
            <hr style={{ border: "0.2px solid gray", width: "100%" }} />
          </div>
          <div>
            <p style={{ width: "10vw", display: "flex", alignItems: "center", justifyContent: "center" }}>2002-03-22</p>

            <hr style={{ border: "0.2px solid gray", width: "100%" }} />
          </div>

        </div>
      </div>
    </div>
  </div>
);


const FoodContent = () => (
  <div>
    <h2>맛집 탐방 카테고리</h2>
    <p>여기는 맛집 탐방에 대한 내용이 표시됩니다.</p>
  </div>
);

const DefaultContent = () => (
  <div>
    <h2>카테고리를 선택하세요</h2>
    <p>카테고리를 선택하면 해당 내용이 표시됩니다.</p>
  </div>
);

export default Notice;
