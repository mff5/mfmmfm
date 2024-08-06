import React from 'react';
import '/src/styles/components/member/MemberDetails.css';

const MemberDetails = ({
                           activeTab,
                           member,
                           payments,
                           newPw,
                           confirmNewPw,
                           newNickname,
                           setNewPw,
                           setConfirmNewPw,
                           setNewNickname,
                           handlePwChange,
                           handleNicknameChange,
                           pwCheck,
                           pwCheckCheck,
                           pwRef,
                           confirmPwRef
                       }) => {
    return (
        <div>
            {activeTab === 'info' && (
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
                        <div className="input-group">
                            <input
                                type="password"
                                id="pw"
                                placeholder="새 비밀번호"
                                value={newPw}
                                onChange={(e) => setNewPw(e.target.value)}
                                ref={pwRef}
                                onKeyUp={pwCheck}
                                className="input-field"
                            />
                            <input
                                type="password"
                                id="pwCheck"
                                placeholder="새 비밀번호 확인"
                                value={confirmNewPw}
                                onChange={(e) => setConfirmNewPw(e.target.value)}
                                ref={confirmPwRef}
                                onKeyUp={pwCheckCheck}
                                className="input-field"
                            />
                            <button onClick={handlePwChange} className="change-button">비밀번호 변경</button>
                        </div>
                        <p id="pwInfo" className="info-message"></p>
                        <p id="pwCheckInfo" className="info-message"></p>
                    </div>

                    <div className="change-section">
                        <h4>닉네임 변경</h4>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="새 닉네임"
                                value={newNickname}
                                onChange={(e) => setNewNickname(e.target.value)}
                                className="input-field"
                            />
                            <button onClick={handleNicknameChange} className="change-button">닉네임 변경</button>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'reservations' && (
                <div className="member-my-page-reservation-list">
                    <h3 className="member-my-page-reservation-title">내 예약</h3>
                    {payments && payments.length > 0 ? (
                        payments.map((payment) => (
                            <div className="member-my-page-reservation-item" key={payment.no}>
                                <div className="member-my-page-reservation-details">
                                    <p className="member-my-page-reservation-title">오피스 번호: {payment.officeNo}</p>
                                    <p>
                                        예약 기간: {new Date(payment.startDate).toLocaleDateString()} ~{' '}
                                        {new Date(payment.endDate).toLocaleDateString()}
                                    </p>
                                    <p>가격: {payment.price}원</p>
                                    <p>결제 방법: {payment.paymentMethod}</p>
                                </div>
                                <div className="member-my-page-reservation-actions">
                                    <button className="member-my-page-cancel-button">취소</button>
                                    <button className="member-my-page-review-button">리뷰</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>예약 내역이 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MemberDetails;
