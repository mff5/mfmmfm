import "/src/styles/pages/manager/ManagerPage.css";
import ManagerHeader from "./ManagerHeader";
import ManagerFooter from "./ManagerFooter";

const ManagerPage = () => {
    return (
        <div className="manager-page">
            <ManagerHeader />
            <div className="content-container">
                <div className="sidebar">
                    <div className="sidebar-logo">
                        <img src="/logo.png" alt="Logo" />
                    </div>
                    <ul className="sidebar-menu">
                        <li>오피스 등록</li>
                        <li>오피스 수정</li>
                        <li>오피스 목록</li>
                        <li>리뷰</li>
                        <li>매니저 정보</li>
                    </ul>
                </div>
                <div className="main-content">
                    <div className="content">
                        <h2>메인 콘텐츠</h2>
                        <p>여기에 페이지의 주요 정보와 기능을 표시할 수 있습니다.</p>
                    </div>
                </div>
            </div>
            <ManagerFooter />
        </div>
    );
};

export default ManagerPage;
