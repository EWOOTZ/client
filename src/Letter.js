import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 스타일 임포트
import './Letter.css';
import pictureapple from './images/apple.png';

function Letter() {
  const [startDate, setStartDate] = useState(new Date()); // 현재 날짜로 초기화
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [content, setContent] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleSubmit = () => {
    if (!title || !recipient || !sender || !content) {
      alert('모든 필드를 채워주세요!');
      return;
    }

    setIsPopupVisible(true);
  };

  const confirmSubmission = () => {
    alert('보내기 완료!');
    setIsPopupVisible(false);
  };

  const cancelSubmission = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className='white-line'>
      <div className='grey-box'>
        <div className='yellow-box'>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '20px' }}>제목</p>
            <div style={{ width: '1vw' }}></div>
            <input
              className='input-name'
              type='text'
              placeholder='제목을 적으세요.'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div style={{ height: '4vh' }}></div>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '20px' }}>받는 사람</p>
            <div style={{ width: '1vw' }}></div>
            <input
              className='input-name'
              type='text'
              placeholder='받는 사람의 이메일을 입력하세요.'
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div style={{ height: '4vh' }}></div>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '20px' }}>보내는 사람</p>
            <div style={{ width: '1vw' }}></div>
            <input
              className='input-name'
              type='text'
              placeholder='보내는 사람을 입력하세요.'
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />
          </div>
          <div style={{ height: '4vh' }}></div>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '20px' }}>날짜</p>
            <div style={{ width: '1vw' }}></div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className='input-date'
              dateFormat='yyyy/MM/dd'
            />
          </div>
          <div style={{ height: '4vh' }}></div>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '20px' }}>내용</p>
            <div style={{ width: '1vw' }}></div>
            <textarea
              className='input-content'
              placeholder='내용을 입력하세요.'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='button-container'>
            <button className='submit-button' onClick={handleSubmit}>보내기</button>
            <img src={pictureapple} alt="Apple" className="apple-image" /> {/* 이미지 올바르게 참조 */}
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className='popup-overlay' onClick={cancelSubmission}>
          <div className='popup-content' onClick={(e) => e.stopPropagation()}>
            <div className='popup-form'>
              <div className='popup-field'>
              <div style={{ height: '8vh' }}></div>

                <p style={{ color: "black", fontSize: '18px', fontWeight: 'bold',paddingRight:15}}>받는 사람</p>
                <input
                  className='popup-input'
                  type='text'
                  value={recipient}
                  readOnly
                />
              </div>
              <div style={{ height: '5vh' }}></div>
              <div className='popup-field'>
                <p style={{ color: "black", fontSize: '18px', fontWeight: 'bold' }}>보내는 사람</p>
                <input
                  className='popup-input'
                  type='text'
                  value={sender}
                  readOnly
                />
              </div>
            </div>
            <div style={{ height: '8vh' }}></div>
            <p className='popup-message'>정말 제출하시겠습니까?</p>
            <div className='popup-buttons'>
              <button className='popup-button confirm' onClick={confirmSubmission}>예</button>
              <button className='popup-button cancel' onClick={cancelSubmission}>아니요</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Letter;