/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Letter.css';
import backimage from './assets/backg_image.png';
import letter_case from './assets/letter_case.png';
import tree from './assets/tree.png';
import notice from './assets/notice_board.png';
import Swal from 'sweetalert2';

function Ground() {
    const navigate = useNavigate();
    const [text, setText] = useState('소원을 적어주세요');
    const [isEditing, setIsEditing] = useState(false);
    const [wishes, setWishes] = useState([]);
    const [currentWishIndex, setCurrentWishIndex] = useState(0);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [username, setUsername] = useState('');

    const fetchData = () => {
        axios.get('/api/users/me', {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setUsername(response.data.fullname);
                }
            })
            .catch((error) => {
                console.error('username 데이터를 가져오는 중 오류 발생:', error);
            });
    };

    const fetchWishes = () => {
        axios.get('/api/wish/', {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    const shuffledWishes = shuffleArray(response.data);
                    setWishes(shuffledWishes);
                    setCurrentWishIndex(0);
                    console.log(response.data);
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
        const input = e.target.value;
        const inputWithoutSpaces = input.replace(/\s+/g, ''); // Remove spaces
        if (inputWithoutSpaces.length <= 230) {
            setText(input);
        }
    };

    const handleSendClick = () => {
        if (text !== '소원을 적어주세요' && text.trim() !== '') {
            const postData = {
                username: username,
                contents: text
            };
            axios.post('/api/wish/', postData, {
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
    const handleNoticeClick = () => {
        navigate(`/notice/${localStorage.getItem("id")}`);
    };

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
    return (
        <div className='backg'>
            <div className='white-line'>
                <img src={backimage} className='backimage-style' />
                <div style={{ position: "relative", height: "100vh" ,width:"100vw"}}>
    <button 
        className="go-ground-gray" 
        style={{ 
            fontSize: "22px", 
            color:"white",
            position: "absolute", 
            top: "7vh", // 상단에서 10px
            right: "8vw" // 오른쪽에서 10px
        }} 
        onClick={() => navigate(`/main/${localStorage.getItem("username")}`)}
    >
        홈피가기
    </button>
</div>
        <img src={letter_case} className='letter-case-style' onClick={handleLetterCaseClick} />
        <img src={notice} alt="notice" className='notice-style' onClick={handleNoticeClick} />                <img src={letter_case}
                    className='letter-case-style'
                    onClick={handleLetterCaseClick} />
                <img src={notice} alt="notice" className='notice-style' onClick={handleNoticeClick} />
                <img src={tree} alt="Tree" className='tree-style' onClick={handleTreeClick} />
                <textarea value={text} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} className='text-box-style' />
                <button className='send-button' onClick={handleSendClick} disabled={text === '소원을 적어주세요' || text.trim() === ''}>소원 전송</button>
            </div>
            <div className={`shadow ${isPopupVisible ? 'active' : ''}`} style={{ display: isPopupVisible ? 'block' : 'none' }}></div>
            {isPopupVisible && (
                <div className='popup'>
                    <div className='tree-popup-content'>
                        <button className='nav-button left' style={{ backgroundColor: "transparent", display: "flex", justifyContent: "flex-start" }} onClick={handlePrevWish}>&#8249;</button>
                        <div className='wish-container'>
                            {wishes.length === 0 ? (
                                <>
                                    <div className='popup-title' style={{flexDirection:"row"}}>
                                        아무 소원이 없습니다
                                        <button style={{backgroundColor:"transparent", width : "100%",display:"flex", alignItems:"flex-start",justifyContent:"flex-end", fontSize:"30px", height:"100%"}}onClick={handlePopupClose}>x</button>

                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='popup-title' >
                                        <span style={{ color: '#C2E9B5',}}>{wishes[currentWishIndex]?.username}</span>
                                        <span style={{ color: 'black'}}>    님의 소원</span>
                                        <button className="close-button" style={{backgroundColor:"transparent", textAlign:"end"}} onClick={handlePopupClose}>x</button>
                                    </div>
                                    <div className='popup-body'>
                                        <div className='popup-content-body'>{wishes[currentWishIndex]?.contents}</div>
                                    </div>
                                </>
                            )}
                        </div>
                        {wishes.length > 0 && (
                            <button className='nav-button right' style={{ backgroundColor: "transparent", display: "flex", justifyContent: "flex-end" }} onClick={handleNextWish}>&#8250;</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
export default Ground;
