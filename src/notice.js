/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import './Letter.css';
import notice_pencil from './assets/notice_pencil.png';
import notice_chart from './assets/notice_chart.png';
import notice_search from './assets/notice_search.png';
import notice_love from './assets/notice_love.png';
import picturebasic from './images/basicProfile.png';
import picturePin from './images/pin.png';
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Write from './write';
import picturesky from './images/sky4.png';

function formatDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${year}.${month}.${day}`;
}

function Notice() {
  const [profile_image, setProfileImg] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState('latest'); // Notice 컴포넌트 내부로 이동

  
  const getMypage = async () => {
    try {
      const response = await axios.get(
        '/users/me',
        {
          'headers': {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        localStorage.setItem("fullname", response.data.fullname);
        localStorage.setItem("username", response.data.username);
        setFullname(response.data.fullname);
        localStorage.setItem("profile_image", response.data.profile_image);
        setProfileImg(response.data.profile_image);
        localStorage.setItem("ID", response.data.id);
        localStorage.setItem("statusM", response.data.status_message);
        setStatus(response.data.status_message);
        localStorage.setItem("music_info", response.data.music_info);
        console.log(localStorage.getItem("fullname"));
        console.log(localStorage.getItem("statusM"));
        console.log(localStorage.getItem("ID"));
        console.log(localStorage.getItem("profile_image"));
        console.log(localStorage.getItem("music_info"));
        console.log("마이페이지 가져오기 성공");
      }
    }
    catch (error) {
      console.log(error.response);
    }
  };


  useEffect(() => {
    getMypage();
  }, []);


  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected:', event.target.value); // 선택된 값을 로그로 출력
  };

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 'daily':
        return <DailyContent />;
      case 'food':
        return <FoodAllContent />;
      case 'foodSeoul':
        return <FoodSeoulContent />;
      case 'foodGang':
        return <FoodGangContent />;
      case 'foodDaejeon':
        return <FoodDaejeonContent />;
      case 'foodDaegu':
        return <FoodDaeguContent />;
      case 'foodBusan':
        return <FoodBusanContent />;
      case 'foodJeju':
        return <FoodJejuContent />;
      case 'foodElse':
        return <FoodElseContent />;
      default:
        return <DailyContent />;
    }
  };

  const navigate = useNavigate();

  return (
    <div className='white-line'>
      <div className='hang'>
        <div className='notice-gray-box'>
          <div style={{ height: "6vh" }}></div>
          <div className="hang" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "17vh", width: "100%" }}>
            <div style={{ width: "1vh" }}></div>
            <input className='input-search' style={{ width: "10vw", fontSize: "15px" }} type='text' placeholder='검색' />
            <div style={{ width: "0.5vw" }}></div>
            <img src={notice_search} alt="notice_search" style={{ width: "1.7vw" }} />
          </div>
          <div style={{ height: "3vh" }}></div>
          <p style={{ display: "flex", color: "black", fontSize: '21px', alignItems: "flex-start", justifyContent: "flex-start", width: "100%", paddingLeft: "40px" }}>카테고리</p>
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
            <div style={{ height: "0.7vh" }}></div>
            <div className='hang' style={{ width: "12.5vh" }}>
              <img src={picturePin} style={{ width: "1.4vw" }} />
              <button className="login-gray" style={{ fontSize: "17px", height: "4vh" }} onClick={() => setSelectedCategory('foodSeoul')}>서울</button>
            </div>
            <div className='hang' style={{ width: "12.5vh" }}>
              <img src={picturePin} style={{ width: "1.4vw" }} />
              <button className="login-gray" style={{ fontSize: "17px", height: "4vh" }} onClick={() => setSelectedCategory('foodGang')}>강릉</button>
            </div>
            <div className='hang' style={{ width: "12.5vh" }}>
              <img src={picturePin} style={{ width: "1.4vw" }} />
              <button className="login-gray" style={{ fontSize: "17px", height: "4vh" }} onClick={() => setSelectedCategory('foodDaejeon')}>대전</button>
            </div>
            <div className='hang' style={{ width: "12.5vh" }}>
              <img src={picturePin} style={{ width: "1.4vw" }} />
              <button className="login-gray" style={{ fontSize: "17px", height: "4vh" }} onClick={() => setSelectedCategory('foodDaegu')}>대구</button>
            </div>
            <div className='hang' style={{ width: "12.5vh" }}>
              <img src={picturePin} style={{ width: "1.4vw" }} />
              <button className="login-gray" style={{ fontSize: "17px", height: "4vh" }} onClick={() => setSelectedCategory('foodBusan')}>부산</button>
            </div>
            <div className='hang' style={{ width: "12.5vh" }}>
              <img src={picturePin} style={{ width: "1.4vw" }} />
              <button className="login-gray" style={{ fontSize: "17px", height: "4vh" }} onClick={() => setSelectedCategory('foodJeju')}>제주</button>
            </div>
            <div className='hang' style={{ width: "12.5vh" }}>
              <img src={picturePin} style={{ width: "1.4vw" }} />
              <button className="login-gray" style={{ fontSize: "17px", height: "4vh" }} onClick={() => setSelectedCategory('foodElse')}>기타</button>
            </div>
          </div>
          <div className="hang" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20%", width: "100%" }}>
            <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate('/write/:id')}>글쓰기!</button>
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

function DailyContent({ selectedOption, handleChange }) {
  const [dailyboardView, setdailyboardview] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleButtonClick = (dailyboard) => {
    setSelectedItem(dailyboard);
    setShowPopup(true);
  };

  const handleBoardcloseClick = () => {
    setShowPopup(false);
    setIsExiting(false);
  };

  const getDailyBoard = async () => {
    try {
      const response = await axios.get('/board/category/%EC%9D%BC%EC%83%81', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setdailyboardview(response.data);
        console.log("일상 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("일상 게시판 가져오기 실패", error.response);
    }
  };

  useEffect(() => {
    getDailyBoard();
  }, []);
  

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>일상</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>{`${dailyboardView.length} 개의 글`}</p>
            <div style={{ width: "50vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ display:"flex",justifyContent:"flex-end",fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
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
            <p style={{ width: "43vw", height: "3vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>글제목</p>
            <hr style={{ border: "0.2px solid black", width: "100%" }} />
            <div>
            <div>
            {dailyboardView.map((dailyboard) => (
          <div key={dailyboard.id} style={{ cursor: 'pointer' }}>
            <p
              style={{ paddingLeft: "1vw", margin: 0, cursor: 'pointer' }}
              onClick={() => handleButtonClick(dailyboard)}
            >
              {dailyboard.title}
            </p>
            <hr style={{ border: "0.2px solid gray", width: "100%" }} />
          </div>
        ))}
        <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
        {showPopup && (
          <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
            <div className="backg" style={{ width: "70vw", height: "72vh", borderRadius: "10px" }}>
           <div className='column-container'>
           <div className="yellow-box" style={{ width: "65vw", height: "8vh", borderRadius: "10px"}}>
           <div className="hang" style={{marginLeft:'10px', fontSize:'19px',display: "flex", justifyContent: "start", alignItems: "start", width: "100%", paddingLeft:"30px",paddingBottom:"15px" }}>
           <p>제목: {selectedItem.title}</p>
           <button onClick={handleBoardcloseClick} className="close-button" style={{paddingLeft:'12px'}}>X</button>

          </div>
            </div>
            <div style={{ height: "1vh" }}></div>
            <div className="yellow-box" style={{ width: "65vw", height: "57vh", borderRadius: "10px", overflow: "hidden",  overflowY: "auto"  }}>
  <div>
    <img src={picturesky} style={{ width: "30vw", height: "30vh" }} />
    <div style={{ height: "1vh" }}></div>
    </div>
    <div>
    <p style={{ marginLeft:'10px', fontSize:'22px', display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
      {selectedItem.username}
      <img src={notice_love} alt="notice_love" />
    </p>
  </div>
  <div style={{ padding:'10px',fontSize:'17px', display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
    <p>      {selectedItem.contents} </p>
    </div>
</div>
           </div>
            </div>
          </div>
        )}
      </div>
      </div>
          </div>
          <div style={{ height: "60vh", width: "15vw" }}>
            <div className="hang" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
              <p style={{ height: "2.95vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>글쓰니</p>
              <img src={notice_love} alt="notice_love" />
            </div>
            <hr style={{ border: "0.2px solid black", width: "100%" }} />
            <div>
              {dailyboardView.map((dailyboard) => (
                <div key={dailyboard.id}>
                  <p style={{display:"flex",justifyContent:"center"}}>{dailyboard.username}</p>
                  <hr style={{ border: "0.2px solid gray", width: "100%" }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: "60vh", width: "10vw" }}>
            <p style={{ height: "3vh", width: "10vw", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>작성일</p>
            <hr style={{ border: "0.2px solid black", width: "100%" }} />
            <div>
              {dailyboardView.map((dailyboard) => (
                <div key={dailyboard.id}>
                  <p style={{display:"flex",justifyContent:"center"}}>{dailyboard.date}</p>
                  <hr style={{ border: "0.2px solid gray", width: "100%" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

function FoodAllContent({ selectedOption, handleChange }) {
  const [foodAllboardView, setFoodallboardview] = useState([]);
  const [profile_image, setProfileImg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);


  const handleBoardClick = () => {
    setShowPopup(true);
  };
  const handleBoardcloseClick = () => {
    setShowPopup(false);
    setIsExiting(false);
  };

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/category/%EB%A7%9B%EC%A7%91', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setFoodallboardview(response.data);
        console.log("맛집 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("맛집 게시판 가져오기 실패", error.response);
      console.error(error);
    }
  };

  const gridItems = [
    { id: 1, profileImage: picturebasic, description: "전체 맛집인듯 아닌듯 몇번째 맛집일까요", write: "애햄이1" },
    { id: 2, profileImage: picturebasic, description: "두 번째 맛집", write: "애햄이2" },
    { id: 3, profileImage: picturebasic, description: "세 번째 맛집", write: "애햄이3" },
    { id: 4, profileImage: picturebasic, description: "네 번째 맛집", write: "애햄이4" },
    { id: 5, profileImage: picturebasic, description: "다섯 번째 맛집", write: "애햄이5" },
    { id: 6, profileImage: picturebasic, description: "여섯 번째 맛집", write: "애햄이6" },
  ];

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>전체</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>500000000 개의 글</p>
            <div style={{ width: "45vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ height: "2vh" }}></div>
      <div className='yellow-box-bottom'>
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%" }}>
          {foodAllboardView.map(item => (
            <div className='hang' key={item.id} style={{ border: '1.5px solid #ddd', borderRadius: '5px', padding: '1.5vh', textAlign: 'center', height: "20vh", alignItems: "center", justifyContent: "flex-start" }}>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                width: '12vh',
                height: '12vh',
                outline: "none",
                fontFamily: "HJ"
              }} onClick={() => { console.log(`클릭${item.id}`) }}>
                <img src={item.image} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.username}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={handleBoardClick}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "20vw",
                  border: "none",
                  outline: "none",
                  background: 'transparent',
                  fontFamily: "HJ"
                }}>
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.description}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>맛집에 대한 설명ㅇㅇㅇㅇㅇㅇㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </button>
            </div>
          ))}
        </div>
        <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
        {showPopup && (
          <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
            <div className="backg" style={{ width: "70vw", height: "70vh", borderRadius: "10px" }}>
              <div className="yellow-box" style={{ width: "68vw", height: "66vh", borderRadius: "10px" }}>
                <img src={gridItems[0].profileImage} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%' }} />
                <p style={{ fontSize: "23px", textAlign: "start" }}>{gridItems[0].description}</p>
                <p style={{ fontSize: "23px", textAlign: "start" }}>{gridItems[0].description}</p>
                <button className='trash-button' onClick={handleBoardcloseClick} >버리기!</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

function FoodSeoulContent({ selectedOption, handleChange }) {
  const [boardView, setboardview] = useState([]);
  const [profile_image, setProfileImg] = useState("");
  const gridItems = [
    { id: 1, profileImage: picturebasic, description: "서울 맛집인듯 아닌듯 몇번째 맛집일까요", write: "애햄이1" },
    { id: 2, profileImage: picturebasic, description: "두 번째 맛집", write: "애햄이2" },
    { id: 3, profileImage: picturebasic, description: "세 번째 맛집", write: "애햄이3" },
    { id: 4, profileImage: picturebasic, description: "네 번째 맛집", write: "애햄이4" },
    { id: 5, profileImage: picturebasic, description: "다섯 번째 맛집", write: "애햄이5" },
    { id: 6, profileImage: picturebasic, description: "여섯 번째 맛집", write: "애햄이6" },
  ];

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setboardview(response.data);
        console.log("게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("게시판 가져오기 실패", error.response);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>전체</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>500000000 개의 글</p>
            <div style={{ width: "45vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ height: "2vh" }}></div>
      <div className='yellow-box-bottom'>
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%" }}>
          {gridItems.map(item => (
            <div className='hang' key={item.id} style={{ border: '1.5px solid #ddd', borderRadius: '5px', padding: '1.5vh', textAlign: 'center', height: "20vh", alignItems: "center", justifyContent: "flex-start" }}>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                width: '12vh',
                height: '12vh',
                outline: "none",
                fontFamily: "HJ"
              }} onClick={() => { console.log(`클릭${item.id}`) }}>
                <img src={item.profileImage} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.write}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { console.log(`클릭${item.id}`) }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "20vw",
                  border: "none",
                  outline: "none",
                  background: 'transparent',
                  fontFamily: "HJ"
                }}>
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.description}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>맛집에 대한 설명ㅇㅇㅇㅇㅇㅇㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
};

function FoodGangContent({ selectedOption, handleChange }) {
  const [boardView, setboardview] = useState([]);
  const [profile_image, setProfileImg] = useState("");
  const gridItems = [
    { id: 1, profileImage: picturebasic, description: "강릉 맛집인듯 아닌듯 몇번째 맛집일까요", write: "애햄이1" },
    { id: 2, profileImage: picturebasic, description: "두 번째 맛집", write: "애햄이2" },
    { id: 3, profileImage: picturebasic, description: "세 번째 맛집", write: "애햄이3" },
    { id: 4, profileImage: picturebasic, description: "네 번째 맛집", write: "애햄이4" },
    { id: 5, profileImage: picturebasic, description: "다섯 번째 맛집", write: "애햄이5" },
    { id: 6, profileImage: picturebasic, description: "여섯 번째 맛집", write: "애햄이6" },
  ];

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setboardview(response.data);
        console.log("게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("게시판 가져오기 실패", error.response);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>전체</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>500000000 개의 글</p>
            <div style={{ width: "45vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ height: "2vh" }}></div>
      <div className='yellow-box-bottom'>
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%" }}>
          {gridItems.map(item => (
            <div className='hang' key={item.id} style={{ border: '1.5px solid #ddd', borderRadius: '5px', padding: '1.5vh', textAlign: 'center', height: "20vh", alignItems: "center", justifyContent: "flex-start" }}>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                width: '12vh',
                height: '12vh',
                outline: "none",
                fontFamily: "HJ"
              }} onClick={() => { console.log(`클릭${item.id}`) }}>
                <img src={item.profileImage} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.write}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { console.log(`클릭${item.id}`) }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "20vw",
                  border: "none",
                  outline: "none",
                  background: 'transparent',
                  fontFamily: "HJ"
                }}>
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.description}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>맛집에 대한 설명ㅇㅇㅇㅇㅇㅇㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
};

function FoodDaejeonContent({ selectedOption, handleChange }) {
  const [boardView, setboardview] = useState([]);
  const [profile_image, setProfileImg] = useState("");
  const gridItems = [
    { id: 1, profileImage: picturebasic, description: "대전 맛집인듯 아닌듯 몇번째 맛집일까요", write: "애햄이1" },
    { id: 2, profileImage: picturebasic, description: "두 번째 맛집", write: "애햄이2" },
    { id: 3, profileImage: picturebasic, description: "세 번째 맛집", write: "애햄이3" },
    { id: 4, profileImage: picturebasic, description: "네 번째 맛집", write: "애햄이4" },
    { id: 5, profileImage: picturebasic, description: "다섯 번째 맛집", write: "애햄이5" },
    { id: 6, profileImage: picturebasic, description: "여섯 번째 맛집", write: "애햄이6" },
  ];

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setboardview(response.data);
        console.log("게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("게시판 가져오기 실패", error.response);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>전체</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>500000000 개의 글</p>
            <div style={{ width: "45vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ height: "2vh" }}></div>
      <div className='yellow-box-bottom'>
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%" }}>
          {gridItems.map(item => (
            <div className='hang' key={item.id} style={{ border: '1.5px solid #ddd', borderRadius: '5px', padding: '1.5vh', textAlign: 'center', height: "20vh", alignItems: "center", justifyContent: "flex-start" }}>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                width: '12vh',
                height: '12vh',
                outline: "none",
                fontFamily: "HJ"
              }} onClick={() => { console.log(`클릭${item.id}`) }}>
                <img src={item.profileImage} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.write}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { console.log(`클릭${item.id}`) }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "20vw",
                  border: "none",
                  outline: "none",
                  background: 'transparent',
                  fontFamily: "HJ"
                }}>
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.description}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>맛집에 대한 설명ㅇㅇㅇㅇㅇㅇㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
};

function FoodDaeguContent({ selectedOption, handleChange }) {
  const [boardView, setboardview] = useState([]);
  const [profile_image, setProfileImg] = useState("");
  const gridItems = [
    { id: 1, profileImage: picturebasic, description: "대구 맛집인듯 아닌듯 몇번째 맛집일까요", write: "애햄이1" },
    { id: 2, profileImage: picturebasic, description: "두 번째 맛집", write: "애햄이2" },
    { id: 3, profileImage: picturebasic, description: "세 번째 맛집", write: "애햄이3" },
    { id: 4, profileImage: picturebasic, description: "네 번째 맛집", write: "애햄이4" },
    { id: 5, profileImage: picturebasic, description: "다섯 번째 맛집", write: "애햄이5" },
    { id: 6, profileImage: picturebasic, description: "여섯 번째 맛집", write: "애햄이6" },
  ];

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setboardview(response.data);
        console.log("게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("게시판 가져오기 실패", error.response);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>전체</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>500000000 개의 글</p>
            <div style={{ width: "45vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ height: "2vh" }}></div>
      <div className='yellow-box-bottom'>
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%" }}>
          {gridItems.map(item => (
            <div className='hang' key={item.id} style={{ border: '1.5px solid #ddd', borderRadius: '5px', padding: '1.5vh', textAlign: 'center', height: "20vh", alignItems: "center", justifyContent: "flex-start" }}>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                width: '12vh',
                height: '12vh',
                outline: "none",
                fontFamily: "HJ"
              }} onClick={() => { console.log(`클릭${item.id}`) }}>
                <img src={item.profileImage} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.write}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { console.log(`클릭${item.id}`) }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "20vw",
                  border: "none",
                  outline: "none",
                  background: 'transparent',
                  fontFamily: "HJ"
                }}>
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.description}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>맛집에 대한 설명ㅇㅇㅇㅇㅇㅇㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
};

function FoodBusanContent({ selectedOption, handleChange }) {
  const [boardView, setboardview] = useState([]);
  const [profile_image, setProfileImg] = useState("");
  const gridItems = [
    { id: 1, profileImage: picturebasic, description: "부산 맛집인듯 아닌듯 몇번째 맛집일까요", write: "애햄이1" },
    { id: 2, profileImage: picturebasic, description: "두 번째 맛집", write: "애햄이2" },
    { id: 3, profileImage: picturebasic, description: "세 번째 맛집", write: "애햄이3" },
    { id: 4, profileImage: picturebasic, description: "네 번째 맛집", write: "애햄이4" },
    { id: 5, profileImage: picturebasic, description: "다섯 번째 맛집", write: "애햄이5" },
    { id: 6, profileImage: picturebasic, description: "여섯 번째 맛집", write: "애햄이6" },
  ];

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setboardview(response.data);
        console.log("게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("게시판 가져오기 실패", error.response);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>전체</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>500000000 개의 글</p>
            <div style={{ width: "45vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ height: "2vh" }}></div>
      <div className='yellow-box-bottom'>
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%" }}>
          {gridItems.map(item => (
            <div className='hang' key={item.id} style={{ border: '1.5px solid #ddd', borderRadius: '5px', padding: '1.5vh', textAlign: 'center', height: "20vh", alignItems: "center", justifyContent: "flex-start" }}>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                width: '12vh',
                height: '12vh',
                outline: "none",
                fontFamily: "HJ"
              }} onClick={() => { console.log(`클릭${item.id}`) }}>
                <img src={item.profileImage} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.write}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { console.log(`클릭${item.id}`) }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "20vw",
                  border: "none",
                  outline: "none",
                  background: 'transparent',
                  fontFamily: "HJ"
                }}>
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.description}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>맛집에 대한 설명ㅇㅇㅇㅇㅇㅇㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
};

function FoodJejuContent({ selectedOption, handleChange }) {
  const [boardView, setboardview] = useState([]);
  const [profile_image, setProfileImg] = useState("");
  const gridItems = [
    { id: 1, profileImage: picturebasic, description: "기타 맛집인듯 아닌듯 몇번째 맛집일까요", write: "애햄이1" },
    { id: 2, profileImage: picturebasic, description: "두 번째 맛집", write: "애햄이2" },
    { id: 3, profileImage: picturebasic, description: "세 번째 맛집", write: "애햄이3" },
    { id: 4, profileImage: picturebasic, description: "네 번째 맛집", write: "애햄이4" },
    { id: 5, profileImage: picturebasic, description: "다섯 번째 맛집", write: "애햄이5" },
    { id: 6, profileImage: picturebasic, description: "여섯 번째 맛집", write: "애햄이6" },
  ];

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setboardview(response.data);
        console.log("게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("게시판 가져오기 실패", error.response);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>전체</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>500000000 개의 글</p>
            <div style={{ width: "45vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ height: "2vh" }}></div>
      <div className='yellow-box-bottom'>
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%" }}>
          {gridItems.map(item => (
            <div className='hang' key={item.id} style={{ border: '1.5px solid #ddd', borderRadius: '5px', padding: '1.5vh', textAlign: 'center', height: "20vh", alignItems: "center", justifyContent: "flex-start" }}>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                width: '12vh',
                height: '12vh',
                outline: "none",
                fontFamily: "HJ"
              }} onClick={() => { console.log(`클릭${item.id}`) }}>
                <img src={item.profileImage} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.write}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { console.log(`클릭${item.id}`) }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "20vw",
                  border: "none",
                  outline: "none",
                  background: 'transparent',
                  fontFamily: "HJ"
                }}>
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.description}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>맛집에 대한 설명ㅇㅇㅇㅇㅇㅇㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
};

function FoodElseContent({ selectedOption, handleChange }) {
  const [boardView, setboardview] = useState([]);
  const [profile_image, setProfileImg] = useState("");
  const gridItems = [
    { id: 1, profileImage: picturebasic, description: "기타 맛집인듯 아닌듯 몇번째 맛집일까요", write: "애햄이1" },
    { id: 2, profileImage: picturebasic, description: "두 번째 맛집", write: "애햄이2" },
    { id: 3, profileImage: picturebasic, description: "세 번째 맛집", write: "애햄이3" },
    { id: 4, profileImage: picturebasic, description: "네 번째 맛집", write: "애햄이4" },
    { id: 5, profileImage: picturebasic, description: "다섯 번째 맛집", write: "애햄이5" },
    { id: 6, profileImage: picturebasic, description: "여섯 번째 맛집", write: "애햄이6" },
  ];

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setboardview(response.data);
        console.log("게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("게시판 가져오기 실패", error.response);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>전체</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>500000000 개의 글</p>
            <div style={{ width: "45vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ height: "2vh" }}></div>
      <div className='yellow-box-bottom'>
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%" }}>
          {gridItems.map(item => (
            <div className='hang' key={item.id} style={{ border: '1.5px solid #ddd', borderRadius: '5px', padding: '1.5vh', textAlign: 'center', height: "20vh", alignItems: "center", justifyContent: "flex-start" }}>
              <button style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                width: '12vh',
                height: '12vh',
                outline: "none",
                fontFamily: "HJ"
              }} onClick={() => { console.log(`클릭${item.id}`) }}>
                <img src={item.profileImage} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.write}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { console.log(`클릭${item.id}`) }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "20vw",
                  border: "none",
                  outline: "none",
                  background: 'transparent',
                  fontFamily: "HJ"
                }}>
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.description}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>맛집에 대한 설명ㅇㅇㅇㅇㅇㅇㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
};
export default Notice;
