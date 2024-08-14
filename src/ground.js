import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import './Letter.css';
import backimage from './assets/backg_image.png';
import letter_case from './assets/letter_case.png';
import tree from './assets/tree.png';
import Swal from 'sweetalert2';

function Ground() {
    const [text, setText] = useState('소원을 적어주세요');
    const [isEditing, setIsEditing] = useState(false);
    const [wishes, setWishes] = useState([]);
    const [currentWishIndex, setCurrentWishIndex] = useState(0);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [username, setUsername] = useState('');
    
    const navigate = useNavigate();

    const fetchData = () => {
        axios.get('/users/me', {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
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
        axios.get('/wish/', {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        .then((response) => {
            if (response.status === 200) { 
                console.log('서버 응답:', response.data);
                const shuffledWishes = shuffleArray(response.data);
                setWishes(shuffledWishes);
                setCurrentWishIndex(0); // 첫 번째 소원으로 초기화
            }
        })
        .catch((error) => {
            console.error('소원을 가져오는 중 오류 발생:', error);
        });
    };

    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
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
            const postData = {
                username: username, 
                contents: text
            };

            axios.post('/wish/', postData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 201) { 
                    console.log('서버 응답:', response.data);
                    Swal.fire({
                        icon: "success",
                        title: "보내기 완료",
                        text: "소원이 전송되었습니다!",
                    });
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
        navigate(`/letter/${localStorage.getItem("id")}`); 
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
                            {wishes.length === 0 ? (
                                <div className='wish-container'>
                                    <div className='popup-body'>
                                        <div className='popup-content-body'>아무 사용자가 소원을 달지 않았습니다</div>
                                    </div>
                                </div>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Ground;
