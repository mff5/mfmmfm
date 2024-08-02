import '../../styles/pages/member/MemberLogin.css';
import { setTokens } from '../../utils/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SocialGoogle, SocialKakao, SocialNaver } from "../../components/member/Social.jsx";

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
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(response => {
                const { accessToken, refreshToken } = response.data;
                setTokens(accessToken, refreshToken);
                console.log('Stored accessToken!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:', localStorage.getItem('accessToken'));
                navigate('/');
            })
            .catch(error => {
                alert(error.response?.data || '알 수 없는 오류가 발생했습니다.');
            });
    };

    const logoClick = () => {
        navigate("/");
    };

    return (
        <div className="member-login-page">
            <div className="member-login-form">
                <div className="member-login-logo" onClick={logoClick}>OFFICE24</div>
                <h2>로그인</h2>
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
                    <div className="member-login-help-links">
                        <Link to="/member/findId">아이디 찾기</Link>
                        <Link to="/member/resetPw">비밀번호 재설정</Link>
                        <Link to="/member/register">회원가입</Link>
                    </div>
                    <button type="submit" className="member-login-submit-button">로그인</button>
                </form>
                <SocialKakao />
                <SocialNaver />
                <SocialGoogle />
            </div>
        </div>
    );
};

export default MemberLogin;
