import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '/src/styles/components/member/MemberHeader.css';
import logo from "/src/assets/logo3.jpg";
import { getRole, isAuthenticated, removeTokens } from "../../utils/auth.js";

const OFFICE_CATEGORIES = [
    "서울", "부산", "대구", "대전", "광주", "인천", "울산", "경기", "강원",
    "충북", "전북", "전남", "경북", "경남", "제주",
];

const MemberHeader = ({ onCategorySelect }) => { // onCategorySelect prop 추가
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const authenticated = await isAuthenticated();
            setIsLoggedIn(authenticated);
            if (authenticated) {
                const userRole = getRole();
                setRole(userRole);
            }
        };
        checkAuthentication();
    }, []);

    const handleLogout = () => {
        removeTokens();
        setIsLoggedIn(false);
        setRole(null);
        navigate("/");
    };

    const logoClick = () => {
        onCategorySelect("All");
        navigate("/");
    };

    return (
        <header className="member-header">
            <div className="member-header-logo">
                <img src={logo} alt="Belliz Logo" onClick={logoClick} />
            </div>
            <nav className="member-header-nav">
                {OFFICE_CATEGORIES.map((category, index) => (
                    <button
                        key={index}
                        className="member-header-nav-button"
                        onClick={() => onCategorySelect(category)} // 버튼 클릭 시 onCategorySelect 호출
                    >
                        {category}
                    </button>
                ))}
            </nav>
            <div className="member-header-login-signup">
                {!isLoggedIn ? (
                    <>
                        <button
                            className="member-header-login-button"
                            onClick={() => navigate("/login")}
                        >
                            로그인
                        </button>
                        <button
                            className="member-header-signup-button"
                            onClick={() => navigate("/member/register")}
                        >
                            회원가입
                        </button>
                    </>
                ) : (
                    <>
                        {role === 'ROLE_MEMBER' && (
                            <>
                                <button
                                    className="member-header-mypage-button"
                                    onClick={() => navigate("/member/memberPage")}
                                >
                                    마이페이지
                                </button>
                                <button
                                    className="member-header-logout-button"
                                    onClick={handleLogout}
                                >
                                    로그아웃
                                </button>
                            </>
                        )}
                        {role === 'ROLE_MANAGER' && (
                            <>
                                <button
                                    className="member-header-mypage-button"
                                    onClick={() => navigate("/manager/managerPage")}
                                >
                                    매니저 페이지
                                </button>
                                <button
                                    className="member-header-logout-button"
                                    onClick={handleLogout}
                                >
                                    로그아웃
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </header>
    );
};

export default MemberHeader;
