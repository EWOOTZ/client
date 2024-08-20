import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import './Letter.css';
import pictureapple from './images/apple.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; 

function Letter() {
  const [startDate, setStartDate] = useState(new Date()); // 현재 날짜로 초기화
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [content, setContent] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate(); 

  // 현재 날짜와 6개월 뒤 날짜를 계산
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 6);

  const handleSubmit = () => {
    if (!title || !recipient || !sender || !content) {
      Swal.fire({
        icon: "warning",
        title: "보내기 실패",
        text: "모든 항목을 추가해주세요!",
      });
      return;
    }
    setIsPopupVisible(true);
  };

  const confirmSubmission = () => {
    const postData = {
      title, recipient, sender, content,
      date: startDate.toISOString().split('T')[0]
    };
    axios.post('/mailbox/', postData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "보내기 완료",
          text: "편지가 전송되었습니다!",
        });
        setIsPopupVisible(false);
        setTitle('');
        setRecipient('');
        setSender('');
        setContent('');
        navigate(`/ground/${localStorage.getItem("id")}`); 
      }
    })
    .catch((error) => {
      console.error('편지를 전송하는 중 오류 발생:', error);
      Swal.fire({
        icon: "warning",
        title: "보내기 실패",
        text: "편지가 전송에 실패했습니다.",
      });    
    });
  };

  const cancelSubmission = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className='white-line'>
      <div className='gray'>
        <div className='yellow'>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>제목</p>
            <div style={{ width: '1vw' }}></div>
            <input className='input-title' type='text' placeholder='제목을 적으세요.' value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div style={{ height: '4vh' }}></div>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>받는 사람</p>
            <div style={{ width: '1vw' }}></div>
            <input className='input-title' type='text' placeholder='받는 사람의 이메일을 입력하세요.' value={recipient} onChange={(e) => setRecipient(e.target.value)}/>
          </div>
          <div style={{ height: '4vh' }}></div>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>보내는 사람</p>
            <div style={{ width: '1vw' }}></div>
            <input className='input-title' type='text' placeholder='보내는 사람을 입력하세요.' value={sender} onChange={(e) => setSender(e.target.value)}/>
          </div>
          <div style={{ height: '4vh' }}></div>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>날짜</p>
            <div style={{ width: '1vw' }}></div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className='input-date'
              dateFormat='yyyy/MM/dd'
              minDate={today} // 현재 날짜부터 선택 가능
              maxDate={maxDate} // 현재 날짜로부터 6개월 후까지 선택 가능
            />
          </div>
          <div style={{ height: '4vh' }}></div>
          <div className='hangs'>
            <p style={{ color: "black", fontSize: '20px' }}>내용</p>
            <div style={{ width: '1vw' }}></div>
            <textarea className='input-content' placeholder='내용을 입력하세요.' value={content} onChange={(e) => setContent(e.target.value)}/>
          </div>
          <div className='hang-apple'>
            <button className='submit-button' onClick={handleSubmit}>보내기</button>
            <img src={pictureapple} width='45vw' height='35vh' alt="Apple" className="apple-image" />
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className='letter-popup' onClick={cancelSubmission}>
          <div className='letter-popup-content' onClick={(e) => e.stopPropagation()} style={{ padding: '50px' }}>
            <div className='hangs'>
              <p style={{ paddingRight: '10px', color: "black", fontSize: '20px', fontWeight: 'bold' }}>받는 사람</p>
              <input className='letter-popup-input' type='text' value={recipient} readOnly/>
            </div>
            <div style={{ height: '5vh' }}></div>
            <div className='hangs'>
              <p style={{ paddingRight: '10px', color: "black", fontSize: '20px', fontWeight: 'bold' }}>보내는 사람</p>
              <input className='letter-popup-input' type='text' value={sender} readOnly/>
            </div>
            <div style={{ height: '5vh' }}></div>
            <p className='letter-popup-message'>보내시겠습니까?</p>
            <div className='letter-popup-buttons'>
              <button className='letter-popup-button confirm' onClick={confirmSubmission}>예</button>
              <button className='letter-popup-button cancel' onClick={cancelSubmission}>아니요</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Letter;
