import React, { useState, useRef } from 'react';
import './App.css';
import backimage from './assets/backg_image.png';
import letter_case from './assets/letter_case.png';
import tree from './assets/tree.png';

function Ground() {
    const [text, setText] = useState('소원을 적어주세요'); // 초기 메시지
    const [isEditing, setIsEditing] = useState(false);
    const textBoxRef = useRef(null); // useRef를 사용하여 contentEditable 요소를 참조

    const handleFocus = () => {
        if (!isEditing) {
            setText(''); // 텍스트 박스가 포커스될 때 내용 삭제
            setIsEditing(true); // 편집 상태로 설정
        }
    };

    const handleBlur = () => {
        const newText = text.trim();
        if (newText === '') {
            setText('소원을 적어주세요'); // 내용이 비어 있으면 기본 텍스트로 복원
        }
        setIsEditing(false); // 편집 상태 해제
    };

    // 소원 전송 버튼 눌렀을 때
    const handleSendClick = () => {
        if (text !== '소원을 적어주세요' && text.trim() !== '') {
            alert('소원이 전송되었습니다!'); 
            setText('소원을 적어주세요'); // 전송 누르고 나면 텍스트를 기본 메시지로 초기화
        }
    };

    // contentEditable 요소의 onInput 핸들러
    const handleInput = (e) => {
        setText(e.target.innerText); // 텍스트 업데이트
    };

    return (
        <div className='backg'>
            <div className='white-line'>
                <img src={backimage} alt="Background" className='backimage-style' />
                <img src={letter_case} alt="Letter Case" className='letter-case-style' />
                <img src={tree} alt="Tree" className='tree-style' />
                <div className='text-box-wrapper'>
                    <div 
                        ref={textBoxRef} // useRef로 요소를 참조
                        className='text-box-style'
                        contentEditable="true"
                        onFocus={handleFocus} // 포커스 시 기본 텍스트 삭제
                        onBlur={handleBlur} // 포커스 아웃 시 기본 텍스트 복원
                        onInput={handleInput} // 텍스트 업데이트
                    >
                        {text}
                    </div>
                    <button 
                        className='send-button' 
                        onClick={handleSendClick}
                        disabled={text === '소원을 적어주세요' || text.trim() === ''} // 버튼 비활성화
                    >
                        소원 전송
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Ground;
