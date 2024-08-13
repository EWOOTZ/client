import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import './Letter.css';
import backimage from './assets/backg_image.png';
import letter_case from './assets/letter_case.png';
import tree from './assets/tree.png';

function Ground() {
    const [text, setText] = useState('소원을 적어주세요');
    const [isEditing, setIsEditing] = useState(false);
    const [wishes, setWishes] = useState([]);
    const [currentWishIndex, setCurrentWishIndex] = useState(0);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [username, setUsername] = useState('');
    
    const navigate = useNavigate();


    const fetchData = () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWppbiIsImV4cCI6MTA3MjM1NDI1NDJ9.IDrlIHuDSNGH38g2pZT9qEdhuoyERDMPRMjku-8UDeY';

        axios.get('/users/me', {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.status === 200) { 
                console.log('서버 응답:', response.data);
                setUsername(response.data.fullname); 
            }
        })
        .catch((error) => {
            console.error('username 데이터를 가져오는 중 오류 발생:', error);
        });
    };

    const fetchWishes = () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWppbiIsImV4cCI6MTA3MjM1NDI1NDJ9.IDrlIHuDSNGH38g2pZT9qEdhuoyERDMPRMjku-8UDeY';

        axios.get('/wish/', {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.status === 200) { 
                console.log('서버 응답:', response.data);
                setWishes(response.data);
            }
        })
        .catch((error) => {
            console.error('소원을 가져오는 중 오류 발생:', error);
        });
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    const handleFocus = () => {
        if (!isEditing) {
            setText('');
            setIsEditing(true);
        }
    };

    const handleBlur = () => {
        if (text.trim() === '') {
            setText('소원을 적어주세요');
        }
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleSendClick = () => {
        if (text !== '소원을 적어주세요' && text.trim() !== '') {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWppbiIsImV4cCI6MTA3MjM1NDI1NDJ9.IDrlIHuDSNGH38g2pZT9qEdhuoyERDMPRMjku-8UDeY';
            
            const postData = {
                username: username, 
                contents: text
            };

            axios.post('/wish/', postData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 201) { 
                    console.log('서버 응답:', response.data);
                    alert('소원이 전송되었습니다!');
                    setText('소원을 적어주세요');
                }
            })
            .catch((error) => {
                console.error('소원을 전송하는 중 오류 발생:', error);
            });
        }
    };

    const handleTreeClick = (e) => {
        e.stopPropagation();
        fetchWishes();
        setIsPopupVisible(true);
    };

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    const handleNextWish = (e) => {
        e.stopPropagation();
        setCurrentWishIndex((prevIndex) => (prevIndex + 1) % wishes.length);
    };

    const handlePrevWish = (e) => {
        e.stopPropagation();
        setCurrentWishIndex((prevIndex) => (prevIndex - 1 + wishes.length) % wishes.length);
    };

    const handleLetterCaseClick = () => {
        navigate('/letter'); 
    };

    return (
        <div className={`backg ${isPopupVisible ? 'blur-background' : ''}`} onClick={handlePopupClose}>
            <div className='white-line'>
                <img src={backimage} alt="Background" className='backimage-style' />
                <img src={letter_case} alt="Letter Case" 
                className='letter-case-style'
                onClick={handleLetterCaseClick} />
            
                <img 
                    src={tree} 
                    alt="Tree" 
                    className='tree-style' 
                    onClick={handleTreeClick} 
                />   
                <textarea
                    value={text}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className='text-box-style'
                />
                <button 
                    className='send-button' 
                    onClick={handleSendClick}
                    disabled={text === '소원을 적어주세요' || text.trim() === ''}
                >
                    소원 전송
                </button>
            </div>
            {isPopupVisible && (
                <>
                    <div className='shadow' onClick={handlePopupClose}></div>
                    <div className='popup' onClick={(e) => e.stopPropagation()}>
                        <div className='tree-popup-content'>
                            <button className='close-button' onClick={handlePopupClose}>×</button>
                            <button className='nav-button left' onClick={handlePrevWish}>&#8249;</button>
                            <div className='wish-container'>
                                <div className='popup-title'>
                                    <span style={{ color: '#C2E9B5' }}>{wishes[currentWishIndex]?.username}</span>
                                    <span style={{ color: 'black' }}> 님의 소원</span>
                                </div>
                                <div className='popup-body'>
                                    <div className='popup-content-body'>{wishes[currentWishIndex]?.contents}</div>
                                </div>
                            </div>
                            <button className='nav-button right' onClick={handleNextWish}>&#8250;</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Ground;
