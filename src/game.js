/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

const wordString = `길거리
길다
길어지다
길이
김
김밥
김치
김치찌개
김포공항
깊다
깊숙이
깊이
까다
까닭
까만색
까맣다
까먹다
까치01
깍두기
깎다
깔끔하다
깔다
깔리다01
깜빡
깜짝02
깡패
깨끗이
깨끗하다
깨끗해지다
깨다01
깨다02
깨닫다
깨달음
깨뜨리다
깨소금
깨어나다
깨어지다
깨우다01
깨지다
꺼내다
꺼지다01
꺾다
껌
껍질
꼬리01
꼬마
꼭02
꼭03
꼭대기
꼴01
꼼꼼하다
꼼짝
꼽히다01
꽂다
꽃01
꽃씨
꽃잎
꽉
꽤01
꾸다01
꾸다02
꾸리다01
꾸미다
꾸준하다
꾸준히
꾸중
꿀
꿈01
꿈꾸다
꿈속
끄다01
끄덕이다
끈01
끊기다
끊다
끊어지다
끊임없다
끊임없이
끌다
끌리다
끌어당기다
끓다
끓이다01
끝01
끝나다
끝내
끝내다
끝없다
끝없이
끼01
끼다02
끼다03
끼어들다
끼우다01
나03
나가다
나가다
나누다
나누어지다
나뉘다
나다01
나다01
나들이01
나라01
나란히
나르다01
나름
나머지
나무01
나물01
나뭇가지
나뭇잎
나비03
나빠지다
나쁘다01
나서다
나아가다
나아지다
나오다
나이01
나중01
나침반
나타나다
나타내다
나흘
낙엽
낚시
낚시꾼
낚싯대
난리02
난방02
날01
날개01
날다01
날리다02
날씨01
날아가다
날아다니다
날아오다
날짜01
날카롭다
낡다01
남01
남02
남04
남기다
남녀
남다01
남대문
남대문시장
남동생
남매
남미
남부01
남북
남산
남성01
남자02
남쪽
남편01
남학생
납득하다
낫다01
낫다02
낭비
낮
낮다
낮아지다
낮추다
낯설다
낱말02
낳다01
내09
내과01
내내01
내년
내놓다
내다02
내다02
내다보다
내달
내려가다
내려놓다
내려다보다
내려오다
내려지다
내리다01
내밀다
내버리다
내보내다
내부04
내쉬다
내외01
내외02
내용02
내용물
내일
내일
내적01
내주다
내지01
내후년
냄비
냄새
냇물
냉동
냉면
냉방
냉장고
너01
너머
너무01
너무나
너희
넉01
넉넉하다
널리
넓다
넓어지다
넓히다
넘겨주다
넘기다
넘다01
넘어가다01
넘어뜨리다
넘어서다
넘어오다
넘어지다
넘치다
넣다
네02
네03
네거리
넥타이
넷01
넷째
넷째
녀석
년02
년대
년도
년생80
노동03
노동자
노란색
노랗다
노래01
노래방
노래하다
노랫소리
노력01
노력하다01
노선01
노인01
노트02
녹다01
녹색
녹음03
녹음하다
녹이다
녹차01
녹화03
논01
논리
논리적01
논문
논의하다
논쟁
논하다
놀다01
놀라다
놀랍다
놀리다01
놀이01
놀이터
놈01
농구07
농담01
농민
농부01
농사01
농사일
농사짓다
농산물
농업
농장05
농촌
높다
높아지다
높이01
높이02
높이다
놓다01
놓다01
놓아두다
놓이다
놓치다
놔두다
뇌03
누구
누나01
누르다01
눈01
눈04
눈가
눈감다
눈길01
눈동자
눈뜨다
눈물01
눈병
눈부시다
눈빛01
눈썹
눈앞
눕다01
뉴스
뉴욕
느껴지다
느끼다02
느낌
느리다01
늑대
늘
늘다01
늘리다
늘어나다
늘어놓다
늘어서다
늘어지다
늙다`.split('\n' );

const Game = () => {
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

    const startGame = () => {
        setShowHelp(false);
        setWaitWords([...wordString]);
        setScore(0);
        setFailed(0);
        setActiveWordObjs([]);
        setIsGameOver(false);
        inputRef.current.focus();

        const dropInterval = setInterval(() => {
            if (waitWords.length > 0) {
                const word = waitWords.shift();
                const x = Math.floor(
                    Math.random() * (gamePanelRef.current.offsetWidth - 50)
                );
                const speed = Math.random() * 15 + 1; 
                const wordObj = { word, x, y: 0, speed };
                setActiveWordObjs((prev) => [...prev, wordObj]);
            } else {
                clearInterval(dropInterval);
            }
        }, delay);

        intervalRefs.current.push(dropInterval);
    };

    const endGame = () => {
        intervalRefs.current.forEach((interval) => clearInterval(interval));
        intervalRefs.current = [];
        setGameStarted(false);
        setIsGameOver(true);
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
            const yPosition = wordObj.y + wordObj.speed;
            if (yPosition >= gamePanelRef.current.offsetHeight - 30) {
                setFailed((prevFailed) => prevFailed + 1);
                const newActiveWords = [...activeWordObjs];
                newActiveWords.splice(index, 1);
                setActiveWordObjs(newActiveWords);
            } else {
                wordObj.y = yPosition;
            }
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
        });
    };

    return (
        <div id="frame">
            <div
                id="game-panel"
                ref={gamePanelRef}
                style={{
                    position: "relative",
                    width: "100%",
                    height: "500px",
                    border: "1px solid black",
                    overflow: "hidden",
                }}
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
            {showHelp && (
                <div id="board">
                    <div id="help-div">
                        <label id="help-title">게임 설명</label>
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
                <div id="board">
                    <div id="end-score">점수 : {score}</div>
                    <button onClick={() => setGameStarted(true)}>다시 시작</button>
                    <button onClick={() => setShowHelp(true)}>게임 설명</button>
                </div>
            )}
        </div>
    );
};

export default Game;
