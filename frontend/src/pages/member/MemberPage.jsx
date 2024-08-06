import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { isAuthenticated, getAccessToken } from "../../utils/auth.js";
import MemberHeader from "./MemberHeader.jsx";
import MemberFooter from "../../components/member/MemberFooter.jsx";
import '/src/styles/pages/member/MemberPage.css';
import { pwCheck, pwCheckCheck } from "../../utils/MemberRegister.js";

const MemberMyPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('info');
    const [member, setMember] = useState([]);
    const [payments, setPayments] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newNickname, setNewNickname] = useState('');
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
                setPayments(response.data.payments);
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

    const handlePasswordChange = async () => {
        if (!pwCheck()) {
            alert("비밀번호 규칙에 맞게 입력하세요.");
            return;
        }

        if (!pwCheckCheck()) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/auth/change-password", { password: newPassword }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            alert('비밀번호가 성공적으로 변경되었습니다.');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            alert('비밀번호 변경 중 오류가 발생했습니다.');
        }
    };

    const handleNicknameChange = async () => {
        try {
            await axios.post("http://localhost:8080/auth/change-nickname", { nickname: newNickname }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            alert('닉네임이 성공적으로 변경되었습니다.');
            setNewNickname('');
            fetchMemberInfo(); // Fetch updated member info
        } catch (error) {
            alert('닉네임 변경 중 오류가 발생했습니다.');
        }
    };

    const renderContent = () => {
        if (activeTab === 'info') {
            return (
                <div className="member-my-page-info-content">
                    <h3>내 정보</h3>
                    {member ? (
                        <div className="member-info">
                            <div className="info-row">
                                <span className="info-label">아이디</span>
                                <span className="info-value">{member.id}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">이름</span>
                                <span className="info-value">{member.name}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">닉네임</span>
                                <span className="info-value">{member.nickname}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">이메일</span>
                                <span className="info-value">{member.email}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">전화번호</span>
                                <span className="info-value">{member.phone}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">생일</span>
                                <span className="info-value">{new Date(member.birth).toLocaleDateString()}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">성별</span>
                                <span className="info-value">{member.gender}</span>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}

                    <div className="change-section">
                        <h4>비밀번호 변경</h4>
                        <div className="change-password-input">
                            <input
                                type="password"
                                id="pw"
                                placeholder="새 비밀번호"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                onKeyUp={pwCheck}
                            />
                            <p id="pwInfo" className="info-message"></p>
                        </div>
                        <div className="change-password-input">
                            <input
                                type="password"
                                id="pwCheck"
                                placeholder="새 비밀번호 확인"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                onKeyUp={pwCheckCheck}
                            />
                            <p id="pwCheckInfo" className="info-message"></p>
                        </div>
                        <button onClick={handlePasswordChange}>변경</button>
                    </div>
                    <div className="change-section">
                        <h4>닉네임 변경</h4>
                        <input
                            type="text"
                            placeholder="새 닉네임"
                            value={newNickname}
                            onChange={(e) => setNewNickname(e.target.value)}
                            className="nickname-input" /* 닉네임 변경 input에 대한 클래스 추가 */
                        />
                        <button onClick={handleNicknameChange}>변경</button>
                    </div>
                </div>
            );
        } else if (activeTab === 'reservations') {
            return (
                <div className="member-my-page-reservation-list">
                    <h3 className="member-my-page-reservation-title">내 예약</h3>
                    {payments ? (
                        payments.map(booking => (
                            <div className="member-my-page-reservation-item" key={booking.no}>
                                <div className="member-my-page-reservation-details">
                                    <p className="member-my-page-reservation-title">{booking.name}</p>
                                    <p>{new Date(booking.startDate).toLocaleDateString()} ~ {new Date(booking.endDate).toLocaleDateString()}</p>
                                    <p className={`member-my-page-status-${booking.status.toLowerCase()}`}>{booking.status}</p>
                                </div>
                                <div className="member-my-page-reservation-actions">
                                    <button className="member-my-page-cancel-button">취소</button>
                                    <button className="member-my-page-review-button">리뷰</button>
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
        <div>
            <MemberHeader />
            <div className="member-my-page-wrapper">
                <div className="member-my-page-container">
                    <div className="member-my-page-sidebar">
                        <div className="member-my-page-logo-container">
                            <img src="/src/assets/logo3.jpg" alt="Logo" className="member-my-page-logo" />
                        </div>
                        <div className="member-my-page-profile-section">
                            <div className="member-my-page-profile-image"><img src="/src/assets/logo1.png" alt="Logo" /></div>
                            <p className="member-my-page-profile-name">{member.id || "사용자 이름"}</p>
                        </div>
                        <ul className="member-my-page-menu">
                            <li className={activeTab === 'info' ? 'active' : ''} onClick={() => setActiveTab('info')}>내정보</li>
                            <li className={activeTab === 'reservations' ? 'active' : ''} onClick={() => setActiveTab('reservations')}>내예약</li>
                        </ul>
                    </div>
                    <div className="member-my-page-content-section">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <MemberFooter />
        </div>
    );
};

export default MemberMyPage;
