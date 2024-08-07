import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MemberLogin from './member/MemberLogin';
import ManagerLogin from './manager/ManagerLogin';
import logo from '/src/assets/logo1.png'; // 로고 이미지
import '/src/styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('member');

    const logoClick = () => {
        navigate("/")
    }

    return (
        <div className="login-container">
            <div className="login-header">
                <div className="login-logo-container">
                    <img src={logo} alt="Logo" className="login-logo" onClick={logoClick}/>
                </div>
                <div className="login-tabs">
                    <button
                        className={`login-tab ${activeTab === 'member' ? 'active' : ''}`}
                        onClick={() => setActiveTab('member')}
                    >
                        회원 로그인
                    </button>
                    <button
                        className={`login-tab ${activeTab === 'manager' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manager')}
                    >
                        매니저 로그인
                    </button>
                </div>
            </div>
            <div className="login-form-container">
                {activeTab === 'member' ? <MemberLogin /> : <ManagerLogin />}
            </div>
        </div>
    );
};

export default Login;
