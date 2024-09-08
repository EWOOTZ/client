/* eslint-disable */
import React, { useState ,useMemo} from 'react';
import './App.css';
import './Letter.css';
import notice_pencil from './assets/notice_pencil.png';
import notice_chart from './assets/notice_chart.png';
import notice_search from './assets/notice_search.png';
import notice_love from './assets/notice_love.png';
import picturePin from './images/pin.png';
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Write from './write';

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
  const [selectTitle, setSelectTitle] = useState(''); // 초기값 빈 문자열로 설정
  const [searchBoardView, setSearchboardview] = useState([]);

 // 검색어를 설정하는 함수
 const handleSearchInputChange = (event) => {
  setSelectTitle(event.target.value);
};

const getTitle = async () => {
  try {
    const response = await axios.get(`/board/search/${selectTitle}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      const searchData = response.data.map((item) => ({
        title: item.title,
        username: item.username,
        date: item.date,
        contents:item.contents,
        views: item.views, 
        id: item.id,
        image: item.image
      }));
      console.log("게시글 검색 성공", searchData);
      setSearchboardview(searchData); 
    
      setSelectedCategory('SearchTitle'); 
    }
  } catch (error) {
    console.error("게시글 검색 실패", error.response);
  }
};

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

  useEffect(() => {
    const handlePopState = (event) => {
        window.history.pushState(null, null, window.location.pathname); // 현재 URL 유지
    };
    window.history.pushState(null, null, window.location.pathname); // 현재 상태를 pushState로 추가
    window.addEventListener('popstate', handlePopState);
    return () => {
        window.removeEventListener('popstate', handlePopState);
    };
}, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected:', event.target.value); // 선택된 값을 로그로 출력
  };

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 'SearchTitle':
        return <SearchTitle searchBoardView={searchBoardView} selectedOption={selectedOption} handleChange={handleChange} />;
      case 'daily':
        return <DailyContent selectedOption={selectedOption} handleChange={handleChange} />; 
      case 'food':
        return <FoodAllContent selectedOption={selectedOption} handleChange={handleChange} />
      case 'foodSeoul':
        return <FoodSeoulContent  selectedOption={selectedOption} handleChange={handleChange} />;
      case 'foodGang':
        return <FoodGangContent selectedOption={selectedOption} handleChange={handleChange}  />;
      case 'foodDaejeon':
        return <FoodDaejeonContent selectedOption={selectedOption} handleChange={handleChange}  />;
      case 'foodDaegu':
        return <FoodDaeguContent  selectedOption={selectedOption} handleChange={handleChange} />;
      case 'foodBusan':
        return <FoodBusanContent  selectedOption={selectedOption} handleChange={handleChange} />;
      case 'foodJeju':
        return <FoodJejuContent  selectedOption={selectedOption} handleChange={handleChange} />;
      case 'foodElse':
        return <FoodElseContent  selectedOption={selectedOption} handleChange={handleChange} />;
      default:
        return <DailyContent selectedOption={selectedOption} handleChange={handleChange} />;    }
  };

  const navigate = useNavigate();

  return (
    <div className='white-line'>
      <div className='hang'>
        <div className='notice-gray-box'>
          <div style={{ height: "6vh" }}></div>
          <button className="go-ground-gray" style={{ fontSize: "15px", alignItems:"flex-start", width:"23vw" }} onClick={() => navigate(`/ground/${localStorage.getItem("username")}`)}>광장가기</button>
          <div className="hang" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "17vh", width: "100%" }}>
            <div style={{ width: "1vh" }}></div>
            <input 
              className='input-search' 
              style={{ width: "10vw", fontSize: "15px" }} 
              type='text'  placeholder='검색' value={selectTitle} onChange={handleSearchInputChange} onKeyPress={(e) => {
               if (e.key === 'Enter') {
                 getTitle();}}}/>
     <div style={{ width: "0.5vw" }}></div>
            <img  src={notice_search} alt="notice_search" style={{ width: "1.7vw", cursor: "pointer" }} 
              onClick={getTitle} 
            />
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
function SearchTitle({ searchBoardView, selectedOption, handleChange }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleButtonClick = (searchboard) => {
    setSelectedItem(searchboard);
    setShowPopup(true);
  };
  const handleBoardcloseClick = () => {
    setShowPopup(false);
    setIsExiting(false);
  };
  const sortedBoardView = useMemo(() => {
    const sorted = [...searchBoardView];
    switch (selectedOption) {
      case 'latest':
        return sorted.sort((a, b) =>new Date(b.date) - new Date(a.date) || b.id - a.id); // 최신순, 동일 날짜는 id로
      case 'oldest':
        return sorted.sort((a, b) =>  new Date(a.date) - new Date(b.date) || a.id - b.id); 
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views); 
      default:
        return sorted;
    }
  }, [searchBoardView, selectedOption]);
  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.7vh", fontSize: "19px" }}>검색 결과</p>
            <p style={{ paddingLeft: "2vh", paddingTop: "0.8vh", fontSize: "16px" }}>{`${sortedBoardView.length} 개의 글`}</p>
            <div style={{ width: "46vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{height:"2vh"}}></div>
      <div className='yellow-box-bottom'>
        <div className='white-box-bottom'>
          <div style={{ height: "60vh", width: "42vw", paddingLeft: "3px" }}>
            <p style={{ width: "43vw", height: "3vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>글제목</p>          
            <hr style={{ border: "0.2px solid black", width: "100%" }} />
            {sortedBoardView.map((searchboard) => (
              <div key={searchboard.title} style={{ cursor: 'pointer' }}>
                <p
                  style={{ paddingLeft: "1vw", margin: 0, cursor: 'pointer' }}
                  onClick={() => handleButtonClick(searchboard)}
                >
                  {searchboard.title}
                </p>
                <hr style={{ border: "0.2px solid gray", width: "100%" }} />
              </div>
            ))}
          </div>
          <div style={{ height: "60vh", width: "15vw" }}>
            <div className="hang" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
              <p style={{ height: "2.95vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>글쓰니</p>
              <img src={notice_love} alt="notice_love" />
            </div>
            <hr style={{ border: "0.2px solid black", width: "100%" }} />
            <div>
              {sortedBoardView.map((searchboard) => (
                <div key={searchboard.id}>
                  <p style={{ display: "flex", justifyContent: "center" }}>{searchboard.username}</p>
                  <hr style={{ border: "0.2px solid gray", width: "100%" }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: "60vh", width: "10vw" }}>
            <p style={{ height: "3vh", width: "10vw", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>작성일</p>
            <hr style={{ border: "0.2px solid black", width: "100%" }} />
            <div>
              {sortedBoardView.map((searchboard) => (
                <div key={searchboard.id}>
                  <p style={{ display: "flex", justifyContent: "center" }}>{searchboard.date}</p>
                  <hr style={{ border: "0.2px solid gray", width: "100%" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
      {showPopup && (
        <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
          <div className="backg" style={{ width: "70vw", height: "72vh", borderRadius: "10px" }}>
            <div className='column-container'>
              <div className="yellow-box" style={{ width: "65vw", height: "8vh", borderRadius: "10px"}}>
                <div className="hang" style={{marginLeft:'10px', fontSize:'19px', display: "flex", justifyContent: "start", alignItems: "start", width: "100%", paddingLeft:"30px", paddingBottom:"15px" }}>
                  <p>제목: {selectedItem.title}</p>
                  <button onClick={handleBoardcloseClick} className="close-button" style={{paddingLeft:'12px'}}>X</button>
                </div>
              </div>
              <div style={{ height: "1vh" }}></div>
              <div className="yellow-box" style={{ width: "65vw", height: "57vh", borderRadius: "10px", overflow: "hidden", overflowY: "auto" }}>
                <div>
                  <img src={selectedItem.image} style={{ width: "30vw", height: "30vh" }} />
                  <div style={{ height: "1vh" }}></div>
                </div>
                <div>
                  <p style={{ marginLeft:'10px', fontSize:'22px', display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    {selectedItem.username}
                    <img src={notice_love} alt="notice_love" />
                  </p>
                </div>
                <div style={{ padding:'10px', fontSize:'17px', display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                  <p>{selectedItem.contents}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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

  const sortedDailyView = useMemo(() => {
    const sorted = [...dailyboardView];
    switch (selectedOption) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id); // 최신순, 동일 날짜는 id로
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date) || a.id - b.id); 
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views);
      default:
        return sorted;
    }
  }, [dailyboardView, selectedOption]);
  

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>일상</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>{`${dailyboardView.length} 개의 글`}</p>
            <div style={{ width: "50vw" }}></div>
            <select value={selectedOption} onChange={handleChange} className="custom-select" style={{ display: "flex", justifyContent: "flex-end", fontFamily: "HJ", padding: "1vh", fontSize: "14px" }}>
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
            {sortedDailyView.map((dailyboard) => (
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
           <button onClick={handleBoardcloseClick} className="close-button" style={{paddingLeft:'12px'}}>X</button></div>
            </div>
            <div style={{ height: "1vh" }}></div>
            <div className="yellow-box" style={{ width: "65vw", height: "57vh", borderRadius: "10px", overflow: "hidden",  overflowY: "auto"  }}>  <div>
         <img src={selectedItem.image} style={{ width: "30vw", height: "35vh", paddingBottom:"15px" }} />
         <div style={{ height: "1vh" }}></div></div><div>
        <p style={{ paddingBottom:"10px" ,marginLeft:'10px', fontSize:'22px', display: "flex", justifyContent: "center", alignItems: "center", width: "100%", }}>
          {selectedItem.username}
          <img src={notice_love} alt="notice_love" /> </p></div>
         <div style={{ padding:'10px',fontSize:'17px', display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <p>{selectedItem.contents} </p></div></div>
           </div>    </div> </div>  )}</div></div>
          </div>
          <div style={{ height: "60vh", width: "15vw" }}>
            <div className="hang" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
              <p style={{ height: "2.95vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>글쓰니</p>
              <img src={notice_love} alt="notice_love" />
            </div>
            <hr style={{ border: "0.2px solid black", width: "100%" }} />
            <div>
              {sortedDailyView.map((dailyboard) => (
                <div key={dailyboard.id}>
                  <p style={{ display: "flex", justifyContent: "center" }}>{dailyboard.username}</p>
                  <hr style={{ border: "0.2px solid gray", width: "100%" }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: "60vh", width: "10vw" }}>
            <p style={{ height: "3vh", width: "10vw", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>작성일</p>
            <hr style={{ border: "0.2px solid black", width: "100%" }} />
            <div>
              {sortedDailyView.map((dailyboard) => (
                <div key={dailyboard.id}>
                  <p style={{ display: "flex", justifyContent: "center" }}>{dailyboard.date}</p>
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
  const [oneboardView, setoneboardview] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getpostBoard = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/board/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setoneboardview(response.data);
        console.log("특정 맛집 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("특정 맛집 게시판 가져오기 실패", error.response);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBoardClick = async (itemId) => {
    try {
      await getpostBoard(itemId);
      setShowPopup(true);
    } catch (error) {
      console.error('게시판 가져오기 실패', error);
    }
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

  useEffect(() => {
    getBoard('latest'); // 초기값은 최신순으로 설정
  }, []);

  const sortedFoodAllboardView = useMemo(() => {
    const sorted = [...foodAllboardView];
    switch (selectedOption) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id); // 최신순, 동일 날짜는 id로
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date) || a.id - b.id); 
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views);
      default:
        return sorted;
    }
  }, [foodAllboardView, selectedOption]);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>맛집</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>{`${foodAllboardView.length}  개의 글`}</p>
            <div style={{ width: "50vw" }}></div>
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
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%", alignItems: "flex-start" }}>
          {sortedFoodAllboardView.map(item => (
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
              }}>
                <img src={item.image} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.username}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => {
                handleBoardClick(item.id);
              }}
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
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.title}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>{item.contents}</p>
              </button>
            </div>
          ))}
        </div>
        <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
        {showPopup && (
          <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
            <div className="backg" style={{ width: "70vw", height: "70vh", borderRadius: "10px", padding: "2vh" }}>
              <div style={{ width: "100%", height: "100%", backgroundColor: "#FFF8EF", borderRadius: "10px", overflowY: "auto", padding: "2vh" }}>
                {isLoading ? (
                  <p>로딩 중...</p>
                ) : oneboardView ? (
                  <>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                      <img src={oneboardView.image} alt="Profile" style={{ width: '40vh', height: '40vh', marginBottom: "5vh", paddingTop: "2vh" }} />
                    </div>
                    <div style={{ flexDirection: "column", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p style={{ fontSize: "40px", textAlign: "start", marginBottom: "1vh" }}>{oneboardView.title}</p>
                      <p style={{ fontSize: "17px", textAlign: "start", marginBottom: "5vh" }}>{`글쓰니 : ${oneboardView.username}`}</p>
                      <p style={{ fontSize: "25px", textAlign: "start", marginBottom: "5vh" }}>{oneboardView.contents}</p>
                    </div>
                  </>
                ) : (
                  <p>내용이 없습니다</p>
                )}
                <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                  <button style={{ backgroundColor: "transparent", fontFamily: "HJ", fontSize: "22px", border: "none" }} onClick={handleBoardcloseClick}>닫기!</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function FoodSeoulContent({ selectedOption, handleChange }) {
  const [foodSeoulboardView, setFoodseoulboardview] = useState([]);
  const [oneboardView, setoneboardview] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getpostBoard = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/board/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setoneboardview(response.data);
        console.log("특정 맛집 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("특정 맛집 게시판 가져오기 실패", error.response);
      console.error(error);
    } finally{
      setIsLoading(false);
    }
  };

  const handleBoardClick = async (itemId) => {
    try{
      await getpostBoard(itemId);
      setShowPopup(true);
    }catch(error){
      console.error('게시판 가져오기 실패', error);
    }
  };

  const handleBoardcloseClick = () => {
    setShowPopup(false);
    setIsExiting(false);
  };

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/location/%EC%84%9C%EC%9A%B8', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setFoodseoulboardview(response.data);
        console.log("서울 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("서울 게시판 가져오기 실패", error.response);
      console.error(error);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  const sortedSeoulboardView = useMemo(() => {
    const sorted = [...foodSeoulboardView];
    switch (selectedOption) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id); // 최신순, 동일 날짜는 id로
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date) || a.id - b.id); 
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views);
      default:
        return sorted;
    }
  }, [foodSeoulboardView, selectedOption]);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>서울</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>{`${foodSeoulboardView.length}  개의 글`}</p>
            <div style={{ width: "50vw" }}></div>
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
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%", alignItems: "flex-start" }}>
          {sortedSeoulboardView.map(item => (
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
              }}>
                <img src={item.image} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.username}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => {  handleBoardClick(item.id); }}
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
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.title}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>{item.contents}</p>
              </button>
            </div>
          ))}
        </div>
        <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
        {showPopup && (
      <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
        <div className="backg" style={{ width: "70vw", height: "70vh", borderRadius: "10px", padding: "2vh" }}>
          <div style={{ width: "100%", height: "100%", backgroundColor: "#FFF8EF", borderRadius: "10px", overflowY: "auto", padding: "2vh" }}>
            {isLoading ? (
              <p>로딩 중...</p> // 로딩 중임을 사용자에게 표시
            ) : oneboardView ? (
              <>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <img src={oneboardView.image} alt="Profile" style={{ width: '40vh', height: '40vh', marginBottom: "5vh", paddingTop: "2vh" }} />
                </div>
                <div style={{ flexDirection: "column", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: "40px", textAlign: "start", marginBottom: "1vh" }}>{oneboardView.title}</p>
                  <p style={{ fontSize: "17px", textAlign: "start", marginBottom: "5vh" }}>{`글쓰니 : ${oneboardView.username}`}</p>
                  <p style={{ fontSize: "25px", textAlign: "start", marginBottom: "5vh" }}>{oneboardView.contents}</p>
                </div>
              </>
            ) : (
              <p>내용이 없습니다</p> // 데이터가 없는 경우 처리
            )}
            <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <button style={{ backgroundColor: "transparent", fontFamily: "HJ", fontSize: "22px", border: "none" }} onClick={handleBoardcloseClick}>닫기!</button>
            </div>
          </div>
        </div>
      </div>
    )}
      </div>
    </div>
  )
};

function FoodGangContent({ selectedOption, handleChange }) {
  const [foodGangboardView, setFoodGangboardview] = useState([]);
  const [oneboardView, setoneboardview] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getpostBoard = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/board/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setoneboardview(response.data);
        console.log("특정 맛집 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("특정 맛집 게시판 가져오기 실패", error.response);
      console.error(error);
    } finally{
      setIsLoading(false);
    }
  };

  const handleBoardClick = async (itemId) => {
    try{
      await getpostBoard(itemId);
      setShowPopup(true);
    }catch(error){
      console.error('게시판 가져오기 실패', error);
    }
  };

  const handleBoardcloseClick = () => {
    setShowPopup(false);
    setIsExiting(false);
  };

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/location/%EA%B0%95%EB%A6%89', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setFoodGangboardview(response.data);
        console.log("강릉 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("강릉 게시판 가져오기 실패", error.response);
      console.error(error);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  const sortedGangView = useMemo(() => {
    const sorted = [...foodGangboardView];
    switch (selectedOption) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id); // 최신순, 동일 날짜는 id로
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date) || a.id - b.id); 
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views);
      default:
        return sorted;
    }
  }, [foodGangboardView, selectedOption]);
  
  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>강릉</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>{`${foodGangboardView.length}  개의 글`}</p>
            <div style={{ width: "50vw" }}></div>
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
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%", alignItems: "flex-start" }}>
          {sortedGangView.map(item => (
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
              }}>
                <img src={item.image} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.username}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { handleBoardClick(item.id); }}
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
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.title}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>{item.contents}</p>
              </button>
            </div>
          ))}
        </div>
        <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
        {showPopup && (
      <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
        <div className="backg" style={{ width: "70vw", height: "70vh", borderRadius: "10px", padding: "2vh" }}>
          <div style={{ width: "100%", height: "100%", backgroundColor: "#FFF8EF", borderRadius: "10px", overflowY: "auto", padding: "2vh" }}>
            {isLoading ? (
              <p>로딩 중...</p> // 로딩 중임을 사용자에게 표시
            ) : oneboardView ? (
              <>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <img src={oneboardView.image} alt="Profile" style={{ width: '40vh', height: '40vh', marginBottom: "5vh", paddingTop: "2vh" }} />
                </div>
                <div style={{ flexDirection: "column", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: "40px", textAlign: "start", marginBottom: "1vh" }}>{oneboardView.title}</p>
                  <p style={{ fontSize: "17px", textAlign: "start", marginBottom: "5vh" }}>{`글쓰니 : ${oneboardView.username}`}</p>
                  <p style={{ fontSize: "25px", textAlign: "start", marginBottom: "5vh" }}>{oneboardView.contents}</p>
                </div>
              </>
            ) : (
              <p>내용이 없습니다</p> // 데이터가 없는 경우 처리
            )}
            <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <button style={{ backgroundColor: "transparent", fontFamily: "HJ", fontSize: "22px", border: "none" }} onClick={handleBoardcloseClick}>닫기!</button>
            </div>
          </div>
        </div>
      </div>
    )}
      </div>
    </div>
  )
};

function FoodDaejeonContent({ selectedOption, handleChange }) {
  const [foodDaejeonboardView, setFoodDaejeonboardview] = useState([]);
  const [oneboardView, setoneboardview] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const getpostBoard = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/board/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setoneboardview(response.data);
        console.log("특정 맛집 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("특정 맛집 게시판 가져오기 실패", error.response);
      console.error(error);
    } finally{
      setIsLoading(false);
    }
  };

  const handleBoardClick = async (itemId) => {
    try{
      await getpostBoard(itemId);
      setShowPopup(true);
    }catch(error){
      console.error('게시판 가져오기 실패', error);
    }
  };

  const handleBoardcloseClick = () => {
    setShowPopup(false);
    setIsExiting(false);
  };

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/location/%EB%8C%80%EC%A0%84', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setFoodDaejeonboardview(response.data);
        console.log("대전 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("대전 게시판 가져오기 실패", error.response);
      console.error(error);
    }
  };


  useEffect(() => {
    getBoard();
  }, []);

  const sortedDaejeonView = useMemo(() => {
    const sorted = [...foodDaejeonboardView];
    switch (selectedOption) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id); // 최신순, 동일 날짜는 id로
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date) || a.id - b.id); 
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views);
      default:
        return sorted;
    }
  }, [foodDaejeonboardView, selectedOption]);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>대전</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>{`${foodDaejeonboardView.length}  개의 글`}</p>
            <div style={{ width: "50vw" }}></div>
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
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%", alignItems: "flex-start" }}>
          {sortedDaejeonView.map(item => (
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
              }} >
                <img src={item.image} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.username}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { handleBoardClick(item.id); }}
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
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.title}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>{item.contents}</p>
              </button>
            </div>
          ))}
        </div>
        <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
        {showPopup && (
      <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
        <div className="backg" style={{ width: "70vw", height: "70vh", borderRadius: "10px", padding: "2vh" }}>
          <div style={{ width: "100%", height: "100%", backgroundColor: "#FFF8EF", borderRadius: "10px", overflowY: "auto", padding: "2vh" }}>
            {isLoading ? (
              <p>로딩 중...</p> // 로딩 중임을 사용자에게 표시
            ) : oneboardView ? (
              <>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <img src={oneboardView.image} alt="Profile" style={{ width: '40vh', height: '40vh', marginBottom: "5vh", paddingTop: "2vh" }} />
                </div>
                <div style={{ flexDirection: "column", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: "40px", textAlign: "start", marginBottom: "1vh" }}>{oneboardView.title}</p>
                  <p style={{ fontSize: "17px", textAlign: "start", marginBottom: "5vh" }}>{`글쓰니 : ${oneboardView.username}`}</p>
                  <p style={{ fontSize: "25px", textAlign: "start", marginBottom: "5vh" }}>{oneboardView.contents}</p>
                </div>
              </>
            ) : (
              <p>내용이 없습니다</p> // 데이터가 없는 경우 처리
            )}
            <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <button style={{ backgroundColor: "transparent", fontFamily: "HJ", fontSize: "22px", border: "none" }} onClick={handleBoardcloseClick}>닫기!</button>
            </div>
          </div>
        </div>
      </div>
    )}
      </div>
    </div>
  )
};

function FoodDaeguContent({ selectedOption, handleChange }) {
  const [foodDaeguboardView, setFoodDaeguboardview] = useState([]);
  const [oneboardView, setoneboardview] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const getpostBoard = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/board/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setoneboardview(response.data);
        console.log("특정 맛집 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("특정 맛집 게시판 가져오기 실패", error.response);
      console.error(error);
    } finally{
      setIsLoading(false);
    }
  };

  const handleBoardClick = async (itemId) => {
    try{
      await getpostBoard(itemId);
      setShowPopup(true);
    }catch(error){
      console.error('게시판 가져오기 실패', error);
    }
  };

  const handleBoardcloseClick = () => {
    setShowPopup(false);
    setIsExiting(false);
  };

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/location/%EB%8C%80%EA%B5%AC', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setFoodDaeguboardview(response.data);
        console.log("대구 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("대구 게시판 가져오기 실패", error.response);
      console.error(error);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  const sortedDaeguView = useMemo(() => {
    const sorted = [...foodDaeguboardView];
    switch (selectedOption) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id); // 최신순, 동일 날짜는 id로
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date) || a.id - b.id); 
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views);
      default:
        return sorted;
    }
  }, [foodDaeguboardView, selectedOption]);
  
  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>대구</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>{`${foodDaeguboardView.length}  개의 글`}</p>
            <div style={{ width: "50vw" }}></div>
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
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%", alignItems:"flex-start" }}>
          {sortedDaeguView.map(item => (
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
              }}>
                <img src={item.image} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.username}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { handleBoardClick(item.id); }}
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
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.title}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>{item.contents}</p>
              </button>
            </div>
          ))}

        </div>
        <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
        {showPopup && (
      <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
        <div className="backg" style={{ width: "70vw", height: "70vh", borderRadius: "10px", padding: "2vh" }}>
          <div style={{ width: "100%", height: "100%", backgroundColor: "#FFF8EF", borderRadius: "10px", overflowY: "auto", padding: "2vh" }}>
            {isLoading ? (
              <p>로딩 중...</p> // 로딩 중임을 사용자에게 표시
            ) : oneboardView ? (
              <>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <img src={oneboardView.image} alt="Profile" style={{ width: '40vh', height: '40vh', marginBottom: "5vh", paddingTop: "2vh" }} />
                </div>
                <div style={{ flexDirection: "column", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: "40px", textAlign: "start", marginBottom: "1vh" }}>{oneboardView.title}</p>
                  <p style={{ fontSize: "17px", textAlign: "start", marginBottom: "5vh" }}>{`글쓰니 : ${oneboardView.username}`}</p>
                  <p style={{ fontSize: "25px", textAlign: "start", marginBottom: "5vh" }}>{oneboardView.contents}</p>
                </div>
              </>
            ) : (
              <p>내용이 없습니다</p> // 데이터가 없는 경우 처리
            )}
            <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <button style={{ backgroundColor: "transparent", fontFamily: "HJ", fontSize: "22px", border: "none" }} onClick={handleBoardcloseClick}>닫기!</button>
            </div>
          </div>
        </div>
      </div>
    )}
      </div>
    </div>
  )
};

function FoodBusanContent({ selectedOption, handleChange }) {
  const [foodBusanboardView, setFoodBusanboardview] = useState([]);
  const [oneboardView, setoneboardview] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const getpostBoard = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/board/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setoneboardview(response.data);
        console.log("특정 맛집 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("특정 맛집 게시판 가져오기 실패", error.response);
      console.error(error);
    } finally{
      setIsLoading(false);
    }
  };

  const handleBoardClick = async (itemId) => {
    try{
      await getpostBoard(itemId);
      setShowPopup(true);
    }catch(error){
      console.error('게시판 가져오기 실패', error);
    }
  };

  const handleBoardcloseClick = () => {
    setShowPopup(false);
    setIsExiting(false);
  };

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/location/%EB%B6%80%EC%82%B0', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setFoodBusanboardview(response.data);
        console.log("부산 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("부산 게시판 가져오기 실패", error.response);
      console.error(error);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  const sortedBusanView = useMemo(() => {
    const sorted = [...foodBusanboardView];
    switch (selectedOption) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id); // 최신순, 동일 날짜는 id로
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date) || a.id - b.id); 
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views);
      default:
        return sorted;
    }
  }, [foodBusanboardView, selectedOption]);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>부산</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>{`${foodBusanboardView.length}  개의 글`}</p>
            <div style={{ width: "50vw" }}></div>
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
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%", alignItems:"flex-start" }}>
          {sortedBusanView.map(item => (
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
              }}>
                <img src={item.image} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.username}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => { handleBoardClick(item.id);}}
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
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.title}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>{item.contents}</p>
              </button>
            </div>
          ))}

        </div>
        <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
        {showPopup && (
      <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
        <div className="backg" style={{ width: "70vw", height: "70vh", borderRadius: "10px", padding: "2vh" }}>
          <div style={{ width: "100%", height: "100%", backgroundColor: "#FFF8EF", borderRadius: "10px", overflowY: "auto", padding: "2vh" }}>
            {isLoading ? (
              <p>로딩 중...</p> // 로딩 중임을 사용자에게 표시
            ) : oneboardView ? (
              <>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <img src={oneboardView.image} alt="Profile" style={{ width: '40vh', height: '40vh', marginBottom: "5vh", paddingTop: "2vh" }} />
                </div>
                <div style={{ flexDirection: "column", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: "40px", textAlign: "start", marginBottom: "1vh" }}>{oneboardView.title}</p>
                  <p style={{ fontSize: "17px", textAlign: "start", marginBottom: "5vh" }}>{`글쓰니 : ${oneboardView.username}`}</p>
                  <p style={{ fontSize: "25px", textAlign: "start", marginBottom: "5vh" }}>{oneboardView.contents}</p>
                </div>
              </>
            ) : (
              <p>내용이 없습니다</p> // 데이터가 없는 경우 처리
            )}
            <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <button style={{ backgroundColor: "transparent", fontFamily: "HJ", fontSize: "22px", border: "none" }} onClick={handleBoardcloseClick}>닫기!</button>
            </div>
          </div>
        </div>
      </div>
    )}
      </div>
    </div>
  )
};

function FoodJejuContent({ selectedOption, handleChange }) {
  const [foodJejuboardView, setFoodJejuboardview] = useState([]);
  const [oneboardView, setoneboardview] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const getpostBoard = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/board/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setoneboardview(response.data);
        console.log("특정 맛집 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("특정 맛집 게시판 가져오기 실패", error.response);
      console.error(error);
    } finally{
      setIsLoading(false);
    }
  };

  const handleBoardClick = async (itemId) => {
    try{
      await getpostBoard(itemId);
      setShowPopup(true);
    }catch(error){
      console.error('게시판 가져오기 실패', error);
    }
  };

  const handleBoardcloseClick = () => {
    setShowPopup(false);
    setIsExiting(false);
  };

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/location/%EC%A0%9C%EC%A3%BC', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setFoodJejuboardview(response.data);
        console.log("제주 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("제주 게시판 가져오기 실패", error.response);
      console.error(error);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  const sortedJejuView = useMemo(() => {
    const sorted = [...foodJejuboardView];
    switch (selectedOption) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id); // 최신순, 동일 날짜는 id로
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date) || a.id - b.id); 
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views);
      default:
        return sorted;
    }
  }, [foodJejuboardView, selectedOption]);

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>제주</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>{`${foodJejuboardView.length}  개의 글`}</p>
            <div style={{ width: "50vw" }}></div>
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
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%", alignItems:"flex-start" }}>
          {sortedJejuView.map(item => (
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
              }}>
                <img src={item.image} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.username}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => {handleBoardClick(item.id);}}
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
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.title}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>{item.contents}</p>
              </button>
            </div>
          ))}

        </div>
        <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
        {showPopup && (
      <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
        <div className="backg" style={{ width: "70vw", height: "70vh", borderRadius: "10px", padding: "2vh" }}>
          <div style={{ width: "100%", height: "100%", backgroundColor: "#FFF8EF", borderRadius: "10px", overflowY: "auto", padding: "2vh" }}>
            {isLoading ? (
              <p>로딩 중...</p> // 로딩 중임을 사용자에게 표시
            ) : oneboardView ? (
              <>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <img src={oneboardView.image} alt="Profile" style={{ width: '40vh', height: '40vh', marginBottom: "5vh", paddingTop: "2vh" }} />
                </div>
                <div style={{ flexDirection: "column", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: "40px", textAlign: "start", marginBottom: "1vh" }}>{oneboardView.title}</p>
                  <p style={{ fontSize: "17px", textAlign: "start", marginBottom: "5vh" }}>{`글쓰니 : ${oneboardView.username}`}</p>
                  <p style={{ fontSize: "25px", textAlign: "start", marginBottom: "5vh" }}>{oneboardView.contents}</p>
                </div>
              </>
            ) : (
              <p>내용이 없습니다</p> // 데이터가 없는 경우 처리
            )}
            <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <button style={{ backgroundColor: "transparent", fontFamily: "HJ", fontSize: "22px", border: "none" }} onClick={handleBoardcloseClick}>닫기!</button>
            </div>
          </div>
        </div>
      </div>
    )}
      </div>
    </div>
  )
};

function FoodElseContent({ selectedOption, handleChange }) {
  const [foodElseboardView, setFoodElseboardview] = useState([]);
  const [oneboardView, setoneboardview] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const getpostBoard = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/board/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setoneboardview(response.data);
        console.log("특정 맛집 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("특정 맛집 게시판 가져오기 실패", error.response);
      console.error(error);
    } finally{
      setIsLoading(false);
    }
  };

  const handleBoardClick = async (itemId) => {
    try{
      await getpostBoard(itemId);
      setShowPopup(true);
    }catch(error){
      console.error('게시판 가져오기 실패', error);
    }
  };

  const handleBoardcloseClick = () => {
    setShowPopup(false);
    setIsExiting(false);
  };

  const getBoard = async () => {
    try {
      const response = await axios.get('/board/location/%EA%B8%B0%ED%83%80', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setFoodElseboardview(response.data);
        console.log("제주 게시판 가져오기 성공", response.data);
      }
    } catch (error) {
      console.error("제주 게시판 가져오기 실패", error.response);
      console.error(error);
    }
  };


  useEffect(() => {
    getBoard();
  }, []);

  const sortedElseView = useMemo(() => {
    const sorted = [...foodElseboardView];
    switch (selectedOption) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id); // 최신순, 동일 날짜는 id로
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date) || a.id - b.id); 
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views);
      default:
        return sorted;
    }
  }, [foodElseboardView, selectedOption]);

  

  return (
    <div className='column-container'>
      <div className='yellow-box-top'>
        <div className='white-box-top'>
          <div className="hang" style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "100%" }}>
            <p style={{ paddingLeft: "3vh", paddingTop: "0.6vh", fontSize: "20px" }}>기타</p>
            <p style={{ paddingLeft: "1.2vh", paddingTop: "1vh", fontSize: "16px" }}>{`${foodElseboardView.length}  개의 글`}</p>
            <div style={{ width: "50vw" }}></div>
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
        <div className='white-box-bottom' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1vh', padding: '2vh', width: "100%", alignItems:"flex-start" }}>
          {sortedElseView.map(item => (
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
              }}>
                <img src={item.image} alt="Profile" style={{ width: '13vh', height: '13vh', borderRadius: '50%', objectFit: "cover" }} />
                <p style={{ fontSize: "15px", color: "#8A8A8A", display: "flex", width: "13vh", alignItems: "center", justifyContent: "center" }}>{item.username}</p>
              </button>
              <div style={{ width: "3vw" }}></div>
              <button onClick={() => {handleBoardClick(item.id);}}
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
                <p className='hide' style={{ fontSize: "23px", WebkitLineClamp: 1, textAlign: "start" }}>{item.title}</p>
                <div style={{ height: "1vh" }}></div>
                <p className='hide' style={{ fontSize: "16px", color: "#8A8A8A", textAlign: "start" }}>{item.contents}</p>
              </button>
            </div>
          ))}

        </div>
        <div className={`shadow ${showPopup ? 'active' : ''}`} style={{ display: showPopup ? 'block' : 'none' }}></div>
        {showPopup && (
      <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
        <div className="backg" style={{ width: "70vw", height: "70vh", borderRadius: "10px", padding: "2vh" }}>
          <div style={{ width: "100%", height: "100%", backgroundColor: "#FFF8EF", borderRadius: "10px", overflowY: "auto", padding: "2vh" }}>
            {isLoading ? (
              <p>로딩 중...</p> // 로딩 중임을 사용자에게 표시
            ) : oneboardView ? (
              <>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <img src={oneboardView.image} alt="Profile" style={{ width: '40vh', height: '40vh', marginBottom: "5vh", paddingTop: "2vh" }} />
                </div>
                <div style={{ flexDirection: "column", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: "40px", textAlign: "start", marginBottom: "1vh" }}>{oneboardView.title}</p>
                  <p style={{ fontSize: "17px", textAlign: "start", marginBottom: "5vh" }}>{`글쓰니 : ${oneboardView.username}`}</p>
                  <p style={{ fontSize: "25px", textAlign: "start", marginBottom: "5vh" }}>{oneboardView.contents}</p>
                </div>
              </>
            ) : (
              <p>내용이 없습니다</p> // 데이터가 없는 경우 처리
            )}
            <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <button style={{ backgroundColor: "transparent", fontFamily: "HJ", fontSize: "22px", border: "none" }} onClick={handleBoardcloseClick}>닫기!</button>
            </div>
          </div>
        </div>
      </div>
    )}
      </div>
    </div>
  )
};
export default Notice;
