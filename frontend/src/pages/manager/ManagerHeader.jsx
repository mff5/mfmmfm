import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo1 from '/src/assets/logo1.png';
import '/src/styles/pages/manager/ManagerHeader.css';

const ManagerHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="manager-header">
            <div className="header-content">
                <img src={Logo1} alt="Belliz Logo" className="header-logo" onClick={() => navigate('/managerPage/register')} />
                <h1>Office24 관리자</h1>
                <nav className="header-nav">
                    <ul>
                        <li onClick={() => navigate('/managerPage/register')}>오피스 등록</li>
                        <li onClick={() => navigate('/managerPage/edit')}>오피스 수정</li>
                        <li onClick={() => navigate('/managerPage/info')}>매니저 정보</li>
                        <li onClick={() => navigate('/managerPage/reviews')}>리뷰 관리</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default ManagerHeader;
