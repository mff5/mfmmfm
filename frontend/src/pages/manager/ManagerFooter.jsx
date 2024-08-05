import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo2 from '/src/assets/logo2.png';
import '/src/styles/pages/manager/ManagerFooter.css';

const ManagerFooter = () => {
    const navigate = useNavigate();

    return (
        <footer className="manager-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>지원</h3>
                    <ul>
                        <li onClick={() => navigate('/support/help')}>도움말 센터</li>
                        <li onClick={() => navigate('/support/cover')}>Office24커버</li>
                        <li onClick={() => navigate('/support/accessibility')}>장애인 지원</li>
                        <li onClick={() => navigate('/support/cancellation')}>예약 취소 옵션</li>
                        <li onClick={() => navigate('/support/complaints')}>이웃 민원 신고</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>호스팅</h3>
                    <ul>
                        <li onClick={() => navigate('/hosting/register')}>사무실 등록</li>
                        <li onClick={() => navigate('/hosting/cover')}>호스트 커버</li>
                        <li onClick={() => navigate('/hosting/resources')}>호스팅 자료</li>
                        <li onClick={() => navigate('/hosting/forum')}>커뮤니티 포럼</li>
                        <li onClick={() => navigate('/hosting/responsible')}>책임감 있는 호스팅</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Office24</h3>
                    <ul>
                        <li onClick={() => navigate('/company/newsroom')}>뉴스룸</li>
                        <li onClick={() => navigate('/company/features')}>새로운 기능</li>
                        <li onClick={() => navigate('/company/careers')}>채용정보</li>
                        <li onClick={() => navigate('/company/investor')}>투자자 정보</li>
                        <li onClick={() => navigate('/company/emergency')}>긴급 사무실</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <img src={Logo2} alt="Belliz Logo" className="footer-logo" />
                <p>
                    © 2024 Office24, Inc. ·{' '}
                    <span onClick={() => navigate('/legal/privacy')}>개인정보 처리방침</span> ·{' '}
                    <span onClick={() => navigate('/legal/terms')}>이용약관</span> ·{' '}
                    <span onClick={() => navigate('/sitemap')}>사이트맵</span> ·{' '}
                    <span onClick={() => navigate('/legal/company-details')}>회사 세부정보</span>
                </p>
            </div>
        </footer>
    );
};

export default ManagerFooter;
