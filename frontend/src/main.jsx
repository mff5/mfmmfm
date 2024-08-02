import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import { logTokenExpiry } from '/src/utils/auth.js'; // auth 모듈에서 가져옴

// 디버깅 목적으로 앱 초기화 전에 토큰 만료 시간 로그
logTokenExpiry();

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
