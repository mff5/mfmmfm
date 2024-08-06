import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setTokens } from '../../utils/auth';
import '/src/styles/pages/manager/ManagerLogin.css';

const ManagerLogin = () => {
    const [formData, setFormData] = useState({ id: '', pw: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth/manager/login', formData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(response => {
                const { accessToken, refreshToken, no } = response.data;
                setTokens(accessToken, refreshToken, no);
                navigate('/manager/dashboard');
            })
            .catch(error => {
                alert(error.response?.data || '알 수 없는 오류가 발생했습니다.');
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
                </div>
                <button type="submit" className="login-submit-button">로그인</button>
            </form>
        </div>
    );
};

export default ManagerLogin;
