/* eslint-disable */
import './App.css';
import { useState } from 'react';
import pictureHome from './images/Oak Tree.png';
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Ground from './ground';
import Join from './join';
import Letter from './Letter';
import Main from './main';
import Mypage from './mypage';
import Game from './game';
import axios from 'axios';
import Swal from 'sweetalert2';
import Write from './write';
import Notice from './notice';
import Submain from './submain';

const Home = () => {
  let title = '<당신>의\n';
  let title2 = '마이홈피';
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  let {id2} = useParams();
  const formData = new FormData();
  formData.append('username', id);
  formData.append('password', pw);
  
  const saveUserId = event => {
    setId(event.target.value);
    console.log(event.target.value);
  };

  const saveUserPw = event => {
    setPw(event.target.value);
    console.log(event.target.value);
  };

  function Login() {
    axios({
      method: 'post',
      url: '/api/auth/token',
      data: formData,
      headers: { "Content-Type": 'application/x-www-form-urlencoded', }
    },
    ).then((response) => {
      console.log(axios.AxiosHeaders);
      console.log(response.data);
      if (response.status == 200) {
        localStorage.setItem("id", id);
        localStorage.setItem("access_token", response.data.access_token);
        console.log(localStorage.getItem("access_token"));
        navigate(`/main/${id}`);
        console.log("로그인 성공");
      }
      else {
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          text: "아이디나 패스워드를 다시 확인해주세요!",
      });
      }
    }).catch((error) => {
      console.log(error.response);
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text: "아이디나 패스워드를 다시 확인해주세요!",
    });  });
  }

  return (
    <div className='white-line'>
      <div>
        <img src={pictureHome} width='30vw' height='30vh' style={{ color: "white" }} />
        <img src={pictureHome} width='30vw' height='30vh' style={{ color: "white" }} />
        <img src={pictureHome} width='30vw' height='30vh' style={{ color: "white" }} />
      </div>
      <p style={{ color: '#00DAC0', fontSize: 48 }}>
        {title}
      </p>
      <p style={{ color: '#8A8A8A', fontSize: 48 }}>
        {title2}
      </p>
      <div style={{ height: "1vw" }}></div>
      <div className='grey-box'>
        <div className='yellow-box'>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '20px' }}>ID</p>
            <div style={{ width: '1vw' }}></div>
            <input className='input-name' type='text' placeholder='아이디를 입력하세요...' value={id} onChange={saveUserId} />
          </div>
          <div style={{ height: '5vh' }}></div>
          <div className='hang'>
            <p style={{ color: "black", fontSize: '20px' }}>PW</p>
            <div style={{ width: '1vw' }}></div>
            <input className='input-name' type='password' placeholder='패스워드를 입력하세요...' value={pw} onChange={saveUserPw} />
          </div>
          <div style={{ height: '10vh' }}></div>
          <button className="login-gray" style={{ fontSize: "30px" }} onClick={() => Login()}>로그인!</button>
          <div style={{ height: '20vh' }}></div>
          <button className="login-gray" style={{ fontSize: "15px" }} onClick={() => navigate("/join")}>&lt;당신&gt;의 마이홈피가 처음이라면?</button>
        </div>
      </div>
    </div>
  );
}

const App= () => {
  return (
    <div className='backg'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ground/:id" element={<Ground />} />
          <Route path="/join" element={<Join />} />
          <Route path="/letter/:id" element={<Letter />} />
          <Route path="/main/:id" element={<Main />} />
          <Route path="/submain/:username" element={<Submain />} />
          <Route path="/mypage/:id" element={<Mypage />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/notice/:id" element={<Notice />} />
          <Route path="/write/:id" element={<Write/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
