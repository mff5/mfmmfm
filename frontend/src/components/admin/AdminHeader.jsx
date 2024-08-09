import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo1 from '/src/assets/logo1.png';
import '/src/styles/components/admin/AdminHeader.css';

const AdminHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="admin-header">
            <div className="header-content">
                <img src={Logo1} alt="Office24 Admin Logo" className="header-logo" onClick={() => navigate('/')} />
                <h1>Belliz 관리자</h1>
                <nav className="header-nav">
                    <ul>
                        <li onClick={() => navigate('/admin/adminPage/memberStats')}>회원 통계</li>
                        <li onClick={() => navigate('/admin/adminPage/officeStats')}>오피스 통계</li>
                        <li onClick={() => navigate('/admin/adminPage/reviewStats')}>리뷰 통계</li>
                        <li onClick={() => navigate('/admin/adminPage/reservationStats')}>예약 통계</li>
                        <li onClick={() => navigate('/admin/adminPage/notice')}>공지사항</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
