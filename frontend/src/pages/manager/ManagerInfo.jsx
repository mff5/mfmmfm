import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '/src/styles/pages/manager/ManagerInfo.css';
import instance from "../../utils/axiosConfig.js";
import {getNo} from "../../utils/auth.js";

const ManagerInfo = () => {
    const [manager, setManager] = useState({
        no: '',
        id: '',
        name: '',
        phone: '',
        email: '',
        regDate: ''
    });

    useEffect(() => {
        // 예시 데이터
        const mockData = {
            no: 1,
            id: 'manager123',
            name: '홍길동',
            phone: '01012345678',
            email: 'manager@example.com',
            regDate: '2024-01-01'
        };

        // 실제 데이터 가져오기
        instance.get(`http://localhost:8080/auth/manager/${getNo()}`)
            .then(response => {
                setManager(response.data);
            })
            .catch(error => {
                console.error('Error fetching manager data', error);
                setManager(mockData); // 임시 데이터 사용
            });
    }, []);

    return (
        <div className="manager-info-page">
            <div className="manager-info-container">
                <h1 className="manager-info-title">Manager Profile</h1>
                <div className="manager-info-details">
                    <div className="manager-info-field">
                        <label>No:</label>
                        <span>{manager.no}</span>
                    </div>
                    <div className="manager-info-field">
                        <label>ID:</label>
                        <span>{manager.id}</span>
                    </div>
                    <div className="manager-info-field">
                        <label>Name:</label>
                        <span>{manager.name}</span>
                    </div>
                    <div className="manager-info-field">
                        <label>Phone:</label>
                        <span>{manager.phone}</span>
                    </div>
                    {manager.email && (
                        <div className="manager-info-field">
                            <label>Email:</label>
                            <span>{manager.email}</span>
                        </div>
                    )}
                    <div className="manager-info-field">
                        <label>Registration Date:</label>
                        <span>{manager.regDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerInfo;
