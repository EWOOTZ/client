/* eslint-disable */
import './App.css';
import { useState, useEffect } from 'react';
import pictureHome from './images/Oak Tree.png';
import pictureapple from './images/apple.png';
import picturebasic from './images/basicProfile.png';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Mypage() {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState("");
    const [uploadImgUrl, setUploadImgUrl] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    
    const [singer, setSinger] = useState('');
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');

    const saveSinger = event => {
        setSinger(event.target.value);
        console.log(event.target.value);
    };

    const saveTitle = event => {
        setTitle(event.target.value);
        console.log(event.target.value);
    };

    const saveSearch = event => {
        setSearch(event.target.value);
        console.log(event.target.value);
    };

    const handleTrashClick = () => {
        setShowPopup(true);
    };

    const handleDiscard = () => {
        setIsExiting(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsExiting(false);
        }, 500);
    };


    const formData = new FormData();


    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            const uploadFile = event.target.files[0];
            
            setFileName(uploadFile.name);

            const reader = new FileReader();
            reader.readAsDataURL(uploadFile);
            reader.onloadend = () => {
                setUploadImgUrl(reader.result);
            };
            console.log(uploadFile);
            formData.append('file', uploadFile);

            axios({
                method: 'post',
                url: '/file/upload',
                data: formData,
                headers: { "Content-Type": "multipart/form-data", }
              },
              ).then((response) => {
                console.log(axios.AxiosHeaders);
                console.log(response.data);
                if (response.status == 200) {
                  console.log("success upload profile image");
                }
                else {
                  alert("오류.");
                }
              })
        }
    };

    function fetchData() {
        axios.get(`/youtube/search?search=${search}}`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        .then((response) => {
            if (response.status === 200) { 
                console.log('서버 응답:', response.data);
                //setUsername(response.data.fullname); 
            }
        })
        .catch((error) => {
            console.error('youtubeapi 데이터를 가져오는 중 오류 발생:', error);
        });
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    return (
        <div className='backg'>
            <div className='white-line'>
                <div className='hang'>
                    <p className='login-gray' style={{ fontSize: "4vh" }}>마이페이지</p>
                    <img src={pictureapple} width='45px' height='35px' style={{ color: "white" }} />
                </div>
                <div style={{ height: "5vh" }}></div>
                <div className='hang2'>
                    {uploadImgUrl ? (
                        <img src={uploadImgUrl} alt="Profile" style={{ width: '100px', height: '100px' }} />
                    ) : (
                        <img src={picturebasic} alt="Default" style={{ width: '100px', height: '100px' }} />
                    )}
                    <div style={{ width: "5vw" }}></div>
                    <label htmlFor="file-upload" className="login-gray">
                        {"변경"}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />

                </div>
                <div style={{ height: "3vh" }}></div>
                <div className='grey-box2'>
                    <div style={{ width: "20vw" }}></div>
                    <div className='hang3'>
                        <p style={{ color: "black", fontSize: '2.7vh' }}>닉네임</p>
                        <div style={{ width: '0.5vw' }}></div>
                        <input className='input-2' type='text' placeholder='닉네임을 입력하세요...' />
                    </div>
                    <div style={{ height: '5vh' }}></div>
                    <div className='hang'>
                        <p style={{ color: "black", fontSize: '2.7vh' }}>프로필 뮤직</p>
                        <div style={{ width: '0.5vw' }}></div>
                        <input className='input-2' type='text' placeholder='프로필 뮤직을 설정하세요...' />
                        <div style={{ width: "0.5vw" }}></div>
                        <button className="login-gray" style={{ fontSize: "2.2vh" }} onClick={handleTrashClick}>검색</button>
                    </div>
                    <div style={{ height: '5vh' }}></div>
                    <div className='hang'>
                        <p style={{ color: "black", fontSize: '2.7vh' }}>한줄 소개</p>
                        <div style={{ width: '0.5vw' }}></div>
                        <input className='input-2' type='text' placeholder='한줄 소개를 입력하세요...' />
                    </div>
                    <div style={{ height: '5vh' }}></div>
                    <div className='hang'>
                        <p style={{ color: "black", fontSize: '2.7vh' }}>내 미니홈피 URL</p>
                        <div style={{ width: '0.5vw' }}></div>
                        <input className='input-2' type='text' placeholder='http://minihomep.com/haejin0221' />
                        <div style={{ width: "0.5vw" }}></div>
                        <button className="login-gray" style={{ fontSize: "2.2vh" }} onClick={() => console.log(localStorage.getItem("access_token"))}>복사</button>
                    </div>
                </div>
                <div style={{ height: "1vh" }}></div>
                <div className='hang'>
                    <div style={{ width: "55vw" }}></div>
                    <button className="login-gray" style={{ fontSize: "3vh" }} onClick={() => navigate(`/main/${localStorage.getItem("id")}`)}>수정하기</button>
                </div>
            </div>
            {showPopup && (
                <div className={`letter-popup ${isExiting ? 'exiting' : ''}`}>
                    <div className="music-popup-content">
                        <div className='hang'>
                            <p style={{ color: "black", fontSize: '2.7vh' }}>가수</p>
                            <div style={{ width: '0.5vw' }}></div>
                            <input className='input-4' type='text' placeholder='가수를 입력하세요.' value={singer} onChange={saveSinger}/>
                            <div style={{ width: '2vw' }}></div>
                            <p style={{ color: "black", fontSize: '2.7vh' }}>제목</p>
                            <div style={{ width: '0.5vw' }}></div>
                            <input className='input-4' type='text' placeholder='노래를 입력하세요.' value={title} onChange={saveTitle}/>
                        </div>
                        <div style={{ height: '1.5vw' }}></div>
                        <div className='hang'>
                            <input className='input-4' style={{ width: "45vw" }} type='text' placeholder='가수와 노래를 검색하세요.' value={search} onChange={saveSearch} />
                            <div style={{ width: '0.5vw' }}></div>
                            <button className="login-gray" style={{ fontSize: "2.7vh" }} onClick={() => fetchData()}>검색</button>
                        </div>
                        {searchResults.length > 0 && (
                            <div className="results-list">
                                <ul>
                                    {searchResults.map((result, index) => (
                                        <li key={index}>{result}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Mypage;
