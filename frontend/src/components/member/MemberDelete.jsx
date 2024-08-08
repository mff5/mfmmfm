import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from "../../utils/axiosConfig";
import '/src/styles/components/member/MemberDelete.css';
import {removeTokens} from "../../utils/auth.js";

const MemberDelete = ({ id }) => {
    const navigate = useNavigate();
    const [pw, setPw] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDeleteClick = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }

        if (window.confirm("회원탈퇴를 하시겠습니까?")) {
            try {
                const response = await instance.delete(`/member/delete/${id}`, {
                    data: { pw: pw }
                });
                if (response.status === 200) {
                    alert("회원탈퇴 성공")
                    removeTokens();
                    navigate("/");
                }
            } catch (error) {
                alert("회원탈퇴 실패");
            }
        }
    };

    return (
        <div className="member-delete-container">
            <div className="member-delete">
                <h2>회원탈퇴</h2>
                {!confirmDelete ? (
                    <>
                        <p>회원탈퇴를 하시면 모든 데이터가 삭제되며 복구할 수 없습니다. 계속 진행하시겠습니까?</p>
                        <button className="delete-button" onClick={handleDeleteClick}>
                            회원탈퇴
                        </button>
                    </>
                ) : (
                    <>
                        <p>회원탈퇴를 진행하려면 비밀번호를 입력해주세요.</p>
                        <input
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            className="delete-password-input"
                        />
                        <button className="confirm-delete-button" onClick={handleDeleteClick}>
                            회원탈퇴 완료
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MemberDelete;
