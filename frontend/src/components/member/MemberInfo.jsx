import React from 'react';
import '/src/styles/components/member/MemberInfo.css';

const MemberInfo = ({
                        member,
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
        <div className="member-info-content">
            <h3>내 정보</h3>
            {member ? (
                <div className="member-details">
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
                    <p id="pwInfo" className="info-message"></p>
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
    );
};

export default MemberInfo;
