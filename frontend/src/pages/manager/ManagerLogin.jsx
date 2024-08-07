import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setTokens } from '../../utils/auth';
import '/src/styles/pages/manager/ManagerLogin.css';
import instance from "../../utils/axiosConfig.js";

const ManagerLogin = () => {
    const [formData, setFormData] = useState({ id: '', pw: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('forData='+formData)
        instance.post('http://localhost:8080/auth/manager/login', formData, {

            withCredentials: true
        })
            .then(response => {
                const { accessToken, refreshToken, no } = response.data;
                setTokens(accessToken, refreshToken, no);
                navigate('/manager/managerPage');
            })
            .catch(error => {
                alert(error.response?.data);
            });
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">아이디</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pw">비밀번호</label>
                    <input
                        type="password"
                        id="pw"
                        name="pw"
                        value={formData.pw}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="login-help-links">
                    <Link to="/manager/findId">아이디 찾기</Link>
                    <Link to="/manager/resetPw">비밀번호 재설정</Link>
                    <Link to="/manager/register">매니저 회원가입</Link>

                </div>
                <button type="submit" className="login-submit-button">로그인</button>
            </form>
        </div>
    );
};

export default ManagerLogin;
