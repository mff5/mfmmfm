import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getAccessToken, getNo } from "../../utils/auth";
import MemberHeader from "../../components/member/MemberHeader";
import MemberFooter from "../../components/member/MemberFooter";
import instance from "../../utils/axiosConfig";
import '/src/styles/pages/member/MemberPage.css';
import { pwCheck, pwCheckCheck } from "../../utils/MemberRegister.js";
import MemberReservations from "../../components/member/MemberReservations.jsx";
import MemberInfo from "../../components/member/MemberInfo.jsx";
import MemberDelete from "../../components/member/MemberDelete.jsx";

const MemberMyPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('info');
    const [member, setMember] = useState({});
    const [reservations, setReservations] = useState([]);
    const [newPw, setNewPw] = useState('');
    const [confirmNewPw, setConfirmNewPw] = useState('');
    const [newNickname, setNewNickname] = useState('');
    const pwRef = useRef(null);
    const confirmPwRef = useRef(null);
    const accessToken = getAccessToken();

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                let tokenValid = await isAuthenticated();
                if (!tokenValid) {
                    navigate('/login');
                    return;
                }

                const response = await instance.get(`http://localhost:8080/auth/member/${getNo()}`);
                setMember(response.data.member);
                setReservations(response.data.reservations);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchMemberInfo();
    }, [navigate]);

    const handlePwChange = () => {
        if (!pwRef.current || !confirmPwRef.current) {
            console.error("Reference to input elements is missing.");
            return;
        }

        if (!pwCheck(pwRef.current.value)) {
            alert("비밀번호 규칙에 맞게 입력하세요.");
            return false;
        }

        if (!pwCheckCheck(pwRef.current.value, confirmPwRef.current.value)) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }

        if (confirm("비밀번호를 재설정하시겠습니까?")) {
            instance.patch('http://localhost:8080/member/updatePw', { no: getNo(), pw: confirmPwRef.current.value })
                .then(response => {
                    if (response.status === 200) {
                        alert("비밀번호 변경 성공");
                    } else {
                        alert("비밀번호 변경 실패");
                    }
                })
                .catch(error => {
                    alert("비밀번호 변경 중 오류가 발생했습니다.");
                });
        }
    };

    const handleNicknameChange = () => {
        // 닉네임 변경 로직 추가
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
                            <div className="member-my-page-profile-image">
                                <img src="/src/assets/logo1.png" alt="Logo" />
                            </div>
                            <p className="member-my-page-profile-name">{member.id || "사용자 이름"}</p>
                        </div>
                        <ul className="member-my-page-menu">
                            <li className={activeTab === 'info' ? 'active' : ''} onClick={() => setActiveTab('info')}>
                                내정보
                            </li>
                            <li className={activeTab === 'reservations' ? 'active' : ''} onClick={() => setActiveTab('reservations')}>
                                내예약
                            </li>
                            <li className={activeTab === 'delete' ? 'active' : ''} onClick={() => setActiveTab('delete')}>
                                회원탈퇴
                            </li>
                        </ul>
                    </div>
                    <div className="member-my-page-content-section">
                        {activeTab === 'info' && (
                            <MemberInfo
                                member={member}
                                newPw={newPw}
                                confirmNewPw={confirmNewPw}
                                newNickname={newNickname}
                                setNewPw={setNewPw}
                                setConfirmNewPw={setConfirmNewPw}
                                setNewNickname={setNewNickname}
                                handlePwChange={handlePwChange}
                                handleNicknameChange={handleNicknameChange}
                                pwCheck={pwCheck}
                                pwCheckCheck={pwCheckCheck}
                                pwRef={pwRef}
                                confirmPwRef={confirmPwRef}
                            />
                        )}
                        {activeTab === 'reservations' && (
                            <MemberReservations reservations={reservations} />
                        )}
                        {activeTab === 'delete' && (
                            <MemberDelete id={member.id} />
                        )}
                    </div>
                </div>
            </div>
            <MemberFooter />
        </div>
    );
};

export default MemberMyPage;
