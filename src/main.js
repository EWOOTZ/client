/* eslint-disable */
import './App.css';
import './Letter.css';
import { useState } from 'react';
import picturetrash from './assets/trash.png';
import pictureHome from './images/Oak Tree.png';
import pictureapple from './images/apple.png';
import { useNavigate } from 'react-router-dom';



function formatDate() {
    const today = new Date();
    

    const day = today.getDate(); 
    const month = today.getMonth() + 1; 
    const year = today.getFullYear(); 
    
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[today.getDay()]; // 요일

    return `${year % 100}.${month}.${day}(${dayOfWeek})`;
}

function Main() {
    const [isExiting, setIsExiting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("");

    let title = '토비의\n';
    let title2 = '마이홈피';

    const handleTrashClick = () => {
        setText("");
        setShowPopup(true);
    };

    const handleDiscard = () => {
        setIsExiting(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsExiting(false);
        }, 500);
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const navigate = useNavigate();

    return (
        <div className='backg'>
            <div className='white-line'>
            <button className="go-ground-gray" style={{ fontSize: "25px" }} onClick={() => navigate(`/ground/${localStorage.getItem("id")}`)}>광장가기</button>
            <div className='container'>
                    <h1 className='date-text'>{formatDate()}</h1>
                    <div className='title-text'>
                    <p style={{ color: '#00DAC0'}}>
          {title}
        </p>
        <p style={{ color: '#8A8A8A'}}>
          {title2}
        </p>
                    </div>
                </div> <div className='container'>
                <div className='main-white-box'>
                    <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate(`/mypage/${localStorage.getItem("id")}`)}>마이페이지</button>
                </div>
                <div className='main-gray-box'>
                </div>
                <div className='column-container'>
                <div className='main-transparent-box'>
                </div>
                <div className='trash-image-container'>
                <img src={picturetrash} className='trash-image' alt="trash" onClick={handleTrashClick} style={{ cursor: 'pointer' }} />                </div>
                </div>

            </div>


            {showPopup && (
                <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
                    <div className="letter-popup-content">
                         <div className='hangs'>
                         <img src={picturetrash} width='50vw' height='50vh' alt="trash" onClick={handleTrashClick}  /> 
            <p className='trash-popup-message' > 감정 쓰레기통에 감정을 버려보세요!</p>
          </div>
          <textarea
                            className="trash-popup-textarea"
                            value={text}
                            onChange={handleChange}
                            placeholder="감정을 적어보세요.." 
                        />
                        <button className='trash-button' onClick={handleDiscard} >버리기!</button>
                       
                    </div>
                </div>
            )}
             </div>
        </div>
    );
}

export default Main;
