// src/components/admin/AdminLogin.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Login.css';
import instance from "../../utils/axiosConfig.js";
import {setTokens} from "../../utils/auth.js";

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        id: '',
        pw: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData,
            [name]: value });
    }
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        instance.post('http://localhost:8080/auth/admin/login', formData)
            .then(response => {
                const { accessToken, refreshToken} = response.data;
                setTokens(accessToken, refreshToken);
                navigate('/admin/adminPage');
            })
            .catch(error => {
                alert("로그인 실패")
            })
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div>
                <label htmlFor="admin-id">아이디</label>
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
                <label htmlFor="admin-pw">비밀번호</label>
                <input
                    type="password"
                    id="pw"
                    name="pw"
                    value={formData.pw}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="login-submit-button">로그인</button>
        </form>
    );
};

export default AdminLogin;
