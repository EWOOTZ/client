/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import './Letter.css';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function Notice() {

  return (
    <div className='white-line'>

          <div className='hang'>


          <div className='notice-gray-box'>

            <p style={{ color: "black", fontSize: '20px' }}>제목</p>
            <div style={{ width: '1vw' }}></div>

            <div className='green-box'>
                   \

                            </div>

                          
                  
                            
                            <div style={{ width: "4vh" }}></div>
                                <button className="login-gray" style={{ fontSize: "20px" }} onClick={() => navigate('/ground')}>글쓰기!</button>
                         
           

          </div>

          <div className='notice-gray-box2'>

<p style={{ color: "black", fontSize: '20px' }}>제목</p>
<div style={{ width: '1vw' }}></div>
</div>
          </div>
         

        
      </div>
    
  );
}

export default Notice;
