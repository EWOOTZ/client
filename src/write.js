import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './Letter.css';
import pictureapple from './images/apple.png';
import Swal from 'sweetalert2';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Write() {
  const [title, setTitle] = useState('');
  const [contents, setContent] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [category, setSelectedCategory] = useState(null);
  const [location, setSelectedLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [imageText, setImageText] = useState('사진을 첨부해주세요!');

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[today.getDay()]; // 요일
  const date = `${year % 100}.${month}.${day}(${dayOfWeek})`;

  const formData = new FormData();

  const navigate = useNavigate();
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedLocation(null); // 카테고리 변경 시 위치 초기화
  };

  const handleLocationClick = (location) => {
    if (category === '맛집') {
      setSelectedLocation(location); // 맛집일 때만 위치 선택 가능
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageText(file.name);
      formData.append('file', file);
    }
  };

  const isFormComplete = () => {
    if (!title || !contents || !category || !image) return false;
    if (category === '맛집' && !location) return false;
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
    const postData = {
      category, title, contents, date
    };
    axios.post('/board/', postData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "업로드 완료",
            text: "게시글이 업로드 되었습니다!",
          });

          const post_id = response.data['id'];
          
          axios({
            method: 'POST',
            url: `/upload/posting/${post_id}`,
            data: formData,
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "multipart/form-data",
            }
          })
            .then((response) => {
              console.log(response.config);
              console.log(response.data);
            });
          navigate(`/notice/${post_id}`);
        }
      })
      .catch((error) => {
        console.error('게시글을 업로드하는 중 오류 발생:', error);
        Swal.fire({
          icon: "warning",
          title: "업로드 실패",
          text: "게시글 업로드에 실패했습니다.",
        });
      });
  };

  return (
    <div className='white-line'>
      <div className='gray'>
        <div className='yellow'>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>제목</p>
            <div style={{ width: '1vw' }}></div>
            <input className='input-title' type='text' placeholder='제목을 적으세요' value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div style={{ height: '2vh' }}></div>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>카테고리</p>
            <div style={{ width: '1vw' }}></div>
            <div className='hang'>
              <button
                className='input-title'
                style={{ width: "7vw", backgroundColor: category === '일상' ? 'lightblue' : 'white' }}
                onClick={() => handleCategoryClick('일상')}
              >
                일상
              </button>
              <div style={{ width: '1vw' }}></div>
              <button
                className='input-title'
                style={{ width: "7vw", backgroundColor: category === '맛집' ? 'lightblue' : 'white' }}
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
              {['서울', '강릉', '대전', '대구', '부산', '제주', '기타'].map((loc) => (
                <button
                  key={loc}
                  className='input-title'
                  style={{
                    width: "7vw",
                    backgroundColor: loc === location ? 'lightblue' : 'white',
                    cursor: category === '맛집' ? 'pointer' : 'not-allowed',
                    opacity: category === '맛집' ? 1 : 0.5
                  }}
                  onClick={() => handleLocationClick(loc)}
                  disabled={category !== '맛집'}
                >
                  {loc}
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
            <textarea className='input-content' style={{ height: "35vh" }} placeholder='내용을 입력하세요.' value={contents} onChange={(e) => setContent(e.target.value)} />
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
        <div className='letter-popup' onClick={handlePopupClose}>
          <div className='letter-popup-content' onClick={(e) => e.stopPropagation()} style={{ padding: '50px', width: '30vw', height: '30vh' }}>
            <p className='trash-popup-message' style={{ paddingTop: '25px', textAlign: "center", alignItems: "center", justifyContent: "center", display: "flex", width: "25vw" }}>업로드 하시겠습니까?</p>
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

export default Write;
