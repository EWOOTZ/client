/* eslint-disable */
import './App.css';
import { useEffect, useState } from 'react';
import pictureHome from './images/Oak Tree.png';
import pictureapple from './images/apple.png';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join() {
  let title = '<당신>의\n';
  let title2 = '마이홈피';
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [repw, setRepw] = useState('');
  const [name, setName] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState("");

  const saveUserId = event => {
    setId(event.target.value);
    console.log(event.target.value);
  };

  const saveUserPw = event => {
    setPw(event.target.value);
    console.log(event.target.value);
  };

  const saveUserRepw = event => {
    setRepw(event.target.value);
    console.log(event.target.value);
  };

  const saveUserName = event => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    if (repw && pw != repw) {
      setIsPasswordMatch("비밀번호가 일치하지 않습니다.");
    } else {
      setIsPasswordMatch("");
    }

  }, [pw, repw]);

  function idCheck() {
    axios.post(
      `/users/duplicate?username=${id}`,

      {
        'headers': { 'Content-Type': 'application/json' }
      }
    ).then((response) => {
      console.log(axios.AxiosHeaders);
      console.log(response.data);
      if (response.status == 200) {
        alert("사용가능한 아이디입니다.");
      }
    }).catch((error) => {
      alert("이미 있는 아이디입니다.");
    });
  }

  function Signup() {
    if (!id || !pw || !repw || !name) {
      alert("모든 항목을 입력해주세요.");
    } else if (pw !== repw) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      axios.post(
        '/users/signup',
        { "username": id, "password": pw, "fullname": name },
        {
          'headers': { 'Content-Type': 'application/json' }
        }
      ).then((response) => {
        console.log(axios.AxiosHeaders);
        console.log(response.data);
        if (response.status == 201) {
          //localStorage.setItem("access_token", response.data[0]);
          alert("회원가입 성공! 로그인 해주세요!");
          navigate("/");
          console.log("회원가입 성공");
          console.log(response.data[0]);

        }
        else {
          alert("회원가입 실패");
          console.log(id);
          console.log(pw);
          console.log(name);
        }
      }).catch((error) => {
        console.log(error.response);
        console.log(id);
        console.log(pw);
        console.log(name);
        alert("회원가입 실패");
      });
    }

  }
  return (
    <div className='backg'>
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
            <div className='hang' style={{ paddingLeft: "1vh" }}>
              <p style={{ color: "black", fontSize: '20px' }}>ID</p>
              <div style={{ width: '1vw' }}></div>
              <input className='input-3' type='text' placeholder='아이디를 입력하세요.' value={id} onChange={saveUserId} />
              <div style={{ width: '0.6vw' }}></div>
              <button className="login-gray" style={{ fontSize: "15px" }} onClick={() => idCheck()}>중복확인</button>
            </div>
            <div style={{ height: '5vh' }}></div>
            <div className='hang'>
              <p style={{ color: "black", fontSize: '20px' }}>PW</p>
              <div style={{ width: '1vw' }}></div>
              <input className='input-name' type='text' placeholder='패스워드를 입력하세요.' value={pw} onChange={saveUserPw} />
            </div>
            <div style={{ height: '5vh' }}></div>
            <div className='hang'>
              <p style={{ color: "black", fontSize: '13px' }}>확인</p>
              <div style={{ width: '0.7vw' }}></div>
              <div>
                <input className='input-name' type='text' placeholder='패스워드를 재입력하세요.' value={repw} onChange={saveUserRepw} />
                <div style={{ height: '0.5vh' }}></div>
                {isPasswordMatch && (
                  <p style={{ color: 'red', fontSize: '10px' }}>{isPasswordMatch}</p>
                )}
              </div>
            </div>
            <div style={{ height: '5vh' }}></div>
            <div className='hang'>
              <p style={{ color: "black", fontSize: '13px' }}>이름</p>
              <div style={{ width: '0.7vw' }}></div>
              <input className='input-name' type='text' placeholder='이름을 입력하세요.' value={name} onChange={saveUserName} />
            </div>
            <div style={{ height: '25vh' }}></div>
            <div className='hang'>
              <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => Signup()}>가입하기!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
