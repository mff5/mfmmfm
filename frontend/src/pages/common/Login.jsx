import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberLogin from '../member/MemberLogin.jsx';
import ManagerLogin from '../manager/ManagerLogin.jsx';
import AdminLogin from '../admin/AdminLogin.jsx';
import logo from '/src/assets/logo1.png'; // 로고 이미지
import '/src/styles/Login.css';
import instance from "../../utils/axiosConfig.js";

const Login = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('member');

    const logoClick = () => {
        navigate("/");
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <div className="login-logo-container">
                    <img src={logo} alt="Logo" className="login-logo" onClick={logoClick} />
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
                    <button
                        className={`login-tab ${activeTab === 'admin' ? 'active' : ''}`}
                        onClick={() => setActiveTab('admin')}
                    >
                        관리자 로그인
                    </button>
                </div>
            </div>
            <div className="login-form-container">
                {activeTab === 'member' && <MemberLogin />}
                {activeTab === 'manager' && <ManagerLogin />}
                {activeTab === 'admin' && <AdminLogin />}
            </div>
        </div>
    );
};

export default Login;
