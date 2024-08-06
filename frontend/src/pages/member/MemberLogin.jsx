import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { setTokens } from '../../utils/auth';
import { SocialGoogle, SocialKakao, SocialNaver } from "../../components/member/Social";
import '/src/styles/pages/member/MemberLogin.css';

const MemberLogin = () => {
    const [formData, setFormData] = useState({ id: '', pw: '' });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const message = query.get('message');
        if (message === 'success') {
            alert('소셜 계정으로 회원등록 성공');
        } else if (message === 'error') {
            alert('소셜 계정으로 회원등록 실패');
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/auth/member/login', formData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(response => {
                const { accessToken, refreshToken, no } = response.data;
                setTokens(accessToken, refreshToken, no);
                navigate('/');
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
                    <Link to="/member/findId">아이디 찾기</Link>
                    <Link to="/member/resetPw">비밀번호 재설정</Link>
                    <Link to="/member/register">회원가입</Link>
                </div>
                <button type="submit" className="login-submit-button">로그인</button>
            </form>
            <div className="social-login-buttons">
                <SocialKakao />
                <SocialNaver />
                <SocialGoogle />
            </div>
        </div>
    );
};

export default MemberLogin;
