/* eslint-disable */

import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css'; 
import './Letter.css';
import pictureapple from './images/apple.png';
import Notice from './notice';

import { useNavigate } from 'react-router-dom'; 

function Letter() {
  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [imageText, setImageText] = useState('사진을 첨부해주세요!');

  const navigate = useNavigate(); 
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedLocation(null); // 카테고리 변경 시 위치 초기화
  };

  const handleLocationClick = (location) => {
    if (selectedCategory === '맛집') {
      setSelectedLocation(location);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageText(file.name);
    }
  };


  const isFormComplete = () => {
    if (!title || !content || !selectedCategory || !image) return false;
    if (selectedCategory === '맛집' && !selectedLocation) return false;
    return true;
  };

  const handlePopupOpen = () => {
    if (isFormComplete()) {
      setIsPopupVisible(true);
    }
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const handleSubmit = () => {
    navigate('/notice/:id'); 
  };

  return (
    <div className='white-line'>
      <div className='gray'>
        <div className='yellow'>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>제목</p>
            <div style={{ width: '1vw' }}></div>
            <input className='input-title' type='text' placeholder='제목을 적으세요' value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
            <div style={{ height: '2vh' }}></div>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>카테고리</p>
            <div style={{ width: '1vw' }}></div>
            <div className='hang'>
              <button
                className='input-title'
                style={{ width: "7vw", backgroundColor: selectedCategory === '일상' ? 'lightblue' : 'white' }}
                onClick={() => handleCategoryClick('일상')}
              >
                일상
              </button>
              <div style={{ width: '1vw' }}></div>
              <button
                className='input-title'
                style={{ width: "7vw", backgroundColor: selectedCategory === '맛집' ? 'lightblue' : 'white' }}
                onClick={() => handleCategoryClick('맛집')}
              >
                맛집
              </button>
            </div>
          </div>
          <div style={{ height: '2vh' }}></div>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>맛집 위치</p>
            <div style={{ width: '1vw' }}></div>
            <div className='hang'>
              {['서울', '강릉', '대전', '대구', '부산', '제주','기타'].map((location) => (
                <button
                  key={location}
                  className='input-title'
                  style={{
                    width: "7vw",
                    backgroundColor: selectedLocation === location ? 'lightblue' : 'white',
                    cursor: selectedCategory === '맛집' ? 'pointer' : 'not-allowed',
                    opacity: selectedCategory === '맛집' ? 1 : 0.5
                  }}
                  onClick={() => handleLocationClick(location)}
                  disabled={selectedCategory !== '맛집'}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: '2vh' }}></div>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>사진</p>
            <div style={{ width: '1vw' }}></div>
            <div className='hangs'>
              <input
                type='file'
                id='imageUpload'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor='imageUpload'>
                <button
                  className='input-title'
                  style={{ width: "9vw" }}
                  onClick={() => document.getElementById('imageUpload').click()}
                >
                  사진 첨부
                </button>
              </label>
              <div style={{ width: '1vw' }}></div>
              <p style={{ fontSize: "15px", color: "gray" }}>{imageText}</p>
            </div>
        

          </div>
          <div style={{ height: '2vh' }}></div>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>내용</p>
            <div style={{ width: '1vw' }}></div>
            <textarea className='input-content' style={{  height: "35vh"}} placeholder='내용을 입력하세요.' value={content} onChange={(e) => setContent(e.target.value)}/>
          </div>
          <div className='hang-apple'>
            <button
              className='submit-button'
              onClick={handlePopupOpen} // 폼이 완성되지 않으면 버튼 비활성화
              style={{
                cursor: isFormComplete() ? 'pointer' : 'not-allowed',
              }}
            >
              작성하기
            </button>
            <img src={pictureapple} width='45vw' height='35vh' alt="Apple" className="apple-image" />
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className='letter-popup'  onClick={handlePopupClose}>
          <div className='letter-popup-content'  onClick={(e) => e.stopPropagation()} style={{ padding: '50px', width:'30vw',height:'30vh' }}>


          <p className='trash-popup-message' style={{ paddingTop:'25px',textAlign: "center", alignItems: "center", justifyContent: "center", display: "flex", width: "25vw" }}>보내시겠습니까?</p>
          <div style={{ height: '5vh' }}></div>

            <div className='letter-popup-buttons'>
              <button className='letter-popup-button confirm' onClick={handleSubmit}>예</button>
              <button className='letter-popup-button cancel' onClick={handlePopupClose}>아니요</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Letter;
