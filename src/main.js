/* eslint-disable */
import './App.css';
import './Letter.css';
import { useState } from 'react';
import { useEffect } from 'react';
import picturetrash from './assets/trash.png';
import pictureHome from './images/Oak Tree.png';
import picturesky from './images/sky4.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function formatDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[today.getDay()]; // 요일
    return `${year % 100}.${month}.${day}  (${dayOfWeek})`;
}

function getMypage() {
    axios.get(
        '/users/me',
        {
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        console.log(axios.AxiosHeaders);
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200) {
            localStorage.setItem("fullname", response.data.fullname);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("statusM", response.data.status_message);
            console.log(localStorage.getItem("fullname"));
            console.log(localStorage.getItem("statusM"));
            console.log(localStorage.getItem("id"));
            console.log("마이페이지 가져오기 성공");

        }
    }).catch((error) => {
        console.log(error.response);
    });
}

function Main() {
    const getQna = async () => {
        try {
            const response = await axios.get('/qna/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                const data = response.data[0]; // 배열의 첫 번째 요소
                seta1(data.answer1);
                seta2(data.answer2);
                seta3(data.answer3);
                seta4(data.answer4);
                seta5(data.answer5);
                seta6(data.answer6);
                seta7(data.answer7);
                seta8(data.answer8);
                seta9(data.answer9);
                seta10(data.answer10);

                console.log("질문답 가져오기 성공", response.data);
            }
        } catch (error) {
            console.error("질문답 가져오기 실패", error.response);
        }
    };

    function sendQna() {
        axios.put(
            '/qna/',
            {
                "answer1": a1,
                "answer2": a2,
                "answer3": a3,
                "answer4": a4,
                "answer5": a5,
                "answer6": a6,
                "answer7": a7,
                "answer8": a8,
                "answer9": a9,
                "answer10": a10,
            },
            {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            console.log(axios.AxiosHeaders);
            console.log(response.data);
            console.log(response.status);
            if (response.status === 200) {
                console.log("qna 성공");
            }
        }).catch((error) => {
            console.log(error.response);

        });
    }

    const getVisit = async () => {
        try {
            const response = await axios.get('/dialog/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                const data = response.data[0]; // 배열의 첫 번째 요소
                
                console.log("질문답 가져오기 성공", response.data);
            }
        } catch (error) {
            console.error("질문답 가져오기 실패", error.response);
        }
    };


    function sendVisit() {
        axios.post(
            '/dialog/',
            {
                "user_id":localStorage.getItem("id"),
                "visitor":localStorage.getItem("fullname"),
                "contents": visitContent,
            },
            {
                'headers': { 'Content-Type': 'application/json' }
            }
        ).then((response) => {
            console.log(axios.AxiosHeaders);
            console.log(response.data);
            console.log(response.status);
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    text: "방명록 달기 성공!",
                });
                console.log("방명록 전송 성공");
            }
        }).catch((error) => {
            console.log(error.response);
        });
    }

    const [isExiting, setIsExiting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("");
    const [a1, seta1] = useState('');
    const [a2, seta2] = useState('');
    const [a3, seta3] = useState('');
    const [a4, seta4] = useState('');
    const [a5, seta5] = useState('');
    const [a6, seta6] = useState('');
    const [a7, seta7] = useState('');
    const [a8, seta8] = useState('');
    const [a9, seta9] = useState('');
    const [a10, seta10] = useState('');
    const [visitContent, setvisitContent] = useState('');

    const savea1 = event => {
        seta1(event.target.value);
        console.log(event.target.value);
    };
    const savea2 = event => {
        seta2(event.target.value);
        console.log(event.target.value);
    }; const savea3 = event => {
        seta3(event.target.value);
        console.log(event.target.value);
    }; const savea4 = event => {
        seta4(event.target.value);
        console.log(event.target.value);
    }; const savea5 = event => {
        seta5(event.target.value);
        console.log(event.target.value);
    }; const savea6 = event => {
        seta6(event.target.value);
        console.log(event.target.value);
    }; const savea7 = event => {
        seta7(event.target.value);
        console.log(event.target.value);
    }; const savea8 = event => {
        seta8(event.target.value);
        console.log(event.target.value);
    }; const savea9 = event => {
        seta9(event.target.value);
        console.log(event.target.value);
    };
    const savea10 = event => {
        seta10(event.target.value);
        console.log(event.target.value);
    };
    const savecontent = event => {
        setvisitContent(event.target.value);
        console.log(event.target.value);
    };
    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 엔터 키의 기본 동작을 방지 (폼 제출 등)
            specificFunction(); // 엔터를 눌렀을 때 실행할 함수
        }
    };

    const specificFunction = () => {
        sendQna();
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

    useEffect(() => {
        getMypage();
        getQna();
    }, []);


    let title = `${localStorage.getItem("fullname")}`;
    let title2 = '의 마이홈피';
    let Q1 = 'Q. 나의 MBTI는?'
    let Q2 = 'Q. 나의 취미는?'
    let Q3 = 'Q. 내가 좋아하는 노래 장르는?'
    let Q4 = 'Q. 가장 기억에 남는 여행지는?'
    let Q5 = 'Q. 내가 재미있게 읽는 책은?'
    let Q6 = 'Q. 내가 재미있게 본 드라마는?'
    let Q7 = 'Q. 내가 재미있게 본 영화는?'
    let Q8 = 'Q. 내 이상형은?'
    let Q9 = 'Q. 내가 스트레스를 푸는 방식은?'
    let Q10 = 'Q. 기억에 남는 선물은?'

    const navigate = useNavigate();

    return (
        <div className='backg'>
            <div className='white-line' style={{ padding: "10px" }}>

                <button className="go-ground-gray" style={{ fontSize: "23px" }} onClick={() => navigate(`/ground/${localStorage.getItem("id")}`)}>광장가기</button>
                <div className='hang'>
                    <div>
                        <h1 className='date-text' style={{ paddingLeft: "7px" }}>{formatDate()}</h1>
                        <div className='main-white-box'>
                            <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate(`/mypage/${localStorage.getItem("id")}`)}>마이페이지</button>
                        </div>
                    </div>
                    <div>
                        <div className='hang4'>
                            <p className='title-text' style={{ color: "#00CAC0", paddingLeft: "15px", paddingBottom: "5px" }}>{title}</p>
                            <p className='title-text' style={{ color: "#8A8A8A", paddingLeft: "15px", paddingBottom: "5px" }}>{title2}</p>
                            <div style={{ width: "10px" }}></div>
                            <img src={pictureHome} width='30vw' height='30vh' style={{ color: "white" }} />
                            <img src={pictureHome} width='30vw' height='30vh' style={{ color: "white" }} />
                            <img src={pictureHome} width='30vw' height='30vh' style={{ color: "white" }} />
                        </div>
                        <div className='main-gray-box'>
                            <div className='yellow-box-scroll' style={{ width: "53vw", height: "27vh" }}>
                                <p className='title-text' style={{ color: "black", fontSize: "20px" }}>{Q1}</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "20px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "20px" }} type='text' value={a1} onChange={savea1} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "20px" }}>{Q2}</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "20px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "20px" }} type='text' value={a2} onChange={savea2} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "20px" }}>{Q3}</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "20px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "20px" }} type='text' value={a3} onChange={savea3} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "20px" }}>{Q4}</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "20px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "20px" }} type='text' value={a4} onChange={savea4} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "20px" }}>{Q5}</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "20px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "20px" }} type='text' value={a5} onChange={savea5} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "20px" }}>{Q6}</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "20px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "20px" }} type='text' value={a6} onChange={savea6} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "20px" }}>{Q7}</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "20px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "20px" }} type='text' value={a7} onChange={savea7} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "20px" }}>{Q8}</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "20px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "20px" }} type='text' value={a8} onChange={savea8} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "20px" }}>{Q9}</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "20px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "20px" }} type='text' value={a9} onChange={savea9} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "20px" }}>{Q10}</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "20px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "20px" }} type='text' value={a10} onChange={savea10} onKeyDown={handleEnterKey}></input>
                                </div>                            </div>
                            <div style={{ height: "13px" }}></div>
                            <div className='sky-box' style={{ width: "53vw", height: "43vh", backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5)), url(${picturesky})`, backgroundSize: "cover" }}>
                                <div className='sky-box-inner'>
                                    <div>
                                        <p></p>
                                    </div>
                                    <div className="hang" style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "100%", width: "100%" }}>
                                        <input className='input-name' style={{ width: "43vw" }} type='text' placeholder='방명록을 작성하세요.' value={visitContent} onChange={savecontent}/>
                                        <button className="login-gray" style={{ fontSize: "20px", display: "flex", paddingBottom: "8px" }} onClick={() => sendVisit()}>전송</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "5vh" }}></div>
                        <div className='main-transparent-box'>
                            <p style={{ paddingTop: "20px", fontSize: "20px" }}>내 이웃들</p>
                            <span style={{ display: "block", width: "75%", height: "1px", backgroundColor: "#D8DED5", margin: "10px auto 0 auto" }}></span>
                        </div>
                        <div className='trash-image-container'>
                            <img src={picturetrash} alt="trash" onClick={handleTrashClick} style={{ cursor: 'pointer', width: "4.5vw", height: "8vh" }} />
                        </div>
                    </div>
                </div>


                {showPopup && (
                    <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
                        <div className="letter-popup-content">
                            <div className='hangs'>
                                <img src={picturetrash} width='50vw' height='50vh' alt="trash" onClick={handleTrashClick} />
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
