/* eslint-disable */
import './App.css';
import './Letter.css';
import { useState } from 'react';
import { useEffect } from 'react';
import picturetrash from './assets/trash.png';
import pictureHome from './images/Oak Tree.png';
import picturesky from './images/sky4.png';
import picturebasic from './images/basicProfile.png';
import pictureCD from './images/CD.png';
import picturePlay from './images/Play.png';
import picturePause from './images/Pause.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import AWS from 'aws-sdk';
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

function Main() {

    const getMypage = async () => {
        try {
            const response = await axios.get(
                '/users/me',
                {
                    'headers': {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                console.log(axios.AxiosHeaders);
                console.log(response.data);
                console.log(response.status);
                localStorage.setItem("fullname", response.data.fullname);
                setFullname(response.data.fullname);
                localStorage.setItem("profile_image", response.data.profile_image);
                setProfileImg(response.data.profile_image);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("statusM", response.data.status_message);
                setStatus(response.data.status_message);
                localStorage.setItem("music_info", response.data.music_info);
                console.log(localStorage.getItem("fullname"));
                console.log(localStorage.getItem("statusM"));
                console.log(localStorage.getItem("id"));
                console.log(localStorage.getItem("profile_image"));
                console.log(localStorage.getItem("music_info"));
                console.log("마이페이지 가져오기 성공");

            }
        }
        catch (error) {
            console.log(error.response);
        }
    };

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
                setVisitview(response.data);
                console.log("방명록 가져오기 성공", response.data);
            }
        } catch (error) {
            console.error("방명록 가져오기 실패", error.response);
        }
    };


    function sendVisit() {
        if (!visitContent || !visitname) {
            Swal.fire({
                icon: "warning",
                text: "이름과 방명록 모두 작성해주세요."
            });
            return;
        }
        axios.post(
            '/dialog/',
            {
                "user_id": localStorage.getItem("id"),
                "visitor": visitname,
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
                setVisitname('');
                setvisitContent('');
                getVisit();
                console.log("방명록 전송 성공");
            }
        }).catch((error) => {
            console.log(error.response);
        });
    }

    const [isExiting, setIsExiting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("");
    const [status, setStatus] = useState("");
    const [fullname, setFullname] = useState("");
    const [visitname, setVisitname] = useState("");
    const [visitContent, setvisitContent] = useState("");
    const [profile_image, setProfileImg] = useState("");
    const [visitView, setVisitview] = useState([]);
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
    const saveVisitname = event => {
        setVisitname(event.target.value);
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
        getVisit();
    }, []);

    useEffect(() => {
        if (visitContent === '') {
            // 상태 업데이트 후에 로그를 확인해 비워졌는지 확인
            console.log("방명록 필드가 비워졌습니다.");
        }
    }, [visitContent]);


    let title = `${fullname || localStorage.getItem("fullname")}`;
    let title2 = '의 마이홈피';

    const navigate = useNavigate();

    return (
        <div className='backg'>
            <div className='white-line' style={{ padding: "10px" }}>
                <button className="go-ground-gray" style={{ fontSize: "23px" }} onClick={() => navigate(`/ground/${localStorage.getItem("id")}`)}>광장가기</button>
                <div className='hang'>
                    <div>
                        <p className='date-text' style={{ padding: "6px" }}>{formatDate()}</p>
                        <div className='main-white-box'>
                            <img src={profile_image} alt="Default" style={{ width: '100px', height: '100px', padding: "10px" }} />
                            <div style={{ height: "2vh" }}></div>
                            <p style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", textAlign: "left", width: "15vw", paddingLeft: "1vh", fontSize: "20px" }}>
                                {fullname}
                            </p>
                            <div style={{ height: "1vh" }}></div>
                            <div className='black-line'>
                                <p style={{ fontSize: "15px" }}>한줄 소개</p>
                                <div style={{ height: "1vh" }}></div>
                                <p style={{ fontSize: "18px" }}>{status}</p>
                            </div>
                            <div style={{ height: "2vh" }}>

                            </div>
                            <div className='green-box'>
                                <div className='hang' style={{paddingRight:"2vh"}}>
                                <img src={pictureCD} width='40vw' height='20vh'/>
                                <p style={{fontSize:"18px"}}>&TEAM - FIREWORK</p>
                                </div>
                                <span style={{ display: "block", width: "75%", height: "1px", backgroundColor: "#D8DED5", margin: "5px auto 0 auto" }}></span>
                                <div className='hang'>
                                <img src={picturePlay} width='17vw' height='23vh'/>
                                <img src={picturePause} width='17vw' height='23vh'/>
                                </div>
                            </div>
                            <div style={{height:"18vh"}}></div>
                            <div className='hang'>
                            <button className="login-gray" style={{ fontSize: "15px" }} onClick={() => navigate(`/mypage/${localStorage.getItem("id")}`)}>마이페이지</button>                            
                            <div style={{width:"4vh"}}></div>
                            <button className="login-gray" style={{ fontSize: "15px" }} onClick={() => navigate('/')}>로그아웃</button>
                        </div>
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
                            <div className='yellow-box-scroll' style={{ width: "53vw", height: "27vh", paddingLeft: "5vh" }}>
                                <p style={{fontSize:"10px", color:"black", textAlign:"right", width:"100%"}}>답변 칸을 클릭해 입력하고 ENTER를 누르면 저장돼요!</p>
                                <p className='title-text' style={{ color: "black", fontSize: "25px" }}>Q. 나의 MBTI는?</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "25px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "25px" }} type='text' value={a1} onChange={savea1} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "25px" }}>Q. </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "25px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "25px" }} type='text' value={a2} onChange={savea2} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "25px" }}>Q. </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "25px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "25px" }} type='text' value={a3} onChange={savea3} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "25px" }}>Q. </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "25px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "25px" }} type='text' value={a4} onChange={savea4} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "25px" }}>Q. </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "25px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "25px" }} type='text' value={a5} onChange={savea5} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "25px" }}>Q. </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "25px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "25px" }} type='text' value={a6} onChange={savea6} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "25px" }}>Q. </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "25px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "25px" }} type='text' value={a7} onChange={savea7} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "25px" }}>Q. </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "25px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "25px" }} type='text' value={a8} onChange={savea8} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "25px" }}>Q. </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "25px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "25px" }} type='text' value={a9} onChange={savea9} onKeyDown={handleEnterKey}></input>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "25px" }}>Q. </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "25px" }}>A: </p>
                                    <input className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "25px" }} type='text' value={a10} onChange={savea10} onKeyDown={handleEnterKey}></input>
                                </div>                            </div>
                            <div style={{ height: "13px" }}></div>
                            <div className='sky-box' style={{ width: "53vw", height: "43vh", backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5)), url(${picturesky})`, backgroundSize: "cover" }}>
                                <div className='sky-box-inner'>
                                    <div className='scroll2' style={{ padding: "1vh", width: "100%" }}>
                                        {visitView.map((visit) => (
                                            <div key={visit.id} style={{ marginBottom: "2vh" }}>
                                                <div className='hang'>
                                                    <div style={{ textAlign: "center", alignItems: "center", justifyContent: "center", display: "flex", width: "10vw" }}>
                                                        <p style={{ fontSize: "22px" }}>{visit.visitor}</p>
                                                    </div>
                                                    <div style={{ width: "40px" }}></div>
                                                    <div style={{ textAlign: "left", alignItems: "flex-start", justifyContent: "flex-start", display: "flex", width: "33vw" }}>
                                                        <p style={{ fontSize: "22px" }}>{visit.contents}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="fix">
                                    <div className="hang" style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "20%", width: "100%" }}>
                                        <input className='input-name' style={{ width: "10vw" }} type='text' placeholder='이름' value={visitname} onChange={saveVisitname} />
                                        <div style={{ width: "1vh" }}></div>
                                        <input className='input-name' style={{ width: "32vw" }} type='text' placeholder='방명록을 작성하세요.' value={visitContent} onChange={savecontent} />
                                        <button className="login-gray" style={{ fontSize: "20px", display: "flex", paddingBottom: "8px" }} onClick={() => sendVisit()}>전송</button>
                                        </div>

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
