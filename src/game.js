/* eslint-disable */

import React, { useState, useEffect, useRef } from "react";
import './game.css';

const Game = () => {
    const [wordList, setWordList] = useState([]);
    const [waitWords, setWaitWords] = useState([]);
    const [activeWordObjs, setActiveWordObjs] = useState([]);
    const [score, setScore] = useState(0);
    const [failed, setFailed] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [showHelp, setShowHelp] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);

    const gamePanelRef = useRef(null);
    const inputRef = useRef(null);
    const intervalRefs = useRef([]);

    const delay = 1000; // 단어가 떨어지는 간격
    const gameoverLimit = 1; // 게임 오버가 되는 실패 횟수

    // 최고 점수와 실패 기록을 localStorage에서 불러오기
    const getBestRecords = () => {
        const bestScore = localStorage.getItem('bestScore') || 0;
        const bestFailed = localStorage.getItem('bestFailed') || 0;
        return { bestScore: parseInt(bestScore), bestFailed: parseInt(bestFailed) };
    };

    const updateBestRecords = (newScore, newFailed) => {
        const { bestScore, bestFailed } = getBestRecords();
        if (newScore > bestScore) {
            localStorage.setItem('bestScore', newScore);
        }
        if (newFailed > bestFailed) {
            localStorage.setItem('bestFailed', newFailed);
        }
    };

    // 단어 리스트 불러오기
    useEffect(() => {
        fetch('/game.txt')
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
        if (failed >= gameoverLimit && gameStarted) {
            endGame();
        }
    }, [failed]);

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

        setShowHelp(false);
        setWaitWords([...wordList]);
        setScore(0);
        setFailed(0);
        setActiveWordObjs([]);
        setIsGameOver(false);

        const dropInterval = setInterval(() => {
            if (gamePanelRef.current) {
                setWaitWords((prevWaitWords) => {
                    if (prevWaitWords.length > 0) {
                        // 여기에서 단어를 랜덤하게 선택
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

        // 최고 기록 업데이트
        updateBestRecords(score, failed);
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
                    setFailed((prevFailed) => prevFailed + 1);
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

    const { bestScore, bestFailed } = getBestRecords();

    return (
        <div>
            <div className="game-info">
                <div>최고 점수: {bestScore}</div>
                <div>최고 실패: {bestFailed}</div>
            </div>
            {showHelp && !gameStarted && !isGameOver && (
                <div className="popup">
                    <div className="popup-content">
                        <h1>게임 설명</h1>
                        <div>
                            1. 위에서 떨어지는 단어가 <b>바닥에 닿기 전에</b> 해당 단어를{" "}
                            <b>입력</b>하여 점수를 획득하세요.
                            <br />
                            2. 없는 단어 입력 시 <b>점수가 차감</b>됩니다.
                            <br />
                            3. <b>단어</b>가 바닥에 떨어지면 <b>게임은 종료</b>
                            됩니다.
                            <br />
                            4. 단어가 모두 나와서 처리되면 <b>게임은 종료</b>됩니다.
                            <br />
                            5. 게임이 종료되면 획득한 점수가 공개됩니다.
                            <br />
                        </div>
                        <button onClick={() => setGameStarted(true)}>게임 시작</button>
                    </div>
                </div>
            )}
            {isGameOver && (
                <div className="popup">
                    <div className="popup-content">
                        <div id="end-score">점수 : {score}</div>
                        <button onClick={() => {
                            setGameStarted(true);
                            setIsGameOver(false);
                            setShowHelp(false); // 다시 시작 시 도움말을 숨깁니다.
                        }}>다시 시작</button>
                        <button onClick={() => setShowHelp(true)}>뒤로 가기</button>
                    </div>
                </div>
            )}
            {!showHelp && gameStarted && !isGameOver && (
                <div className="game">
                    <div
                        id="game-panel"
                        ref={gamePanelRef}
                    >
                        {renderWords()}
                    </div>
                    <div id="control-panel">
                        <input
                            id="input"
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            disabled={!gameStarted}
                            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                        />
                        <div>
                            Score: <span id="score">{score}</span>
                        </div>
                        <div>
                            Failed: <span id="failed">{failed}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
