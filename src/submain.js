/* eslint-disable */
import './App.css';
import './Letter.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import picturetrash from './assets/trash.png';
import pictureHome from './images/Oak Tree.png';
import pictureApple from './images/apple.png';
import picturesky from './images/sky4.png';
import picturebasic from './images/basicProfile.png';
import pictureCD from './images/CD.png';
import picturePlay from './images/Play.png';
import picturePause from './images/Pause.png';
import picturePlus from './images/plus.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';
import YouTube from 'react-youtube';
import joyconImg from './assets/joycon.png';


function formatDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[today.getDay()]; // 요일
    return `${year % 100}.${month}.${day}  (${dayOfWeek})`;
}

function submain() {
    const videoStyle = {
        margin: '10px',
        marginRight: '35px',

    };

    const opts = {
        height: '110',
        width: '220',
        playerVars: {
            autoplay: 0
        }
    };

    const [user, setUser] = useState(null);
    const [dialog, setDialog] = useState([]);
    const [video, setVideo] = useState([]);
    const [following, setFollowing] = useState([]);
    const [qna, setQna] = useState([]);
    const [gameScores, setGameScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visitContent, setvisitContent] = useState("");

    function sendVisit() {
        if (!visitContent || !visitname) {
            Swal.fire({
                icon: "warning",
                text: "이름과 방명록 모두 작성해주세요."
            });
            return;
        }
        axios.post(
            '/api/dialog/',
            {
                "user_id": user?.id,
                "visitor": visitname,
                "contents": visitContent,
            },
            {
                'headers': { 'Content-Type': 'application/json' }
            }
        ).then((response) => {
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    text: "방명록 달기 성공!",
                });
                setVisitname('');
                setvisitContent('');
                getUsers();
                scrollToBottom();
                console.log("방명록 전송 성공");
            }
        }).catch((error) => {
            console.log(error.response);
        });
    }

    async function getUsers() {
        axios.get('/api/users/redirection', {
            params: { username },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.status);
                console.log(response.data);
                if (response.status === 200) {

                    const { user, dialog, following, qna, game_scores, video } = response.data;
                    const videoData = JSON.parse(video.body);

                    // youtube_data가 존재하는지 확인하고, items 배열의 길이를 확인합니다.
                    if (videoData.youtube_data && videoData.youtube_data.items.length > 0) {
                        const videoId = videoData.youtube_data.items[0].id;
            

                        setVideoId(videoId);
                        
                        // 필요한 경우 videoId를 상태로 설정하거나 다른 작업 수행
                        // setVideoId(videoId); // 예시
                    }

                    const { singer, music_title } = videoData;
                    console.log('Singer:', singer);
                    console.log('Music Title:', music_title);
                    setSinger(singer);
                    setMusicTitle(music_title);
                    
                    setUser(user);
                    setDialog(dialog);
                    setFollowing(following);
                    setQna(qna);
                    setGameScores(game_scores);
                    console.log(user);
                    console.log(dialog);
                    console.log(following);
                    console.log(qna);
                    console.log(game_scores);
                    console.log(video);
                
            }})
            .catch((error) => {
                console.error('서치 목록 가져오기 실패:', error);
            });
    };


    const [rankingList, setRankingList] = useState([]);
    const [followee, setFollowee] = useState([]);
    const [isExiting, setIsExiting] = useState(false);
    const [isFlwListExiting, setIsFlwListExiting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showFlwListPopup, setFlwListShowPopup] = useState(false);
    const [text, setText] = useState("");
    const [status, setStatus] = useState("");
    const [fullname, setFullname] = useState("");
    const [visitname, setVisitname] = useState("");
    const [profile_image, setProfileImg] = useState("");
    const [visitView, setVisitview] = useState([]);
    const [usernames, setUsernames] = useState([]); // 상태 추가   
    const [userdatas, setUserdatas] = useState([]); // 상태 추가    
 
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
    const [search_user, setSearchUser] = useState('');
    const [singer, setSinger] = useState('');
    const [musicTitle, setMusicTitle] = useState('');
    const [videoId, setVideoId] = useState(null);
    const {username} = useParams();



    const scrollToBottom = () => {
        const element = document.querySelector('.scroll2');
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    };

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
    const saveSearchuser = event => {
        setSearchUser(event.target.value);
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
    const handleEnterKey2 = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 엔터 키의 기본 동작을 방지 (폼 제출 등)
            specificFunction2(); // 엔터를 눌렀을 때 실행할 함수
        }
    };
    const specificFunction2 = () => {
        getSearch();
    };
    const handleEnterKey3 = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 엔터 키의 기본 동작을 방지 (폼 제출 등)
            specificFunction3(); // 엔터를 눌렀을 때 실행할 함수
        }
    };
    const specificFunction3 = () => {
        sendVisit();
    };

    const handleTrashClick = () => {
        setText("");
        setShowPopup(true);
    };

    const handleFollowListClick = () => {
        setFlwListShowPopup(true);
    };

    const handleFollowListDiscard = () => {
        setFlwListShowPopup(false);
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
        getUsers();
    }, []);


    useEffect(() => {
        scrollToBottom();
    }, [visitView]); // visitView가 변경될 때마다 호출

    useEffect(() => {
        if (visitContent === '') {
            console.log("방명록 필드가 비워졌습니다.");
        }
    }, [visitContent]);

    let title = `${user?.fullname}`;
    let title2 = '의 마이홈피';
    const navigate = useNavigate();

    useEffect(() => {
        // navigate를 통해 페이지 이동
        // 예를 들어 URL이 특정 조건을 만족할 때 페이지 이동
      }, [ navigate]);

    return (
        <div className='backg'>
            <div className='white-line' style={{ padding: "10px" }}>
                <div className='hang'>
                    <div>
                        <p className='date-text' style={{ padding: "6px" }}>{formatDate()}</p>
                        <div className='main-white-box'>
                            {user?.profile_image ? (
                                <img src={user?.profile_image} alt="Profile" style={{ width: '100px', height: '100px' }} />
                            ) : (
                                <img src={picturebasic} alt="Default" style={{ width: '100px', height: '100px' }} />
                            )}
                            <div style={{ height: "2vh" }}></div>
                            <p style={{ paddingLeft: "1vh", fontSize: "20px" }}>
                            {user?.fullname}
                            </p>
                            <div style={{ height: "1vh" }}></div>
                            <div className='black-line'>
                                <p style={{ fontSize: "15px" }}>한줄 소개</p>
                                <div style={{ height: "1vh" }}></div>
                                <p style={{ fontSize: "18px" }}>{user?.status_message}</p>
                            </div>
                            <div style={{ height: "2vh" }}>
                            </div>
                            <div className='green-box' style={{ marginBottom: "2vh" }}>
                                <div className='hang' style={{ paddingRight: "2vh" }}>
                                    <img src={pictureCD} width='40vw' height='20vh' />
                                    <p style={{ fontSize: "15px" }}>{`${singer} - ${musicTitle}`}</p>                                </div>
                                <span style={{ display: "block", width: "75%", height: "1px", backgroundColor: "#D8DED5", margin: "5px auto 0 auto" }}></span>
                                <div className='hang'>
                                    <img src={picturePlay} width='17vw' height='23vh' />
                                    <img src={picturePause} width='17vw' height='23vh' />
                                </div>
                            </div>
                            {
                                <div className="youtube-video" style={{ display: "contents", alignItems: "center", alignContent: "center" }}>
                                    {videoId ? (
                                        <YouTube videoId={videoId} opts={opts} />
                                    ) : (
                                        <p>프로필 뮤직이 없습니다.</p> // 비디오 ID가 없을 때 표시할 내용 (선택 사항)
                                    )}
                                </div>
                            }
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
                                <p className='title-text' style={{ color: "black", fontSize: "22px" }}>Q. 인생 영화 or 인생 책 한 가지</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "22px" }}>A: </p>
                                    <p className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "22px", width: "50vw" }} >{qna[0]?.answer1}</p>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "22px" }}>Q. 갖고 싶은 초능력은? </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "22px" }}>A: </p>
                                    <p className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "22px", width: "50vw" }}>{qna[0]?.answer2}</p>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "22px" }}>Q. 과거로 돌아갈 수 있다면 언제로?
                                </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "22px" }}>A: </p>
                                    <p className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "22px", width: "50vw" }} >{qna[0]?.answer3}</p>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "22px" }}>Q. 기억에 남는 여행지는? </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "22px" }}>A: </p>
                                    <p className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "22px", width: "50vw" }}  >{qna[0]?.answer4}</p>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "22px" }}>Q. 죽기전에 먹고싶은 음식은? </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "22px" }}>A: </p>
                                    <p className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "22px", width: "50vw" }} >{qna[0]?.answer5}</p>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "22px" }}>Q. 핸드폰 빼고 외출할 때 하나만 챙긴다면? </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "22px" }}>A: </p>
                                    <p className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "22px", width: "50vw" }} >{qna[0]?.answer6}</p>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "22px" }}>Q. 내 버킷리스트 속 1번 </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "22px" }}>A: </p>
                                    <p className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "22px", width: "50vw" }}  >{qna[0]?.answer7}</p>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "22px" }}>Q. 무생물과 대화하기 vs 모든 생물과 대화하기  </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "22px" }}>A: </p>
                                    <p className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "22px", width: "50vw" }} >{qna[0]?.answer8}</p>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "22px" }}>Q. 못씻기 vs 못먹기 </p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "22px" }}>A: </p>
                                    <p className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "22px", width: "50vw" }}  >{qna[0]?.answer9}</p>
                                </div>
                                <p className='title-text' style={{ color: "black", marginTop: "12px", fontSize: "22px" }}>Q. 주말을 해적과 함께 보내기 vs 주말을 닌자와 함께 보내기</p>
                                <div className='hang'>
                                    <p className='title-text' style={{ color: "black", marginTop: "7px", fontSize: "22px" }}>A: </p>
                                    <p className='input-5' style={{ color: "black", marginTop: "7px", marginLeft: "1vh", fontSize: "22px", width: "50vw" }} >{qna[0]?.answer10}</p>
                                </div>                            </div>
                            <div style={{ height: "13px" }}></div>
                            <div className='sky-box' style={{ width: "53vw", height: "43vh", backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5)), url(${picturesky})`, backgroundSize: "cover" }}>
                                <div className='sky-box-inner'>
                                    <div className='scroll2' style={{ padding: "1vh", width: "100%", height: "90%" }}>
                                        {dialog.map((visit) => (
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
                                    <div className="hang" style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "20%", width: "100%" }}>
                                        <input className='input-name' style={{ width: "10vw" }} type='text' placeholder='이름' value={visitname} onChange={saveVisitname} />
                                        <div style={{ width: "1vh" }}></div>
                                        <input className='input-name' style={{ width: "32vw" }} type='text' placeholder='방명록을 작성하세요.' value={visitContent} onChange={savecontent} onKeyDown={handleEnterKey3} />
                                        <button className="login-gray" style={{ fontSize: "20px", display: "flex", paddingBottom: "8px" }} onClick={() => sendVisit()}>전송</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "5vh" }}></div>
                        <div className='main-transparent-box' style={{ height: "45vh" }}>
                            <div className='hang' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <p style={{ paddingTop: "10px", fontSize: "20px" }}>내 이웃들</p>
                            </div>
                            <span style={{ display: "block", width: "75%", height: "1px", backgroundColor: "#D8DED5", margin: "5px auto 0 auto" }}></span>
                            <div style={{ height: "1vh" }}></div>
                            <div style={{ height: "78%" }}>
                                <div>
                                    {following.map((myfollowee) => (
                                        <div key={myfollowee.id}>
                                            <button style={{ fontSize: "17px" }}>
                                               
                                                    {myfollowee.fullname}
                                                
                                            </button>
                                            <div style={{ height: "1vh" }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{ height: "1vh" }}></div>
                        <div className='main-transparent-box' style={{ height: "30vh" }}>
                            <p style={{ paddingTop: "10px", fontSize: "20px" }}>산성비 랭킹</p>
                            <span style={{ display: "block", width: "75%", height: "1px", backgroundColor: "#D8DED5", margin: "5px auto 0 auto" }}></span>
                            <div style={{ height: "83%", overflowY: "auto" }}>
                                {gameScores.length > 0 ? (
                                    gameScores.map((rank, index) => (
                                        <div key={index} style={{ margin: "10px 0" }}>
                                            <p style={{ fontSize: "15px" }}>{rank.fullname} - {rank.score}P</p>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ fontSize: "17px", textAlign: "center" }}>랭킹이 없습니다.</p>
                                )}
                            </div>

                        </div>
                        
                    </div>
                </div>
               
                
            </div>
        </div>
    );
}

export default submain;