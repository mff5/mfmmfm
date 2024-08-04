import React, {useEffect, useState} from 'react';
import '/src/styles/pages/member/MemberMyPage.css';
import axios from "axios";
import {isAuthenticated, getAccessToken, refreshAccessToken} from "../../utils/auth.js";
import {useNavigate} from "react-router-dom";

const MemberMyPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('info');
    const [member, setMember] = useState([]);
    const [payments, setPayments] = useState([]);
    const accessToken = getAccessToken();

    useEffect(() => {
        console.log('mypage accessToken' + accessToken);

        const fetchMemberInfo = async () => {
            try {
                let tokenValid = await isAuthenticated();
                if (!tokenValid) {
                    console.log("Unauthorized - Token might be invalid or expired");
                    navigate('/login');
                    return;
                }

                const updatedAccessToken = getAccessToken();
                const response = await axios.get("http://localhost:8080/auth/member", {
                    headers: {
                        Authorization: `Bearer ${updatedAccessToken}`,
                    },
                });

                setMember(response.data.member);
                setPayments(response.data.payments)
            } catch (error) {
                console.error("Error fetching user info and bookings:", error);
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized - Token might be invalid or expired");
                    navigate('/login');
                }
            }
        };

        fetchMemberInfo();
    }, [activeTab, accessToken, navigate]);

    const renderContent = () => {
        if (activeTab === 'info') {
            return (
                <div className="info-content">
                    <h3>내정보</h3>
                    {member ? (
                        <div>
                            <p>아이디: {member.id}</p>
                            <p>이름: {member.name}</p>
                            <p>이메일: {member.email}</p>
                            <p>전화번호: {member.phone}</p>
                            <p>생일: {new Date(member.birth).toLocaleDateString()}</p>
                            <p>성별: {member.gender}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            );
        }  else if (activeTab === 'reservations') {
            return (
                <div className="reservation-list">
                    <h3 className="reservation-title">내 예약</h3>
                    {payments ? (
                        payments.map(booking => (
                            <div className="reservation-item" key={booking.no}>
                                <div className="reservation-details">
                                    <p className="reservation-title">{booking.name}</p>
                                    <p>{new Date(booking.startDate).toLocaleDateString()} ~ {new Date(booking.endDate).toLocaleDateString()}</p>
                                    <p className={`status-${booking.status.toLowerCase()}`}>{booking.status}</p>
                                </div>
                                <div className="reservation-actions">
                                    <button className="cancel-button">Cancel</button>
                                    <button className="review-button">Review</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            );
        }
    };

    return (
        <div className="mypage-wrapper">
            <div className="mypage-container">
                <div className="sidebar">
                    <div className="logo-container">
                        <img src="/path/to/logo.png" alt="Logo" className="logo"/>
                    </div>
                    <div className="profile-section">
                        <div className="profile-image">사진</div>
                        <p className="profile-name">사용자 이름</p>
                        <p className="profile-email">email@example.com</p>
                    </div>
                    <ul className="menu">
                        <li className={activeTab === 'info' ? 'active' : ''} onClick={() => setActiveTab('info')}>내정보
                        </li>
                        <li className={activeTab === 'reservations' ? 'active' : ''}
                            onClick={() => setActiveTab('reservations')}>내예약
                        </li>
                    </ul>
                </div>
                <div className="content-section">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MemberMyPage;
