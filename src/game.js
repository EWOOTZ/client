/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import './game.css';
import './App.css';
import './Letter.css';
import axios from 'axios';
import pictureApple from './images/apple.png';
import { useNavigate } from 'react-router-dom'; // 추가


const Game = () => {
    const navigate = useNavigate();
    const [wordList, setWordList] = useState([]);
    const [waitWords, setWaitWords] = useState([]);
    const [activeWordObjs, setActiveWordObjs] = useState([]);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(5); // 생명 상태 변수 추가
    const [isGameOver, setIsGameOver] = useState(false);
    const [showHelp, setShowHelp] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [username, setUsername] = useState('');
    const [bestScore, setBestScore] = useState(0);

    const gamePanelRef = useRef(null);
    const inputRef = useRef(null);
    const intervalRefs = useRef([]);

    const delay = 1250; // 단어가 떨어지는 간격

    const handleClosePopup = () => {
        navigate('/main/:id');
    };

    const renderLives = () => {
        const lifeIcons = [];
        for (let i = 0; i < 5; i++) {
            lifeIcons.push(
                <img 
                    key={i}
                    src={pictureApple} 
                    style={{ width: '47px', opacity: i >= lives ? 0.5 : 1, paddingTop:'55px'}} 
                    alt="life"
                />
            );
        }
        return lifeIcons;
    };

    const getBestRecords = () => {
        const storedBestScore = localStorage.getItem('bestScore') || 0;
        return { bestScore: parseInt(storedBestScore) };
    };

    const updateBestRecords = (newScore) => {
        const { bestScore } = getBestRecords();
        if (newScore > bestScore) {
            localStorage.setItem('bestScore', newScore);
        }
    };

    const fetchName = () => {
        axios.get('/users/me', {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setUsername(response.data.fullname);
                    console.log('fetchName 서버 응답:', response.data);
                }
            })
            .catch((error) => {
                console.error('username 데이터를 가져오는 중 오류 발생:', error);
            });
    };

    const fetchData = () => {
        axios.get('/score/', {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        .then((response) => {
            if (response.status === 200) { 
                console.log('모든 game score 서버 응답:', response.data);
            }
        })
        .catch((error) => {
            console.error('game 데이터를 가져오는 중 오류 발생:', error);
        });
    };

    const fetchScore = () => {
        axios.get('/score/me', {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        .then((response) => {
            if (response.status === 200) { 
                const serverBestScore = response.data.score;
                setBestScore(serverBestScore);
                console.log('나의 game score 서버 응답:', response.data);
                console.log('최고 점수:', serverBestScore);
            }
        })
        .catch((error) => {
            console.error('게임 점수를 가져오는 중 오류 발생:', error);
        });
    };

    function sendGame() {
        axios.put(
            '/score/',
            { "username": username, "score": score },
            {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            if (response.status === 201) {
                console.log("게임 put 성공 ", response.data);
            }
        })     
        .catch((error) => {
            console.error('game을 전송하는 중 오류 발생:', error);
        });
    }

    useEffect(() => {
        fetchName();
        fetchData(); 
        fetchScore();
    }, []);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/game.txt')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then((text) => {
                const words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
                setWordList(words);
            })
            .catch((error) => {
                console.error('Error fetching the word list:', error);
            });
    }, []);

    useEffect(() => {
        if (gameStarted) {
            startGame();
        }

        return () => {
            intervalRefs.current.forEach((interval) => clearInterval(interval));
            intervalRefs.current = [];
        };
    }, [gameStarted]);

    useEffect(() => {
        if (activeWordObjs.length === 0 && waitWords.length === 0 && gameStarted) {
            endGame();
        }
    }, [activeWordObjs, waitWords]);

    useEffect(() => {
        if (lives <= 0 && gameStarted) {
            endGame();
        }
    }, [lives]);

    useEffect(() => {
        if (gameStarted && inputRef.current) {
            inputRef.current.focus();
        }
    }, [gameStarted]);

    const startGame = () => {
        if (wordList.length === 0) {
            alert('단어 리스트를 불러오는 중입니다. 잠시만 기다려 주세요.');
            return;
        }

        fetchScore();

        setShowHelp(false);
        setWaitWords([...wordList]);
        setScore(0);
        setLives(5); // 게임 시작 시 생명을 3으로 초기화
        setActiveWordObjs([]);
        setIsGameOver(false);

        const dropInterval = setInterval(() => {
            if (gamePanelRef.current) {
                setWaitWords((prevWaitWords) => {
                    if (prevWaitWords.length > 0) {
                        const randomIndex = Math.floor(Math.random() * prevWaitWords.length);
                        const word = prevWaitWords[randomIndex];
                        const remainingWords = prevWaitWords.filter((_, idx) => idx !== randomIndex);

                        const x = Math.floor(
                            Math.random() * (gamePanelRef.current.offsetWidth - 50)
                        );
                        const speed = Math.random() * 15 + 1;
                        const wordObj = { word, x, y: 0, speed };
                        setActiveWordObjs((prevActive) => [...prevActive, wordObj]);
                        return remainingWords;
                    } else {
                        clearInterval(dropInterval);
                        return prevWaitWords;
                    }
                });
            }
        }, delay);

        intervalRefs.current.push(dropInterval);
    };

    const endGame = () => {
        intervalRefs.current.forEach((interval) => clearInterval(interval));
        intervalRefs.current = [];
        setGameStarted(false);
        setIsGameOver(true);

        updateBestRecords(score);

        sendGame();
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            hitWord(inputRef.current.value.trim());
            inputRef.current.value = "";
        }
    };

    const hitWord = (inputWord) => {
        const index = activeWordObjs.findIndex((obj) => obj.word === inputWord);
        if (index !== -1) {
            const newActiveWords = [...activeWordObjs];
            newActiveWords.splice(index, 1);
            setActiveWordObjs(newActiveWords);
            setScore((prevScore) => prevScore + 1);
        } else {
            setScore((prevScore) => Math.max(prevScore - 1, 0));
        }
    };

    const renderWords = () => {
        return activeWordObjs.map((wordObj, index) => {
            if (gamePanelRef.current) {
                const yPosition = wordObj.y + wordObj.speed;
                if (yPosition >= gamePanelRef.current.offsetHeight - 30) {
                    if (lives > 1) { // 생명이 1 이상일 때만 생명 차감
                        setLives((prevLives) => prevLives - 1);
                    } else {
                        endGame(); // 생명이 0이면 게임 종료
                    }             
                     const newActiveWords = [...activeWordObjs];
                    newActiveWords.splice(index, 1);
                    setActiveWordObjs(newActiveWords);
                    return null; // 단어 제거
                } else {
                    wordObj.y = yPosition;
                    return (
                        <div
                            key={index}
                            className="word"
                            style={{
                                position: "absolute",
                                left: wordObj.x,
                                top: wordObj.y,
                                whiteSpace: "nowrap",
                            }}
                        >
                            {wordObj.word}
                        </div>
                    );
                }
            } else {
                return null;
            }
        });
    };

    return (
        <div>
            {showHelp && !gameStarted && !isGameOver && (
                <div className="popup">
                    
                    <div className="popup-content">
                    <button onClick={handleClosePopup} className="close-button" style={{width: "15px",paddingRight:'20px'}}>X</button>
                        <div className='hang'>
                            <img src={pictureApple} style={{ width: '50px', height: '50px', }} alt="life"/>
                            <h1>게임 설명</h1>
                            <img src={pictureApple} style={{ width: '50px', height: '40px', }} alt="life"/>
                        </div>
                        <div style={{ height: "1.5vw" }}></div>
                        1. 위에서 떨어지는 단어가 바닥에 닿기 전에 
                        <div style={{ height: "0.6vw" }}></div>         
                        해당 단어를 입력하여 점수를 획득하세요. 
                        <div style={{ height: "1.5vw" }}></div>         
                        2. 없는 단어 입력 시 점수가 차감 됩니다.
                        <br />
                        <div style={{ height: "1.5vw" }}></div>
                        3. 단어가 바닥에 떨어지거나 모두 입력 할 경우 
                        <div style={{ height: "0.6vw" }}></div>         
                        게임은 종료됩니다.
                        <br />
                        <div style={{ height: "1.5vw" }}></div>
                        <button onClick={() => setGameStarted(true)}>게임 시작</button>
                    </div>
                </div>
            )}
            {isGameOver && (
                <div className="popup">
                    <div className="popup-content" style={{ fontSize: "18px" }}>
                        <div style={{ height: "1.5vw" }}></div>
                        <div id="end-score">현재 점수 : {score}</div>
                        <div style={{ height: "3vw" }}></div>
                        <div>최고 점수: {bestScore}</div>
                        <div style={{ height: "2vw" }}></div>
                        <button onClick={() => {
                            setGameStarted(true);
                            setIsGameOver(false);
                            setShowHelp(false); 
                        }}>다시 시작</button>
                        <button onClick={() => {
                            setShowHelp(true);
                            setIsGameOver(false);
                        }}>뒤로 가기</button>
                    </div>
                </div>
            )}
            {!showHelp && gameStarted && !isGameOver && (
                <div className="hang">
                    <div className="game">
                        <div className="game-panel" ref={gamePanelRef}>
                            {renderWords()}
                        </div>
                        <div className="control-panel">
                            <input
                                id="input"
                                ref={inputRef}
                                onKeyDown={handleKeyDown}
                                disabled={!gameStarted}
                                style={{ fontFamily: "HJ", width: "35vw", height: "3vh", padding: "8px", fontSize: "15px" }}
                            />
                        </div>
                    </div>
                    <div className="column-containers">
                    <div className="lives-display" style={{}}>
                        {renderLives()}
                    </div>
                </div>
                <div className="game-info-container">
                    <div className="game-info">
                        <div>현재 점수: {score}</div>
                    </div>
                    <div className="game-info">
                        <div>최고 점수: {bestScore}</div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default Game;

