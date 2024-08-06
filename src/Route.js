import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // CSS 파일을 임포트

const RouteTest = () => {
  return (
    <>
      <Link to="/ground" className="link-gray">광장 가기</Link>
      <br />
    </>
  );
};

export default RouteTest;
