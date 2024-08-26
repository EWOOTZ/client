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
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';


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
      <div className='white-box-bottom'>
        <div style={{ height: "60vh", width: "42vw", paddingLeft: "3px" }}>
          <p style={{ width: "43vw", height: "3vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>글제목</p>
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
            <p style={{ height: "2.95vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>글쓰니</p>
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
          <p style={{ height: "3vh", width: "10vw", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>작성일</p>
          <hr style={{ border: "0.2px solid black", width: "100%" }} />
          <div>
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

function FoodAllContent({ selectedOption, handleChange }) {
  const [profile_image, setProfileImg] = useState("");

  const gridItems = [
    { id: 1, profileImage: picturebasic, description: "첫 번째 맛집인듯 아닌듯 몇번째 맛집일까요", write: "애햄이1" },
    { id: 2, profileImage: picturebasic, description: "두 번째 맛집", write: "애햄이2" },
    { id: 3, profileImage: picturebasic, description: "세 번째 맛집", write: "애햄이3" },
    { id: 4, profileImage: picturebasic, description: "네 번째 맛집", write: "애햄이4" },
    { id: 5, profileImage: picturebasic, description: "다섯 번째 맛집", write: "애햄이5" },
    { id: 6, profileImage: picturebasic, description: "여섯 번째 맛집", write: "애햄이6" },
  ];

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
              <div>
                <img src={item.profileImage} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A" }}>{item.write}</p>
              </div>
              <div style={{ width: "1.5vw" }}></div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", flexDirection: "column", height: "100%", width:"21.5vw"}}>
                <p className='hide' style={{ fontSize: "23px",  WebkitLineClamp: 1, textAlign:"start" }}>{item.description}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{fontSize: "16px", color: "#8A8A8A", textAlign:"start"}}>맛집에 대한 설명ㅇㅇㅇㅇㅇㅇㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
};

const FoodSeoulContent = () => (
  <div>
    <h2>맛집 탐방 카테고리</h2>
    <p>여기는 서울 맛집 탐방에 대한 내용이 표시됩니다.</p>
  </div>
);

const FoodGangContent = () => (
  <div>
    <h2>맛집 탐방 카테고리</h2>
    <p>여기는 강릉 맛집 탐방에 대한 내용이 표시됩니다.</p>
  </div>
);

const FoodDaejeonContent = () => (
  <div>
    <h2>맛집 탐방 카테고리</h2>
    <p>여기는 대전 맛집 탐방에 대한 내용이 표시됩니다.</p>
  </div>
);

const FoodDaeguContent = () => (
  <div>
    <h2>맛집 탐방 카테고리</h2>
    <p>여기는 대구 맛집 탐방에 대한 내용이 표시됩니다.</p>
  </div>
);

const FoodBusanContent = () => (
  <div>
    <h2>맛집 탐방 카테고리</h2>
    <p>여기는 부산맛집 탐방에 대한 내용이 표시됩니다.</p>
  </div>
);

const FoodJejuContent = () => (
  <div>
    <h2>맛집 탐방 카테고리</h2>
    <p>여기는 제주 맛집 탐방에 대한 내용이 표시됩니다.</p>
  </div>
);
export default Notice;
