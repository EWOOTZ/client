/* eslint-disable */
import './App.css';
import { useState } from 'react';
import pictureHome from './images/Oak Tree.png';
import pictureapple from './images/apple.png';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';



function Mypage() {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState("");
    const [uploadImgUrl, setUploadImgUrl] = useState("");

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

        }
    };


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
                            <img src={pictureapple} alt="Default" style={{ width: '100px', height: '100px' }} />
                        )}
                        <div style={{width : "5vw"}}></div>
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
                        <button className="login-gray" style={{ fontSize: "2.2vh" }} onClick={() => navigate()}>검색</button>
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
                        <button className="login-gray" style={{ fontSize: "2.2vh" }} onClick={() => console.log(uploadFile)}>복사</button>
                    </div>
                </div>
                <div style={{ height: "1vh" }}></div>
                <div className='hang'>
                    <div style={{ width: "55vw" }}></div>
                    <button className="login-gray" style={{ fontSize: "3vh" }} onClick={() => navigate("/main")}>수정하기</button>
                </div>
            </div>
        </div>
    );
}

export default Mypage;
