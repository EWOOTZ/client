/* eslint-disable */
import './App.css';
import './Letter.css';
import { useState } from 'react';
import picturetrash from './assets/trash.png';
import pictureHome from './images/Oak Tree.png';
import pictureapple from './images/apple.png';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function Main() {
    const [isExiting, setIsExiting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("");

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

    let title = '<토비>의\n';
    let title2 = '마이홈피';

    const navigate = useNavigate();
    return (
        <div className='backg'>
            <div className='white-line'>
                <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate(`/mypage/${localStorage.getItem("id")}`)}>마이페이지</button>
                <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate(`/ground/${localStorage.getItem("id")}`)}>광장가기</button>
                <img src={picturetrash} width='80vw' height='70vh' alt="trash" onClick={handleTrashClick} style={{ cursor: 'pointer' }} /> 
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
    );
}

export default Main;
