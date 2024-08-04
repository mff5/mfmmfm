import React, { useState, useRef } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/manager/ManagerPage.css"; // Assuming the styles are included in the main CSS file

const ManagerHeader = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Handle click outside dropdown to close it
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <header className="manager-header">
            <div className="header-logo" onClick={() => navigate("/")}>
                <img src="/public/logo.png" alt="Logo" />
            </div>
            <nav className="header-nav">
                <ul>
                    <li onClick={() => navigate("/home")}>홈</li>
                    <li onClick={() => navigate("/services")}>서비스</li>
                    <li onClick={() => navigate("/inquiries")}>문의</li>
                    <li onClick={() => navigate("/logout")}>로그아웃</li>
                </ul>
                <div className="profile-wrapper" ref={dropdownRef}>
                    <FaCircleUser
                        className="profile-icon"
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div className="profile-dropdown">
                            <div
                                className="dropdown-option"
                                onClick={() => navigate("/profile")}
                            >
                                프로필
                            </div>
                            <div
                                className="dropdown-option"
                                onClick={() => navigate("/settings")}
                            >
                                설정
                            </div>
                            <div
                                className="dropdown-option"
                                onClick={() => navigate("/logout")}
                            >
                                로그아웃
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default ManagerHeader;
